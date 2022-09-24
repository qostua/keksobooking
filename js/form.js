const MIN_AD_TITELE_LENGTH = 30;
const MAX_AD_TITELE_LENGTH = 30;
const MIN_PRICE_FOR_AD_TYPE = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};
const CAPACITY_VALUES_FOR_ROOM_NUMBER = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};
const ROOM_NUMBER_VALUES_FOR_CAPACITY = {
  '0': ['100'],
  '1': ['1', '2', '3'],
  '2': ['2', '3'],
  '3': ['3'],
};

const adForm = document.querySelector('.ad-form');
const mapForm = document.querySelector('.map__filters');

//активация и дизактивация формы
function disableAdForm() {
  adForm.classList.add('ad-form--disabled');

  for (const fieldset of adForm.querySelectorAll('fieldset')) {
    fieldset.disabled = true;
  }
}
function disableMapForm() {
  mapForm.classList.add('map__filters--disabled');

  for (const select of mapForm.querySelectorAll('select')) {
    select.disabled = true;
  }
  for (const fieldset of mapForm.querySelectorAll('fieldset')) {
    fieldset.disabled = true;
  }
}
function disableForm() {
  disableAdForm();
  disableMapForm();
}

function activeDiabledElements(parent) {
  for (const disabledElement of parent.querySelectorAll('*[disabled]')) {
    disabledElement.disabled = false;
  }
}
function activateForm() {
  activeDiabledElements(adForm);
  adForm.classList.remove('ad-form--disabled');

  activeDiabledElements(mapForm);
  mapForm.classList.remove('map__filters--disabled');
}

//проверка валидности
const adTitleInput = adForm.querySelector('#title');
adTitleInput.addEventListener('invalid', () => {
  const valueLength = adTitleInput.value.length;

  if (adTitleInput.validity.tooShort) {
    adTitleInput.setCustomValidity(`Еще ${MIN_AD_TITELE_LENGTH - valueLength} симв.`);
  } else if (adTitleInput.validity.tooLong) {
    adTitleInput.setCustomValidity(`Удалите лишние ${valueLength - MAX_AD_TITELE_LENGTH} симв.`);
  } else if (adTitleInput.validity.valueMissing) {
    adTitleInput.setCustomValidity('Это обязательное поле');
  } else {
    adTitleInput.setCustomValidity('');
  }
});
adTitleInput.addEventListener('input', () => {
  adTitleInput.reportValidity();
});

const adPriceInput = adForm.querySelector('#price');
adPriceInput.addEventListener('invalid', () => {
  const minPrice = adPriceInput.min;
  const maxPrice = adPriceInput.max;

  if (adPriceInput.validity.rangeUnderflow) {
    adPriceInput.setCustomValidity(`Цена должна быть не меньше ${minPrice} руб.`);
  } else if (adPriceInput.validity.rangeOverflow) {
    adPriceInput.setCustomValidity(`Цена должна быть не больше ${maxPrice} руб.`);
  } else if (adPriceInput.validity.valueMissing) {
    adPriceInput.setCustomValidity('Это обязательное поле');
  } else {
    adPriceInput.setCustomValidity('');
  }

});
adPriceInput.addEventListener('input', () => {
  adPriceInput.reportValidity();
});

const adTimeinInput = adForm.querySelector('#timein');
const adTimeoutInput = adForm.querySelector('#timeout');
adTimeinInput.addEventListener('change', () => {
  adTimeoutInput.value = adTimeinInput.value;
});
adTimeoutInput.addEventListener('change', () => {
  adTimeinInput.value = adTimeoutInput.value;
});
function customVslidityForTime() {
  if (adTimeoutInput.value !== adTimeinInput.value) {
    adTimeoutInput.setCustomValidity('Время заезда и выезда должно совпадать');
  } else {
    adTimeoutInput.setCustomValidity('');
  }

  adTimeoutInput.reportValidity();
}

const adTypeSelect = adForm.querySelector('#type');
function setMinPriceInput(type) {
  adPriceInput.min = MIN_PRICE_FOR_AD_TYPE[type];
}
adTypeSelect.addEventListener('change', () => {
  setMinPriceInput(adTypeSelect.value);
  if (adPriceInput.value !== '') {
    adPriceInput.reportValidity();
  }
});

const adRoomNumberSelect = adForm.querySelector('#room_number');
const adCapacitySelect = adForm.querySelector('#capacity');
function customValidityForRoomNumber() {
  const roomNumber = adRoomNumberSelect.value;
  const capacity = adCapacitySelect.value;

  const validity = ROOM_NUMBER_VALUES_FOR_CAPACITY[capacity].includes(roomNumber);
  if (!validity) {
    const customValidityMessage = (roomNumber === '100') ? 'Такое количество комнат не подходит для гостей' : `Для такого количества комнат доступно следующее количество гостей: ${CAPACITY_VALUES_FOR_ROOM_NUMBER[roomNumber].join (', ')}`;

    adCapacitySelect.setCustomValidity(customValidityMessage);
  } else {
    adCapacitySelect.setCustomValidity('');
  }
  adCapacitySelect.reportValidity();
}

adRoomNumberSelect.addEventListener('change', () => {
  customValidityForRoomNumber();
});
adCapacitySelect.addEventListener('change', () => {
  customValidityForRoomNumber();
});

const adImagesInput = adForm.querySelector('#images');
adImagesInput.addEventListener('invalid', () => {
  if (adImagesInput.validity.valueMissing) {
    adImagesInput.setCustomValidity('Выберете одну или несколько фотографий вашего жилья');
  } else {
    adImagesInput.setCustomValidity('');
  }
});

const adFormSubmit = adForm.querySelector('.ad-form__submit');
adFormSubmit.addEventListener('click', () => {
  customValidityForRoomNumber();
  customVslidityForTime();
});

export {disableForm, activateForm};
