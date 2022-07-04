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
import {ErrorBoundary} from 'react-error-boundary'

function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div>
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

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
  }, [location.search])

  return (
    <div className="App">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <InputForm dispatch={dispatch} twitchChannel={twitchChannel} />
      </ErrorBoundary>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <GameInfo game={game} dispatch={dispatch} />
      </ErrorBoundary>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Rules />
      </ErrorBoundary>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Scores game={game} />
      </ErrorBoundary>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <SvgTabletop game={game} />
      </ErrorBoundary>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <SvgGuessHistory game={game} />
      </ErrorBoundary>
    </div>
  );
}

export default App;
