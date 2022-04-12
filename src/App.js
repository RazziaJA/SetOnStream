import './App.css';
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import GridLayout, {WidthProvider} from "react-grid-layout";
import SetGame from './setGame'
import {useState} from "react"

const ResponsiveReactGridLayout = WidthProvider(GridLayout)
const counts = ["one", "two", "three"]
const shadings = ["empty", "striped", "solid"];
const colors = ["red", "green", "purple"];
const shapes = ["diamond", "oval", "squiggle"];

/* 12 cards initially on the table. Add 3 at a time when no set exists. Guaranteed to have one at 21 cards. 7 columns of 3 cards.
 *
 */

function App() {
  // eslint-disable-next-line
  const [game, setGame] = useState(() => new SetGame()); // function ensures the value is computed only once

  var layout = new Array(21).fill(undefined).map((val, idx) => {
    return {
      i: idx.toString(),
      w: 1,
      h: 1,
      x: Math.floor(idx / 3),
      y: idx % 3,
      static: true
    };
  })

  return (
    <div className="App">
      <ResponsiveReactGridLayout
        className="layout"
        layout={layout}
        cols={7}
        rowHeight={200}
      >
        {game.on_table.map((deckId, tblIdx) => {
          return (
            <div key={tblIdx.toString()}>{tblIdx + 1}: {counts[game.getNumber(deckId)]} {shadings[game.getShading(deckId)]} {colors[game.getColor(deckId)]} {shapes[game.getShape(deckId)]}</div>
          );
        })}
      </ResponsiveReactGridLayout>
    </div>
  );
}

export default App;
