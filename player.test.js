import { player } from "./player";

describe("player should exist", () => {
  test("player function should be defined", () => {
    expect(player).toBeDefined();
  });
});

describe("players could be real or computer", () => {
  const playerInstanceReal = player("Nicolas");
  test("if I call the function with a name it should be real", () => {
    expect(playerInstanceReal.isReal).toBeTruthy();
  });

  const playerInstancePC = player();
  test("if I call the function with a name it should be real", () => {
    expect(playerInstancePC.isReal).toBeFalsy();
  });
});

describe("each player should contain its own gameboard", () => {
  const playerInstanceReal = player("Nicolas");
  test("if I call the function with a name it should be real", () => {
    expect(playerInstanceReal.gameBoard).toBeDefined();
  });

  const playerInstancePC = player();
  test("if I call the function with a name it should be real", () => {
    expect(playerInstancePC.gameBoard).toBeDefined();
  });
});
