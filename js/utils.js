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

function getNoun(number, oneNounValue, twoNounsValue, fiveNounsValue) {
  number %= 100;
  if (number >= 5 && number <= 20) {
    return fiveNounsValue;
  }
  number %= 10;
  if (number === 1) {
    return oneNounValue;
  }
  if (number >= 2 && number <= 4) {
    return twoNounsValue;
  }
  return fiveNounsValue;
}

export {getRandomPositiveInteger, getRandomPositiveFloat, getNoun};