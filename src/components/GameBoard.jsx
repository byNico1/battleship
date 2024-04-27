import GridCell from "./GridCell";

import { aiAttack } from "../../factories/aiPlayer";

import { useEffect } from "react";

const GameBoard = ({
  player,
  turn,
  setTurn,
  setAiAttackedState,
  aiAttackedState,
  setGameOver,
  gameOver,
  restartingGame,
  setRestartingGame,
}) => {
  useEffect(() => {
    if (turn === false && player.name !== "PC") {
      aiAttack();
      setAiAttackedState(true);

      if (player.gameBoard.areShipsSunk()) {
        setGameOver({
          ...gameOver,
          winner: "PC",
          state: true,
        });
        return;
      }

      setTurn(true);
    }
  }, [turn]);

  return (
    <div>
      <h2 className="mb-5">{player.name}</h2>

      <div className="grid grid-cols-10 grid-rows-10 bg-white w-[450px] h-[450px]">
        {player.gameBoard.board.map((row, i) => (
          <div className="col-span-10 grid grid-cols-10" key={i}>
            {row.map((col, j) => (
              <GridCell
                key={`grid-key-${i}-${j}`}
                turn={turn}
                setTurn={setTurn}
                player={player}
                aiAttackedState={aiAttackedState}
                setAiAttackedState={setAiAttackedState}
                coordinates={[i, j]}
                setGameOver={setGameOver}
                gameOver={gameOver}
                restartingGame={restartingGame}
                setRestartingGame={setRestartingGame}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
