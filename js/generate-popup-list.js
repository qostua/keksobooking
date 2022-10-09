import {
  isMapFormFiltersActive,
  isMapFormFeaturesActive,
  getMapFormFeatures,
  getMapFormFilters
} from './map-form.js';
import {
  generateAdPopup
} from './generate-ad-popup.js';

const MAX_ADS_COUNT = 10;
const DEFAULT_FILTER_VALUE = 'any';

const filterAds = (adOffer, mapFormFilters) => {
  const {type, priceRange, rooms, guests} = mapFormFilters;

  const isTypeMatch = type === adOffer.type || type === DEFAULT_FILTER_VALUE;
  const isRoomsMatch = rooms === String(adOffer.rooms) || rooms === DEFAULT_FILTER_VALUE;
  const isGuestsMatch = guests === String(adOffer.guests) || guests === DEFAULT_FILTER_VALUE;
  const isPriceMatch = adOffer.price >= priceRange.start && adOffer.price < priceRange.end;

  return isTypeMatch && isRoomsMatch && isGuestsMatch && isPriceMatch;
};

const getAdRating = (adOffer, mapFormfeatures) => {
  const offerFeatures = adOffer.features;

  if (!offerFeatures) {
    return 0;
  }

  return offerFeatures.reduce((rating, feature) => {
    if (mapFormfeatures.includes(feature)) {
      rating++;
    }
    return rating;
  }, 0);
};
const sortAds = (adOfferA, adOfferB, mapFormfeatures) => {
  const ratingA = getAdRating(adOfferA, mapFormfeatures);
  const ratingB = getAdRating(adOfferB, mapFormfeatures);
  return ratingB - ratingA;
};

const generatePopupList = (adData) => {
  let ads = adData.slice();

  if (isMapFormFiltersActive()) {
    const mapFormFilters = getMapFormFilters();
    ads = ads.filter((ad) => filterAds(ad.offer, mapFormFilters));
  }
  if (isMapFormFeaturesActive()) {
    const mapFormfeatures = getMapFormFeatures();
    ads.sort((adA, adB) => sortAds(adA.offer, adB.offer, mapFormfeatures));
  }

  return ads.slice(0, MAX_ADS_COUNT).map((ad) => generateAdPopup(ad));
};

export {
  generatePopupList
};
