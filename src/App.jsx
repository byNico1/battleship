import "./App.css";
import { useState } from "react";

import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver";

import { realPlayer } from "./utils/playerInstance";
import { aiPlayer } from "../factories/aiPlayer";
import PlaceShips from "./components/PlaceShip/PlaceShips";

function App() {
  const [shipSetted, setShipSetted] = useState([]);
  const [aiAttackedState, setAiAttackedState] = useState(false);

  const [gameOver, setGameOver] = useState({
    players: [realPlayer, aiPlayer],
    winner: "",
    state: false,
  });

  const [turn, setTurn] = useState(true);
  const [startGame, setStartGame] = useState(false);

  return (
    <>
      <h1 className="mb-5">Battleship</h1>

      {!startGame && (
        <PlaceShips
          shipSetted={shipSetted}
          setShipSetted={setShipSetted}
          setStartGame={setStartGame}
        />
      )}

      {startGame && (
        <section className="flex gap-10">
          <GameBoard
            turn={turn}
            setTurn={setTurn}
            player={aiPlayer}
            gameOver={gameOver}
            setGameOver={setGameOver}
          />

          <GameBoard
            gameOver={gameOver}
            setGameOver={setGameOver}
            turn={turn}
            setTurn={setTurn}
            aiAttackedState={aiAttackedState}
            setAiAttackedState={setAiAttackedState}
            player={realPlayer}
            shipSetted={shipSetted}
            setShipSetted={setShipSetted}
          />
        </section>
      )}

      <GameOver gameOver={gameOver} />
    </>
  );
}

export default App;
