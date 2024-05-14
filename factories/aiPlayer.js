import { player } from "./player";
import { Ship } from "./ship";
import { ships } from "../src/utils/ships";
import { deepCopy } from "../src/utils/helperFuncs";

const shipsToPlace = deepCopy(ships);

let aiPlayer = player();

function makeShipCoordinates() {
  const x = Math.floor(Math.random() * 10);
  const y = Math.floor(Math.random() * 10);

  let ship = shipsToPlace.filter((s) => s.placed === false)[0];
  if (!ship) return [x, y];

  return [x, y, ship];
}

function makeAiShip(number) {
  const [x, y, ship] = makeShipCoordinates();
  const isHorizontal = Math.random() < 0.5;

  if (
    aiPlayer.gameBoard.placeShip(
      x,
      y,
      Ship(`ai ship ${number}`, ship.size),
      isHorizontal
    ) === false
  ) {
    makeAiShip(number);
    return;
  }

  shipsToPlace.map((s) => {
    if (ship.name === s.name) {
      s.placed = true;
    }
  });
}
function aiAttack(player) {
  const [x, y] = makeShipCoordinates();

  if (player.gameBoard.board[x][y].hittedSpot) {
    aiAttack(player);
    return;
  }

  player.gameBoard.receiveAttack(x, y);
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
