import { useEffect, useState } from "react";
import { hasElement, hasElementInsideArray } from "../../utils/helperFuncs";
import { ships } from "../../utils/ships";

const PlaceShipCell = ({
  player,
  coordinates,
  placeHover,
  placeHoverState,
  setShipSetted,
  shipSetted,
  shipXAxis,
}) => {
  const [i, j] = coordinates;

  const [hoverShip, setHoverShip] = useState({
    hover: false,
    notPossible: false,
  });

  useEffect(() => {
    if (hasElement(placeHoverState, [i, j])) {
      setHoverShip({ hover: true, notPossible: placeHoverState[0][2] });
    } else {
      setHoverShip({ hover: false, notPossible: true });
    }
  }, [placeHoverState]);

  const handlePlaceShipClick = (x, y) => {
    if (hoverShip.notPossible === false && hoverShip.hover === true) {
      console.log("works");
      player.gameBoard.placeShip(x, y, placeHoverState[0][3], shipXAxis);
      ships.map((ship) => {
        if (ship.name === placeHoverState[0][3].name) {
          ship.placed = true;
        }
      });
      setShipSetted([...shipSetted, [placeHoverState]]);
      placeHover(i, j);
    }
  };

  return (
    <div
      className={`border border-black 
      
      ${
        hoverShip.hover
          ? hoverShip.notPossible
            ? "!bg-red-500"
            : "!bg-blue-500"
          : hasElementInsideArray(shipSetted, [i, j])
          ? "!bg-green-500"
          : "bg-white"
      }
      `}
      onClick={() => handlePlaceShipClick(i, j)}
      onMouseEnter={() => placeHover(i, j)}
    ></div>
  );
};

export default PlaceShipCell;
