const adForm = document.querySelector('.ad-form');
const mapForm = document.querySelector('.map__filters');

//activate and disable forms
const disableAdForm = () => {
  adForm.classList.add('ad-form--disabled');

  for (const fieldset of adForm.querySelectorAll('fieldset')) {
    fieldset.disabled = true;
  }
};
const disableMapForm = () => {
  mapForm.classList.add('map__filters--disabled');

  for (const select of mapForm.querySelectorAll('select')) {
    select.disabled = true;
  }
  for (const fieldset of mapForm.querySelectorAll('fieldset')) {
    fieldset.disabled = true;
  }
};
const disableForm = () => {
  disableAdForm();
  disableMapForm();
};

const activateDiabledElements = (parent) => {
  for (const disabledElement of parent.querySelectorAll('*[disabled]')) {
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
