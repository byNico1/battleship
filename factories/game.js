import { player } from "./player";
import { Ship } from "./ship";

let realPlayer = player("nicolas");
const firstRealPlayerShip = Ship("first ship", 4);
const secondRealPlayerShip = Ship("second ship", 3);

realPlayer.gameBoard.placeShip(0, 0, firstRealPlayerShip);
realPlayer.gameBoard.placeShip(5, 5, secondRealPlayerShip);

function restartRealPlayer() {
  realPlayer = player("nicolas");
  realPlayer.gameBoard.placeShip(0, 0, firstRealPlayerShip);
}

export { realPlayer, restartRealPlayer };
