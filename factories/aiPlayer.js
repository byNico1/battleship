import { player } from "./player";
import { Ship } from "./ship";
import { realPlayer } from "./game";

let aiPlayer = player();

function makeShipCoordinates() {
  const x = Math.floor(Math.random() * 10);
  const y = Math.floor(Math.random() * 10);
  const length = Math.floor(Math.random() * 9) + 1;

  return [x, y, length];
}

function makeAiShip(number) {
  const [x, y, length] = makeShipCoordinates();

  if (
    aiPlayer.gameBoard.placeShip(x, y, Ship(`ai ship ${number}`, length)) ===
    false
  ) {
    makeAiShip(number);
    return;
  }

  aiPlayer.gameBoard.placeShip(x, y, Ship(`ai ship ${number}`, length));
}
function aiAttack() {
  const [x, y] = makeShipCoordinates();

  if (realPlayer.gameBoard.board[x][y].hittedSpot === true) {
    aiAttack();
    return;
  }

  realPlayer.gameBoard.receiveAttack(x, y);
}

for (let i = 1; i <= 5; i++) {
  makeAiShip(i);
}

function restartAiPlayer() {
  aiPlayer = player();

  for (let i = 1; i <= 5; i++) {
    makeAiShip(i);
  }
}

export { aiPlayer, aiAttack, restartAiPlayer };
