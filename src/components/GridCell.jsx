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
}) => {
  const [hitShipState, setHitShipState] = useState(false);
  const [hitMissState, setHitMissState] = useState(false);

  const [i, j] = coordinates;

  useEffect(() => {
    if (player.name !== "PC") {
      if (player.gameBoard.board[i][j].hittedSpot === true) {
        if (player.gameBoard.board[i][j].ship) {
          setHitShipState(true);
        } else {
          setHitMissState(true);
        }

        setAiAttackedState(false);
      }
    }
  }, [aiAttackedState]);

  const handleGridClick = (x, y) => {
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
      } else {
        setHitMissState(true);
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
      ${hitShipState ? "!bg-orange-500 m-2" : ""}
      ${hitMissState ? "!bg-red-500" : ""}
      `}
      onClick={() => !gameOver.state && handleGridClick(i, j)}
    ></div>
  );
};

export default GridCell;
