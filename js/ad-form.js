import {showAlert} from './utils.js';
import {sendData} from './api.js';
import {setStartMapPosition, setStartMainMarkerPosition} from './map.js';
import {CustomValidation, resetValidityInput, checkInput} from './validation.js';
import {resetMapForm} from './map-form.js';

const minPriceToOfferType = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};
const capacityValuesToRoomNumber = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};
const roomNumberValuesToCapacity = {
  '0': ['100'],
  '1': ['1', '2', '3'],
  '2': ['2', '3'],
  '3': ['3'],
};

const DEFAULT_AVATAR_URL = 'img/muffin-grey.svg';

const adForm = document.querySelector('.ad-form');
const avatarPreview = adForm.querySelector('.ad-form-header__preview img');
const adTitleInput = adForm.querySelector('#title');
const adAddressInput = adForm.querySelector('#address');
const adPriceInput = adForm.querySelector('#price');
const adTypeSelect = adForm.querySelector('#type');
const adTimeinInput = adForm.querySelector('#timein');
const adTimeoutInput = adForm.querySelector('#timeout');
const adRoomNumberSelect = adForm.querySelector('#room_number');
const adCapacitySelect = adForm.querySelector('#capacity');
const adPhotoContainer = adForm.querySelector('.ad-form__photo-container');
const submitAdForm = adForm.querySelector('.ad-form__submit');
const resetBtnAdForm = adForm.querySelector('.ad-form__reset');

const removePreviewPhoto = () => {
  const adPhotos = adPhotoContainer.querySelectorAll('.ad-form__photo');

  for (let index = adPhotos.length - 1; index >= 0; index--) {
    adPhotos[index].remove();
  }
};
const resetForm = () => {
  adForm.reset();
  removePreviewPhoto();
  avatarPreview.src = DEFAULT_AVATAR_URL;

  resetMapForm();

  const fields = adForm.querySelectorAll('input, select, textarea');

  fields.forEach((field) => {
    if (field.CustomValidation) {
      resetValidityInput(field);
    }
    resetValidityInput(field);
  });

  setStartMapPosition();
  setStartMainMarkerPosition();
};

//check validity
const titleValidityChecks = [
  {
    getInvalidityMessage(input) {
      if (input.validity.valueMissing) {
        return 'Это обязательное поле';
      }
      return '';
    },
  },
  {
    getInvalidityMessage(input) {
      if (input.validity.tooShort) {
        return `Ещё ${input.minLength - input.value.length} симв.`;
      }
      return '';
    },
  },
  {
    getInvalidityMessage(input) {
      if (input.validity.tooLong) {
        return `Уберите ${input.value.length - input.maxLength} симв.`;
      }
      return '';
    },
  },
];
const priceValidityChecks = [
  {
    getInvalidityMessage(input) {
      if (input.validity.rangeUnderflow) {
        return `Не меньше ${input.min} руб.`;
      }
      return '';
    },
  },
  {
    getInvalidityMessage(input) {
      if (input.validity.rangeOverflow) {
        return `Не больше ${input.max} руб.`;
      }
      return '';
    },
  },
  {
    getInvalidityMessage(input) {
      if (input.validity.valueMissing) {
        return 'Это обязательное поле';
      }
      return '';
    },
  },
  {
    getInvalidityMessage(input) {
      if (input.validity.badInput) {
        return 'Введите числовое значение';
      }
      return '';
    },
  },
];
const roomNumberValidityChecks = [
  {
    getInvalidityMessage() {
      const roomNumber = adRoomNumberSelect.value;
      const capacity = adCapacitySelect.value;

      const validity = roomNumberValuesToCapacity[capacity].includes(roomNumber);

      if (!validity) {
        return (roomNumber === '100') ? 'Такое количество комнат не подходит для гостей' : `Для такого количества комнат доступно следующее количество гостей: ${capacityValuesToRoomNumber[roomNumber].join (', ')}`;
      }
      return '';
    },
  },
];

adTitleInput.CustomValidation = new CustomValidation(titleValidityChecks);
adPriceInput.CustomValidation = new CustomValidation(priceValidityChecks);
adCapacitySelect.CustomValidation = new CustomValidation(roomNumberValidityChecks);

adForm.addEventListener('input', (evt) => {
  if (evt.target.CustomValidation) {
    checkInput(evt.target);
  }
});

const setAddressValue = (value) => {
  adAddressInput.value = value;
};

adRoomNumberSelect.addEventListener('change', () => {
  checkInput(adCapacitySelect);
});
adCapacitySelect.addEventListener('change', () => {
  checkInput(adCapacitySelect);
});

const setMinPriceInput = (type) => {
  const minPrice = minPriceToOfferType[type];
  if (Number.isFinite(minPrice)) {
    adPriceInput.min = minPrice;
    adPriceInput.placeholder = minPrice;
  }
};
adTypeSelect.addEventListener('change', () => {
  setMinPriceInput(adTypeSelect.value);
  if (adPriceInput.value !== '') {
    checkInput(adPriceInput);
  }
});

adTimeinInput.addEventListener('change', () => {
  adTimeoutInput.value = adTimeinInput.value;
});
adTimeoutInput.addEventListener('change', () => {
  adTimeinInput.value = adTimeoutInput.value;
});

submitAdForm.addEventListener('click', () => {
  const fields = adForm.querySelectorAll('input, select, textarea');

  fields.forEach((field) => {
    if (field.CustomValidation) {
      checkInput(field);
    }
  });
});
resetBtnAdForm.addEventListener('click', (evt) => {
  evt.preventDefault();

  resetForm();
});

const setAdFormSubmit = (onSucsess) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      () => onSucsess(),
      () => showAlert('error'),
      new FormData(evt.target),
    );
  });
};

export {
  resetForm,
  setAdFormSubmit,
  setAddressValue,
  removePreviewPhoto
};
