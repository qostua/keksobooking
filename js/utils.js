function getRandomPositiveInteger (val1, val2) {
  const lower = Math.ceil(Math.min(Math.abs(val1), Math.abs(val2)));
  const upper = Math.floor(Math.max(Math.abs(val1), Math.abs(val2)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}
function getRandomPositiveFloat (val1, val2, digits = 1) {
  const lower = Math.min(Math.abs(val1), Math.abs(val2));
  const upper = Math.max(Math.abs(val1), Math.abs(val2));
  const result = Math.random() * (upper - lower) + lower;
  return result.toFixed(digits);
}

export {getRandomPositiveInteger, getRandomPositiveFloat};
