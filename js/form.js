const adForm = document.querySelector('.ad-form');

function disableAdForm() {
  adForm.classList.add('ad-form--disabled');

  for (const fieldset of adForm.querySelectorAll('fieldset')) {
    fieldset.disabled = true;
  }
}

const mapForm = document.querySelector('.map__filters');

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


export {disableForm, activateForm};

