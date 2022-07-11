const getRandomIntFromRange = function (firstNum, secondNum) {
  let min = (firstNum < secondNum) ? firstNum : secondNum;
  let max = (firstNum < secondNum) ? secondNum : firstNum;

  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1) + min);
};

getRandomIntFromRange(3.9, 1);

const getRandomFloorFromRange = function (firstNum, secondNum, numberSimbolsAfterComma) {
  const powerTen = 10 ** numberSimbolsAfterComma;

  return getRandomIntFromRange(firstNum * powerTen, secondNum * powerTen) / powerTen;
};

getRandomFloorFromRange(1, 2, 10);
