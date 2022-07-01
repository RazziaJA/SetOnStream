import './App.css';
import SetGame from './SetGame'
import React, {useReducer, useState, useEffect} from "react"
import InputForm from './InputForm';
//import PngTabletop from './PngTabletop';
import SvgTabletop from './SvgTabletop';
import Rules from './Rules';
import GameInfo from './GameInfo';
import Scores from './Scores';
//import PngGuessHistory from './PngGuessHistory';
import SvgGuessHistory from './SvgGuessHistory';
import {useLocation} from 'react-router-dom';

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
  const [twitchChannel, setTwitchChannel] = useState(null);
  const location = useLocation();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const channel = queryParams.get("twitch-channel");
    setTwitchChannel(channel);
  }, [])

  return (
    <div className="App">
        <InputForm dispatch={dispatch} twitchChannel={twitchChannel} />
        <GameInfo game={game} dispatch={dispatch} />
        <Rules />
        <Scores game={game} /> 
        <SvgTabletop game={game} />
        <SvgGuessHistory game={game} />
    </div>
  );
}

export default App;
