const getNoun = (number, oneNounValue, twoNounsValue, fiveNounsValue) => {
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
