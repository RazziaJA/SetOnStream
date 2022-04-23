import './App.css';
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import GridLayout, {WidthProvider} from "react-grid-layout";
import SetGame from './setGame'
import React, {useState} from "react"
import SpriteSheet from "./SpriteSheet"
import setCards from './set-cards.png'
import TwitchListener from './TwitchListener';

const ResponsiveReactGridLayout = WidthProvider(GridLayout)
//const counts = ["one", "two", "three"]
//const shadings = ["empty", "striped", "solid"];
//const colors = ["red", "green", "purple"];
//const shapes = ["diamond", "oval", "squiggle"];

/*
 * 12 cards initially on the table. Add 3 at a time when no set exists. Guaranteed to have one at 21 cards. 7 columns of 3 cards.
 */

function genSpriteSheet() {
  let topleftx = 27;
  let toplefty = 12;
  let w = 98;
  let h = 55;
  let spacingx = 5;
  let spacingy = 3;

  const sprites = {};
  new Array(81).fill(undefined).map((unused, card) => {
    let row = 3*SetGame.getColor(card) + SetGame.getShading(card);
    let col = 3*SetGame.getShape(card) + SetGame.getNumber(card);
    return {
      width: w,
      height: h,
      x: topleftx + col*(w+spacingx),
      y: toplefty + row*(h+spacingy)
    }
  }).forEach((el, idx) => {
    sprites[idx.toString()] = el;
  });
  return sprites;
}

const spriteSheet = genSpriteSheet();

const LabelledSetCard = React.forwardRef(({style, className, ...props}, ref) => {
  return (
    <div style={{...style}} className={className} ref={ref}>
      <label>{props.tblIdx+1} </label>
      <SpriteSheet filename={setCards} data={spriteSheet} sprite={props.card.toString()} />
    </div>
  );
})

function SetForm(props) {
  const [cards, setCards] = useState("");

  var handleSubmit = function(event) {
    var nums = cards.split(" ");
    if (nums.length === 3) {
      props.callSet("Host", nums[0], nums[1], nums[2]);
    }
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Cards: 
        <input type="text" value={cards} onChange={event => setCards(event.target.value)}/>
      </label>
      <input type="submit" value="Submit"/>
    </form>
  );
}

function genLayout(count, cols) {
  return new Array(count).fill(undefined).map((val, idx) => {
    return {
      i: idx.toString(),
      w: 1,
      h: 1,
      x: Math.floor(idx / (count/cols)),
      y: idx % (count/cols),
      static: true
    };
  })
}

function App() {
  // eslint-disable-next-line
  const [game, updateGame] = useState(new SetGame());

  var layout = genLayout(21, 7);

  var callSet = function(playerName, card1, card2, card3) {
    game.checkSet(playerName, [card1 - 1, card2 - 1, card3 - 1]);
    updateGame(game.clone());
  };

  return (
    <div className="App">
      <TwitchListener channel="razzia7" onSetCalled={callSet} />
      <label>Game Over: {game.isGameOver ? "yes" : "no"}</label><br/>
      <label>Cards in deck: {game.deck.length}</label><br/>
      <label>Sets on table: {game.countSets(game.on_table)}</label>
      <SetForm callSet={callSet}></SetForm>
      <ResponsiveReactGridLayout
        className="layout"
        layout={layout}
        cols={7}
        //rowHeight={200}
      >
        {game.on_table.map((deckId, tblIdx) => {
          return (
            <LabelledSetCard key={tblIdx.toString()} tblIdx={tblIdx} card={deckId} />
          );
        })}
      </ResponsiveReactGridLayout>
    </div>
  );
}

export default App;
