export const Ship = (name = "", length = 1) => {
  return {
    name,
    length,
    timesHitted: 0,
    sunk: false,
    hit() {
      this.timesHitted++;
    },
    isSunk() {
      return this.timesHitted === this.length;
    },
  };
};
