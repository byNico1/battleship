import PlaceShipCell from "./PlaceShipCell";
import { ships } from "../../utils/ships";
import { useState } from "react";
import { Ship } from "../../../factories/ship";

const PlaceShipGameBoard = ({
  player,
  setShipSetted,
  shipSetted,
  setStartGame,
}) => {
  const [placeHoverState, setPlaceHoverState] = useState([]);
  const [shipXAxis, setShipXAxis] = useState(true);

  function placeHover(x, y) {
    let ship = ships.filter((s) => s.placed === false)[0];

    if (!ship) {
      setStartGame(true);
      return;
    }

    let notPossibleToBePlased = false;
    let shipToPlace = Ship(ship.name, ship.size);
    const shipsArray = [];

    if (shipXAxis) {
      for (let j = 0; j < ship.size; j++) {
        if (player.gameBoard.board[x][y + j] !== false) {
          notPossibleToBePlased = true;
        }
      }
    } else {
      for (let j = 0; j < ship.size; j++) {
        if (
          player.gameBoard.board[x + j] === undefined ||
          player.gameBoard.board[x + j][y] !== false
        ) {
          notPossibleToBePlased = true;
        }
      }
    }

    for (let i = 0; i < ship.size; i++) {
      if (shipXAxis) {
        if (y - 1 + ship.size > 9 || player.gameBoard.board[x][y] !== false) {
          notPossibleToBePlased = true;
        }
      } else {
        if (x - 1 + ship.size > 9 || player.gameBoard.board[x][y] !== false) {
          notPossibleToBePlased = true;
        }
      }

      if (shipXAxis) {
        shipsArray.push([x, y + i, notPossibleToBePlased, shipToPlace]);
      } else {
        shipsArray.push([x + i, y, notPossibleToBePlased, shipToPlace]);
      }
    }
    setPlaceHoverState(shipsArray);
  }

  return (
    <div>
      <h2 className="my-5">{player.name}</h2>

      <button className="mb-5" onClick={() => setShipXAxis((val) => !val)}>
        {shipXAxis ? <span>Horizontal</span> : <span>Vertical</span>}
      </button>

      <div className="grid grid-cols-10 grid-rows-10 bg-white w-[450px] h-[450px]">
        {player.gameBoard.board.map((row, i) => (
          <div className="col-span-10 grid grid-cols-10" key={i}>
            {row.map((col, j) => (
              <PlaceShipCell
                key={`grid-key-${i}-${j}`}
                player={player}
                coordinates={[i, j]}
                placeHover={placeHover}
                placeHoverState={placeHoverState}
                shipSetted={shipSetted}
                setShipSetted={setShipSetted}
                shipXAxis={shipXAxis}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaceShipGameBoard;
