import { gameBoard } from "./gameBoard";

export function player(name) {
  return {
    isReal: name ? true : false,
    gameBoard: gameBoard(),
  };
}
