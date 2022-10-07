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

const mapCanvas = document.querySelector('#map-canvas');

function geerateOfferFeaturesList(offerElement, features) {
  const featuresList = offerElement.querySelector('.popup__features');

  const featureElement = featuresList.querySelector('.popup__feature').cloneNode(true);
  featuresList.innerHTML = '';

  for (const feature of features) {
    const featureElementClone = featureElement.cloneNode(true);
    featureElementClone.className = `popup__feature popup__feature--${feature}`;
    featuresList.append(featureElementClone);
  }
}
function generateOfferPhotesList(offerElement, photosSrc) {
  const photosList = offerElement.querySelector('.popup__photos');

  const photoElement = photosList.querySelector('.popup__photo').cloneNode(true);
  photosList.innerHTML = '';

  for (const src of photosSrc) {
    const photoElementClone = photoElement.cloneNode(true);
    photoElementClone.src = src;
    photosList.append(photoElementClone);
  }
}
function generateOffer(data) {
  const cardPopup = cardTemplate.cloneNode(true);
  cardPopup.querySelector('.popup__title').textContent = data.offer.title;
  cardPopup.querySelector('.popup__text--address').textContent = data.offer.address;
  cardPopup.dataLat = data.location.lat;
  cardPopup.dataLng = data.location.lng;

  cardPopup.querySelector('.popup__text--price').childNodes[0].textContent = data.offer.price;
  cardPopup.querySelector('.popup__type').textContent = ANNOUNCEMENT_TYPES[data.offer.type];
  cardPopup.querySelector('.popup__text--capacity').textContent = `
    ${data.offer.rooms}
    ${getNoun(data.offer.rooms, 'комната', 'комнаты', 'комнат')} для
    ${data.offer.guests}
    ${getNoun(data.offer.guests, 'гостя', 'гостей', 'гостей')}`;
  cardPopup.querySelector('.popup__text--time').textContent = `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`;

  if (data.offer.features.length === 0) {
    cardPopup.querySelector('.popup__features').remove();
  } else {
    geerateOfferFeaturesList(cardPopup, data.offer.features);
  }

  if (data.offer.description === '') {
    cardPopup.querySelector('.popup__description').remove();
  } else {
    cardPopup.querySelector('.popup__description').textContent = data.offer.description;
  }

  if (data.offer.photos.length === 0) {
    cardPopup.querySelector('.popup__photos').remove();
  } else {
    generateOfferPhotesList(cardPopup, data.offer.photos);
  }

  cardPopup.querySelector('.popup__avatar').src = data.author.avatar;
  return cardPopup;
}
const offers = dataOffers.map((item) => generateOffer(item));

export {offers};
