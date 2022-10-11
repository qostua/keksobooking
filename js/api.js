import {
  showAlert
} from './utils.js';

const Url = {
  DATA: 'https://23.javascript.pages.academy/keksobooking/data',
  SERVER: 'https://23.javascript.pages.academy/keksobooking',
};

const getData = (onSucces) => {
  fetch(Url.DATA)
    .then((response) => {
      if (!response.ok) {
        throw Error(`Bad response. Code: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      onSucces(data);
    })
    .catch(() => {
      showAlert('error-server');
    });
};
const sendData = (onSucces, onFail, body) => {
  fetch(
    Url.SERVER,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSucces();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {
  getData,
  sendData
};
