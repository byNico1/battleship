// import { useState } from "react";
import "./App.css";
import { useState } from "react";

import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver";

import { realPlayer, restartRealPlayer } from "../factories/game";
import { aiPlayer, restartAiPlayer } from "../factories/aiPlayer";

function App() {
  const [aiAttackedState, setAiAttackedState] = useState(false);
  const [restartingGame, setRestartingGame] = useState(false);
  const [gameOver, setGameOver] = useState({
    players: [realPlayer, aiPlayer],
    winner: "",
    state: false,
  });

  const [turn, setTurn] = useState(true);

  function restartGame() {
    setGameOver({ ...gameOver, winner: "", state: false });
    setTurn(true);
    restartAiPlayer();
    restartRealPlayer();
    setRestartingGame(true);
  }

  return (
    <>
      <section className="flex gap-10">
        <GameBoard
          turn={turn}
          setTurn={setTurn}
          player={aiPlayer}
          gameOver={gameOver}
          setGameOver={setGameOver}
          restartingGame={restartingGame}
          setRestartingGame={setRestartingGame}
        />

        <GameBoard
          gameOver={gameOver}
          setGameOver={setGameOver}
          turn={turn}
          setTurn={setTurn}
          aiAttackedState={aiAttackedState}
          setAiAttackedState={setAiAttackedState}
          player={realPlayer}
          restartingGame={restartingGame}
          setRestartingGame={setRestartingGame}
        />
      </section>

      <GameOver gameOver={gameOver} restartGame={restartGame} />
    </>
  );
}

export default App;
