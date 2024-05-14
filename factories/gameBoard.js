export const gameBoard = () => {
  const board = Array.from({ length: 10 }, () => Array(10).fill(false));
  let totalShips = 0;
  const missedAttacks = [];

  function placeShip(x, y, ship, isHorizontal) {
    if (
      board[x] === undefined ||
      board[x][y] === undefined ||
      board[x][y] === true
    ) {
      return false;
    }

    if (isHorizontal) {
      if (board[x][y - 1 + ship.length] === undefined) {
        return false;
      }

      for (let cell = 1; cell <= ship.length; cell++) {
        if (board[x][y - 1 + cell] === true || board[x][y - 1 + cell]) {
          return false;
        }
      }

      for (let i = 1; i <= ship.length; i++) {
        board[x][y - 1 + i] = { ship, hittedSpot: false };
      }
    } else {
      for (let cell = 1; cell <= ship.length; cell++) {
        if (
          board[x - 1 + cell] === undefined ||
          board[x - 1 + cell][y] === undefined ||
          board[x - 1 + cell][y] === true
        ) {
          return false;
        }
      }

      for (let i = 1; i <= ship.length; i++) {
        board[x - 1 + i][y] = { ship, hittedSpot: false };
      }
    }

    totalShips += 1;
    console.log(totalShips);

    return true;
  }

  function receiveAttack(x, y) {
    if (board[x][y] && board[x][y].hittedSpot === false) {
      board[x][y].ship.hit();
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
