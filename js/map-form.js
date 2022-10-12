const housePricesRange = {
  'low': {
    start: 0,
    end: 10000,
  },
  'middle': {
    start: 10000,
    end: 50000,
  },
  'high': {
    start: 50000,
    end: Infinity,
  },
  'any': {
    start: 0,
    end: Infinity,
  },
};
const DEFAULT_FILTER_VALUE = 'any';

const mapForm = document.querySelector('.map__filters');
const houseTypeSelect = mapForm.querySelector('#housing-type');
const housePriceSelect = mapForm.querySelector('#housing-price');
const houseRoomsSelect = mapForm.querySelector('#housing-rooms');
const houseHousingGuestsSelect = mapForm.querySelector('#housing-guests');

const resetMapForm = () => {
  mapForm.reset();
};

const isMapFormFiltersActive = () => {
  const selects = mapForm.querySelectorAll('select');

  return Array.from(selects).some((select) => select.value !== DEFAULT_FILTER_VALUE);
};
const isMapFormFeaturesActive = () => {
  const checkboxes = mapForm.querySelectorAll('input[type=checkbox]');

  return Array.from(checkboxes).some((checkbox) => checkbox.checked);
};

const getActiveFiltersMapForm = () => {
  const filters = {};

  filters.type = (houseTypeSelect.value !== DEFAULT_FILTER_VALUE) ? houseTypeSelect.value : false;
  filters.rooms = (houseRoomsSelect.value !== DEFAULT_FILTER_VALUE) ? houseRoomsSelect.value : false;
  filters.guests = (houseHousingGuestsSelect.value !== DEFAULT_FILTER_VALUE) ? houseHousingGuestsSelect.value : false;
  filters.priceRange = housePricesRange[housePriceSelect.value];

  return filters;
};
const getActiveFeaturesMapForm = () => {
  const checkboxs = mapForm.querySelectorAll('input[type=checkbox]');
  const features = [];

  checkboxs.forEach((checkbox) => {
    if (checkbox.checked) {
      features.push(checkbox.value);
    }
  });

  return features;
};

const setMapFormChange = (cb) => {
  mapForm.addEventListener('change', () => {
    cb();
  });
};
const setMapFormReset = (cb) => {
  mapForm.addEventListener('reset', () => {
    cb();
  });
};

export {
  isMapFormFiltersActive,
  isMapFormFeaturesActive,
  getActiveFiltersMapForm,
  getActiveFeaturesMapForm,
  setMapFormChange,
  setMapFormReset,
  resetMapForm
};
