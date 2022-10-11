import {
  CustomValidation,
  resetValidityInput,
  checkInput
} from './validation.js';
import {
  removePreviewAvatar,
  removePreviewPhoto,
  setAvatarChooserChange,
  setAdImageChooserChange
} from './preview-image.js';
import {
  sendData
} from './api.js';
import {
  showAlert
} from './utils.js';

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

const adForm = document.querySelector('.ad-form');
const adTitleInput = adForm.querySelector('#title');
const adAddressInput = adForm.querySelector('#address');
const adPriceInput = adForm.querySelector('#price');
const adTypeSelect = adForm.querySelector('#type');
const adTimeinInput = adForm.querySelector('#timein');
const adTimeoutInput = adForm.querySelector('#timeout');
const adRoomNumberSelect = adForm.querySelector('#room_number');
const adCapacitySelect = adForm.querySelector('#capacity');
const submitAdForm = adForm.querySelector('.ad-form__submit');
const resetBtnAdForm = adForm.querySelector('.ad-form__reset');

//validity
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

//utils
const setAddressValue = (value) => {
  adAddressInput.value = value;
};
const setMinPriceInput = (typeOffer) => {
  const minPrice = minPriceToOfferType[typeOffer];

  if (Number.isFinite(minPrice)) {
    adPriceInput.min = minPrice;
    adPriceInput.placeholder = minPrice;
  }
};
const activateSubmit = () => {
  submitAdForm.disabled = false;
};
const resetAdForm = () => {
  adForm.reset();
  removePreviewAvatar();
  removePreviewPhoto();

  const fields = adForm.querySelectorAll('input, select, textarea');

  fields.forEach((field) => {
    if (field.CustomValidation) {
      resetValidityInput(field);
    }
  });
};

//event listeners
adForm.addEventListener('input', (evt) => {
  if (evt.target.CustomValidation) {
    checkInput(evt.target);
  }
});
adTypeSelect.addEventListener('change', () => {
  setMinPriceInput(adTypeSelect.value);
  if (adPriceInput.value !== '') {
    checkInput(adPriceInput);
  }
});
adCapacitySelect.addEventListener('change', () => {
  checkInput(adCapacitySelect);
});
adRoomNumberSelect.addEventListener('change', () => {
  checkInput(adCapacitySelect);
});
adTimeinInput.addEventListener('change', () => {
  adTimeoutInput.value = adTimeinInput.value;
});
adTimeoutInput.addEventListener('change', () => {
  adTimeinInput.value = adTimeoutInput.value;
});
setAvatarChooserChange();
setAdImageChooserChange();

submitAdForm.addEventListener('click', () => {
  const fields = adForm.querySelectorAll('input, select, textarea');

  fields.forEach((field) => {
    if (field.CustomValidation) {
      checkInput(field);
    }
  });
});

const setAdFormSubmit = (onSucsess) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    submitAdForm.disabled = true;
    sendData(
      () => onSucsess(),
      () => {
        showAlert('error');
        activateSubmit();
      },
      new FormData(evt.target),
    );
  });
};
const setResetBtnClick = (cb) => {
  resetBtnAdForm.addEventListener('click', (evt) => {
    evt.preventDefault();

    cb();
  });
};

export {
  setAddressValue,
  setAdFormSubmit,
  activateSubmit,
  setResetBtnClick,
  resetAdForm
};
