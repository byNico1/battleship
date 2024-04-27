import { useEffect, useState } from "react";

const GridCell = ({
  player,
  setTurn,
  turn,
  coordinates,
  aiAttackedState,
  setAiAttackedState,
  setGameOver,
  gameOver,
  restartingGame,
  setRestartingGame,
}) => {
  const [hitShipState, setHitShipState] = useState(false);
  const [hitMissState, setHitMissState] = useState(false);

  const [i, j] = coordinates;

  useEffect(() => {
    if (!player.gameBoard.board[i][j].hittedSpot) {
      setHitMissState(false);
      setHitShipState(false);
    }
  }, [restartingGame]);

  useEffect(() => {
    if (player.name !== "PC") {
      if (player.gameBoard.board[i][j].hittedSpot === true) {
        setHitMissState(true);
        setAiAttackedState(false);
      }
    }
  }, [aiAttackedState]);

  const handleGridClick = (x, y) => {
    if (restartingGame) setRestartingGame(false);

    if (turn && player.name === "PC") {
      if (player.gameBoard.board[x][y].hittedSpot === true) {
        return;
      }

      player.gameBoard.receiveAttack(x, y);

      if (
        player.gameBoard.board[x][y] !== false &&
        player.gameBoard.board[x][y].ship
      ) {
        setHitShipState(true);
      }

      if (player.gameBoard.areShipsSunk()) {
        setGameOver({
          ...gameOver,
          winner: gameOver.players.filter((player) => player.name !== "PC")[0]
            .name,
          state: true,
        });
        return;
      }

      setHitMissState(true);
      setTurn((val) => !val);
    }
  };

  return (
    <div
      className={`border border-black 
      ${
        turn && player.name === "PC"
          ? "hover:bg-blue-400"
          : "hover:bg-slate-500"
      } 
      ${
        player.gameBoard.board[i][j].ship && player.name !== "PC"
          ? "bg-green-500"
          : "bg-white"
      }
      ${gameOver.state ? "hover:bg-black" : ""}
      ${hitShipState || hitMissState ? "!bg-red-500" : ""}
      `}
      onClick={() => !gameOver.state && handleGridClick(i, j)}
    ></div>
  );
};

export default GridCell;
