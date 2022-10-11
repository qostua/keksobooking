import {
  isMapFormFiltersActive,
  isMapFormFeaturesActive,
  getActiveFiltersMapForm,
  getActiveFeaturesMapForm
} from './map-form.js';

const MAX_ADS_COUNT = 10;

const isAdOptionsMatch = (adOffer, filtersMapForm) => {
  const {type, priceRange, rooms, guests} = filtersMapForm;

  const isTypeMatch = !type || type === adOffer.type;
  const isRoomsMatch = !rooms || rooms === String(adOffer.rooms);
  const isGuestsMatch = !guests || guests === String(adOffer.guests);
  const isPriceMatch = adOffer.price >= priceRange.start && adOffer.price < priceRange.end;

  return isTypeMatch && isRoomsMatch && isGuestsMatch && isPriceMatch;
};
const isAdFeaturesMatch = (adOffer, mapFormfeatures) => {
  const offerFeatures = adOffer.features;

  if (!offerFeatures) {
    return false;
  }

  const rating = offerFeatures.reduce((currentRating, feature) => {
    if (mapFormfeatures.includes(feature)) {
      currentRating++;
    }
    return currentRating;
  }, 0);

  return rating === mapFormfeatures.length;
};

const getFilteredAds = (adData) => {
  if (!isMapFormFiltersActive() && !isMapFormFeaturesActive()) {
    return adData.slice(0, MAX_ADS_COUNT);
  }

  const filteredAds = [];
  const mapFormFilters = getActiveFiltersMapForm();
  const mapFormfeatures = getActiveFeaturesMapForm();

  for (let index = 0; index < adData.length; index++) {
    if (isMapFormFiltersActive() && !isAdOptionsMatch(adData[index].offer, mapFormFilters)) {
      continue;
    }
    if (isMapFormFeaturesActive() && !isAdFeaturesMatch(adData[index].offer, mapFormfeatures)) {
      continue;
    }

    filteredAds.push(adData[index]);
    if (filteredAds.length === MAX_ADS_COUNT) {
      break;
    }
  }

  return filteredAds;
};

export {
  getFilteredAds
};
