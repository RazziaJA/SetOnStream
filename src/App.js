import './App.css';
import SetGame from './SetGame'
import React, {useReducer} from "react"
import InputForm from './InputForm';
//import PngTabletop from './PngTabletop';
import SvgTabletop from './SvgTabletop';
import Rules from './Rules';
import GameInfo from './GameInfo';
import Scores from './Scores';
//import PngGuessHistory from './PngGuessHistory';
import SvgGuessHistory from './SvgGuessHistory';

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
        <InputForm dispatch={dispatch} />
        <GameInfo game={game} />
        <Rules />
        <Scores game={game} /> 
        <SvgTabletop game={game} />
        <SvgGuessHistory game={game} />
    </div>
  );
}

export default App;
