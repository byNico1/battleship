function hasElement(arr, el) {
  return arr.some((x) => x[0] === el[0] && x[1] === el[1]);
}

function hasElementInsideArray(arr, el) {
  return arr.some((ships) =>
    ships.some((coord) => coord.some((x) => x[0] === el[0] && x[1] === el[1]))
  );
}

function deepCopy(obj) {
  if (Array.isArray(obj)) {
    return obj.map((item) => deepCopy(item));
  } else if (typeof obj === "object" && obj !== null) {
    let copiedObj = {};
    for (let key in obj) {
      copiedObj[key] = deepCopy(obj[key]);
    }
    return copiedObj;
  } else {
    return obj;
  }
}

export { hasElement, hasElementInsideArray, deepCopy };
