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

const houseTypeSelect = document.querySelector('#housing-type');
const housePriceSelect = document.querySelector('#housing-price');
const houseRoomsSelect = document.querySelector('#housing-rooms');
const houseHousingGuestsSelect = document.querySelector('#housing-guests');

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

  for (const select of selects) {
    if (select.value !== 'any') {
      return true;
    }
  }

  return false;
};
const isMapFormFeaturesActive = () => {
  const checkboxs = mapForm.querySelectorAll('input[type=checkbox]');

  for (const checkbox of checkboxs) {
    if (checkbox.checked) {
      return true;
    }
  }

  return false;
};

const getMapFormFeatures = () => {
  const checkboxs = mapForm.querySelectorAll('input[type=checkbox]');
  const features = [];

  for (const checkbox of checkboxs) {
    if (checkbox.checked) {
      features.push(checkbox.value);
    }
  }

  return features;
};
const getMapFormFilters = () => {
  const filters = {};

  filters.type = houseTypeSelect.value;
  filters.priceRange = housePricesRange[housePriceSelect.value];
  filters.rooms = houseRoomsSelect.value;
  filters.guests = houseHousingGuestsSelect.value;

  return filters;
};

const setMapFormChange = (cb) => {
  mapForm.addEventListener('change', () => {
    cb();
  });
};

export {
  resetMapForm,
  isMapFormFiltersActive,
  isMapFormFeaturesActive,
  getMapFormFeatures,
  setMapFormChange,
  getMapFormFilters
};
