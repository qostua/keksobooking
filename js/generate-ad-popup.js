import {
  getNoun
} from './utils.js';
import {
  getFilteredAds
} from './filtration-ad.js';

const offerTypes = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Гостиница',
};

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const generateOfferFeaturesList = (popup, features) => {
  const featuresList = popup.querySelector('.popup__features');

  const featureItem = featuresList.querySelector('.popup__feature').cloneNode(true);
  featuresList.innerHTML = '';

  const fragment = new DocumentFragment();
  for (const feature of features) {
    const featureItemClone = featureItem.cloneNode(true);
    featureItemClone.className = `popup__feature popup__feature--${feature}`;
    fragment.append(featureItemClone);
  }

  featuresList.append(fragment);
};
const generateOfferPhotosList = (popup, photosSrc) => {
  const photosList = popup.querySelector('.popup__photos');

  const photoItem = photosList.querySelector('.popup__photo').cloneNode(true);
  photosList.innerHTML = '';

  const fragment = new DocumentFragment();
  for (const src of photosSrc) {
    const photoItemClone = photoItem.cloneNode(true);
    photoItemClone.src = src;
    fragment.append(photoItemClone);
  }

  photosList.append(fragment);
};

const setAuthorData = (popup, data) => {
  popup.querySelector('.popup__avatar').src = data.avatar;
};
const setOfferData = (popup, data) => {
  popup.querySelector('.popup__title').textContent = data.title;
  popup.querySelector('.popup__text--address').textContent = data.address;
  popup.querySelector('.popup__text--price').childNodes[0].textContent = data.price;
  popup.querySelector('.popup__type').textContent = offerTypes[data.type];
  popup.querySelector('.popup__text--capacity').textContent = `
    ${data.rooms}
    ${getNoun(data.rooms, 'комната', 'комнаты', 'комнат')} для
    ${data.guests}
    ${getNoun(data.guests, 'гостя', 'гостей', 'гостей')}`;
  popup.querySelector('.popup__text--time').textContent = `Заезд после ${data.checkin}, выезд до ${data.checkout}`;

  if (!data.features) {
    popup.querySelector('.popup__features').remove();
  } else {
    generateOfferFeaturesList(popup, data.features);
  }

  if (data.description === '') {
    popup.querySelector('.popup__description').remove();
  } else {
    popup.querySelector('.popup__description').textContent = data.description;
  }

  if (!data.photos) {
    popup.querySelector('.popup__photos').remove();
  } else {
    generateOfferPhotosList(popup, data.photos);
  }
};
const setLocationData = (popup, data) => {
  popup.dataset.lat = data.lat;
  popup.dataset.lng = data.lng;
};

const generateAdPopup = (data) => {
  const popup = cardTemplate.cloneNode(true);

  setAuthorData(popup, data.author);
  setOfferData(popup, data.offer);
  setLocationData(popup, data.location);

  return popup;
};

const generatePopupList = (adData) => getFilteredAds(adData).map((ad) => generateAdPopup(ad));


export {
  generatePopupList
};
