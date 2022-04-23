import './App.css';
import SetGame from './SetGame'
import React, {useReducer} from "react"
import InputForm from './InputForm';
import Tabletop from './Tabletop';
import Rules from './Rules';

function updateGame(game, updateData) {
  var nextState = game.clone();
  switch (updateData.type) {
    case 'restart':
      nextState.restartGame();
      break;
    case 'callSet':
      nextState.checkSet(updateData.playerName, [updateData.card1 - 1, updateData.card2 - 1, updateData.card3 - 1]);
      break;
    default:
      break;
  }
  return nextState;
}

function App() {
  const [game, dispatch] = useReducer(updateGame, new SetGame());

  return (
    <div className="App">
      <div>
        <InputForm dispatch={dispatch} />
        <Rules />
        <label>Game Over: {game.isGameOver ? "yes" : "no"}</label><br/>
        <label>Cards in deck: {game.deck.length}</label><br/>
        <label>Sets on table: {game.countSets(game.on_table)}</label>
      </div>
      <Tabletop game={game} />
    </div>
  );
}

export default App;
