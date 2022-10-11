const adForm = document.querySelector('.ad-form');
const mapForm = document.querySelector('.map__filters');

const disableAdForm = () => {
  adForm.classList.add('ad-form--disabled');

  const fieldsets = mapForm.querySelectorAll('fieldset');
  for (const fieldset of fieldsets) {
    fieldset.disabled = true;
  }
};
const disableMapForm = () => {
  mapForm.classList.add('map__filters--disabled');

  const fields = mapForm.querySelectorAll('select, fieldset');
  for (const field of fields) {
    field.disabled = true;
  }
};
const disableForm = () => {
  disableAdForm();
  disableMapForm();
};

const activateDiabledElements = (parent) => {
  const disabledElements = parent.querySelectorAll('*[disabled]');
  for (const disabledElement of disabledElements) {
    disabledElement.disabled = false;
  }
};
const activateAdForm = () => {
  activateDiabledElements(adForm);
  adForm.classList.remove('ad-form--disabled');
};
const activateMapForm = () => {
  activateDiabledElements(mapForm);
  mapForm.classList.remove('map__filters--disabled');
};

export {disableForm, activateAdForm, activateMapForm};
