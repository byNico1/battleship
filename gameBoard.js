export const gameBoard = () => {
  const board = Array.from({ length: 10 }, () => Array(10).fill(false));
  let totalShips = 0;
  const missedAttacks = [];

  function placeShip(x, y, ship) {
    if (
      board[x] === undefined ||
      board[x][y] === undefined ||
      board[x][y] === true ||
      board[x].length < ship.length ||
      board[x][y - 1 + ship.length] === undefined
    ) {
      return false;
    }

    for (let i = 1; i <= ship.length; i++) {
      if (board[x][y - 1 + i] === true) {
        return false;
      }
    }

    for (let i = 1; i <= ship.length; i++) {
      board[x][y - 1 + i] = { ship, hittedSpot: false };
    }

    totalShips += 1;

    return true;
  }

  function receiveAttack(x, y) {
    if (board[x][y] && board[x][y].hittedSpot === false) {
      board[x][y].ship.timesHitted++;
      board[x][y].hittedSpot = true;
      if (board[x][y].ship.isSunk() === true) {
        totalShips -= 1;
      }
    }
    if (board[x][y] === false) {
      board[x][y] = { ship: false, hittedSpot: true };
      missedAttacks.push([x, y]);
    }
  }

  function areShipsSunk() {
    if (totalShips === 0) {
      return true;
    }
    return false;
  }

  return {
    board,
    placeShip,
    receiveAttack,
    missedAttacks,
    areShipsSunk,
  };
};
