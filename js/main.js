const getRandomIntFromRange = function (firstNum, secondNum) {
  const min = Math.ceil(Math.min(Math.abs(firstNum), Math.abs(secondNum)));
  const max = Math.floor(Math.max(Math.abs(firstNum), Math.abs(secondNum)));

  return Math.floor(Math.random() * (max - min + 1) + min);
};

getRandomIntFromRange(3.9, 1);

const getRandomFloorFromRange = function (firstNum, secondNum, numberSimbolsAfterComma) {
  const min = Math.min(Math.abs(firstNum), Math.abs(secondNum));
  const max = Math.max(Math.abs(firstNum), Math.abs(secondNum));
  const result = Math.random() * (max - min) + min;
  return result.toFixed(numberSimbolsAfterComma);
};

getRandomFloorFromRange(1, 2, 10);
