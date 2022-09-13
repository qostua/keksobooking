import {generateDataAnnouncements, ANNOUNCEMENT_TYPES} from './generate-data-offer.js';
import {getNoun} from './utils.js';

const dataOffers = generateDataAnnouncements(10);

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

const offers = dataOffers.map((item) => {
  const cardPopup = cardTemplate.cloneNode(true);
  cardPopup.querySelector('.popup__title').textContent = item.offer.title;
  cardPopup.querySelector('.popup__text--address').textContent = item.offer.address;
  cardPopup.querySelector('.popup__text--price').childNodes[0].textContent = item.offer.price;
  cardPopup.querySelector('.popup__type').textContent = ANNOUNCEMENT_TYPES[item.offer.type];
  cardPopup.querySelector('.popup__text--capacity').textContent = `
    ${item.offer.rooms}
    ${getNoun(item.offer.rooms, 'комната', 'комнаты', 'комнат')} для
    ${item.offer.guests}
    ${getNoun(item.offer.guests, 'гостя', 'гостей', 'гостей')}`;
  cardPopup.querySelector('.popup__text--time').textContent = `Заезд после ${item.offer.checkin}, выезд до ${item.offer.checkout}`;

  if (item.offer.features.length === 0) {
    cardPopup.querySelector('.popup__features').remove();
  } else {
    geerateOfferFeaturesList(cardPopup, item.offer.features);
  }

  if (item.offer.description === '') {
    cardPopup.querySelector('.popup__description').remove();
  } else {
    cardPopup.querySelector('.popup__description').textContent = item.offer.description;
  }

  if (item.offer.photos.length === 0) {
    cardPopup.querySelector('.popup__photos').remove();
  } else {
    generateOfferPhotesList(cardPopup, item.offer.photos);
  }

  cardPopup.querySelector('.popup__avatar').src = item.author.avatar;
  return cardPopup;
});

mapCanvas.append(offers[0]);
