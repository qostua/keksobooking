import {generateDataAnnouncements, ANNOUNCEMENT_TYPES} from './generate-data-offer.js';
import {getNoun} from './utils.js';

const offerTypes = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Гостиница',
};

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const generateOfferFeaturesList = (offer, features) => {
  const featuresList = offer.querySelector('.popup__features');

  const featureItem = featuresList.querySelector('.popup__feature').cloneNode(true);
  featuresList.innerHTML = '';

  for (const feature of features) {
    const featureItemClone = featureItem.cloneNode(true);
    featureItemClone.className = `popup__feature popup__feature--${feature}`;
    featuresList.append(featureItemClone);
  }
};
const generateOfferPhotosList = (offer, photosSrc) => {
  const photosList = offer.querySelector('.popup__photos');

  const photoItem = photosList.querySelector('.popup__photo').cloneNode(true);
  photosList.innerHTML = '';

  for (const src of photosSrc) {
    const photoItemClone = photoItem.cloneNode(true);
    photoItemClone.src = src;
    photosList.append(photoItemClone);
  }
};

const setOfferData = (offer, data) => {
  offer.querySelector('.popup__title').textContent = data.title;
  offer.querySelector('.popup__text--address').textContent = data.address;
  offer.querySelector('.popup__text--price').childNodes[0].textContent = data.price;
  offer.querySelector('.popup__type').textContent = offerTypes[data.type];
  offer.querySelector('.popup__text--capacity').textContent = `
    ${data.rooms}
    ${getNoun(data.rooms, 'комната', 'комнаты', 'комнат')} для
    ${data.guests}
    ${getNoun(data.guests, 'гостя', 'гостей', 'гостей')}`;
  offer.querySelector('.popup__text--time').textContent = `Заезд после ${data.checkin}, выезд до ${data.checkout}`;

  if (!data.features) {
    offer.querySelector('.popup__features').remove();
  } else {
    generateOfferFeaturesList(offer, data.features);
  }

  if (data.description === '') {
    offer.querySelector('.popup__description').remove();
  } else {
    offer.querySelector('.popup__description').textContent = data.description;
  }

  if (!data.photos) {
    offer.querySelector('.popup__photos').remove();
  } else {
    generateOfferPhotosList(offer, data.photos);
  }
};
const setAuthorData = (offer, data) => {
  offer.querySelector('.popup__avatar').src = data.avatar;
};
const setLocationData = (offer, data) => {
  offer.dataLat = data.lat;
  offer.dataLng = data.lng;
};

const generateOfferPopup = (data) => {
  const offerPopup = cardTemplate.cloneNode(true);

  setAuthorData(offerPopup, data.author);
  setOfferData(offerPopup, data.offer);
  setLocationData(offerPopup, data.location);

  return offerPopup;
};

  cardPopup.querySelector('.popup__avatar').src = data.author.avatar;
  return cardPopup;
}
const offers = dataOffers.map((item) => generateOffer(item));

export {offers};
