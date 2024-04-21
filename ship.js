export const Ship = (name = "", length = 1) => {
  if (length > 10 || length < 1) {
    throw new Error("Length must be smaller than 10 and greater than 0");
    // return;
  } else {
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
  }
};
