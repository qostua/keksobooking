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
};

const showAlert = (idTemplate = 'error') => {
  const alertTemplate = document.querySelector(`#${idTemplate}`);
  if (!alertTemplate) {
    return;
  }

  const alert = alertTemplate.content.firstElementChild.cloneNode(true);

  document.querySelector('body').append(alert);

  const handleKeypress = (evt) => {
    if (evt.key === 'Escape') {
      alert.remove();
      document.removeEventListener('keydown', handleKeypress);
    }
  };

  document.addEventListener('keydown', handleKeypress);

  document.addEventListener('click', () => {
    alert.remove();
    document.removeEventListener('keydown', handleKeypress);
  }, { once: true });
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  getNoun,
  showAlert,
  debounce
};
