import { Ship } from "./ship";

describe("ship factory function has needed propertys", () => {
  const ShipObject = Ship();

  test("ship should be defined", () => {
    expect(ShipObject).toHaveProperty("length");
    expect(ShipObject).toMatchObject({
      name: expect.any(String),
      length: expect.any(Number),
      timesHitted: expect.any(Number),
      sunk: expect.any(Boolean),
      hit: expect.any(Function),
      isSunk: expect.any(Function),
    });
  });
});

describe("if the ship is larger than 10 or less than 1 it should return false", () => {
  expect(() => {
    Ship("Player one", 11);
  }).toThrow(Error);
  expect(() => {
    Ship("Player one", 0);
  }).toThrow(Error);
});

describe("hit function increases hits", () => {
  const ShipObject = Ship();

  test("increases hits", () => {
    [...Array(5)].forEach(() => ShipObject.hit());
    expect(ShipObject.timesHitted).toBe(5);
  });
});

describe("isSunk function works", () => {
  const ShipObject = Ship("Player one", 6);

  test("isSunk makes sunk property true when length equals number of hits", () => {
    [...Array(6)].forEach(() => ShipObject.hit());
    expect(ShipObject.isSunk()).toBe(true);
  });
});
