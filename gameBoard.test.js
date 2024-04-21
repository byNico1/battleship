import { gameBoard } from "./gameBoard";
import { Ship } from "./ship";

describe("gameBoard factory should exist", () => {
  const gameBoardInstance = gameBoard();

  test("gameboard should be defined", () => {
    expect(gameBoard).toBeDefined();
  });

  test("gameboard should be an array of 10x10 grid", () => {
    expect(gameBoardInstance.board).toEqual(expect.any(Array));

    expect(gameBoardInstance.board).toHaveLength(10);
    gameBoardInstance.board.forEach((grid) => expect(grid.length).toBe(10));
  });
});

describe("gameBoard should be able to put ships in the board", () => {
  const gameBoardInstance = gameBoard();

  test("placeShip function should exist", () => {
    expect(gameBoardInstance.placeShip).toEqual(expect.any(Function));
  });

  test("placeShip function should tell me if I can put the ship in certain coordinates", () => {
    const shipInstance = Ship();

    expect(gameBoardInstance.placeShip(0, 0, shipInstance)).toBe(true);
    expect(gameBoardInstance.placeShip(9, 9, shipInstance)).toBe(true);
    expect(gameBoardInstance.placeShip(0, 9, shipInstance)).toBe(true);
    expect(gameBoardInstance.placeShip(9, 0, shipInstance)).toBe(true);
    expect(gameBoardInstance.placeShip(10, 12, shipInstance)).toBe(false);
    expect(gameBoardInstance.placeShip(9, 12, shipInstance)).toBe(false);
  });

  test("depending on the ship length it should tell me if it is possible to place it in certain coordinate", () => {
    const shipInstance2 = Ship("ship", 4);
    expect(gameBoardInstance.placeShip(0, 9, shipInstance2)).toBe(false);
  });

  test("if everything is right it should turn the ship distance array true", () => {
    const shipInstance2 = Ship("ship", 4);
    gameBoardInstance.placeShip(0, 0, shipInstance2);

    for (let i = 1; i <= shipInstance2.length; i++) {
      expect(gameBoardInstance.board[0][0 - 1 + i]).toEqual({
        ship: shipInstance2,
        hittedSpot: false,
      });
    }
  });
});

describe("should have receiveAttack function", () => {
  const gameBoardInstance = gameBoard();

  test("receiveAttack should exist", () => {
    expect(gameBoardInstance.receiveAttack).toEqual(expect.any(Function));
    gameBoardInstance.receiveAttack(0, 9);
    expect(gameBoardInstance.board[0][9]).toEqual({
      ship: false,
      hittedSpot: true,
    });
  });

  test("receiveAttack should increase a ship hits if it is located in that coordinate", () => {
    const shipInstance = Ship("", 4);

    gameBoardInstance.placeShip(0, 0, shipInstance);
    gameBoardInstance.receiveAttack(0, 0);

    expect(shipInstance.timesHitted).toBe(1);

    gameBoardInstance.receiveAttack(0, 1);
    expect(shipInstance.timesHitted).toBe(2);

    gameBoardInstance.receiveAttack(0, 1);
    expect(shipInstance.timesHitted).toBe(2);
  });

  test("If there is a missed attack it should put that coordinate in an array", () => {
    gameBoardInstance.receiveAttack(9, 5);
    expect(gameBoardInstance.missedAttacks).toEqual(
      expect.arrayContaining([[9, 5]])
    );
  });
});

describe("gameboard should know if all ships are sunk", () => {
  const gameBoardInstance = gameBoard();
  const shipInstance1 = Ship("first ship", 1);
  const shipInstance2 = Ship("second ship", 1);

  gameBoardInstance.placeShip(0, 0, shipInstance1);
  gameBoardInstance.placeShip(1, 0, shipInstance2);

  gameBoardInstance.receiveAttack(0, 0);
  gameBoardInstance.receiveAttack(1, 0);

  expect(gameBoardInstance.areShipsSunk()).toBeTruthy();
});
