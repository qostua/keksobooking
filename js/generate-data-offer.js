import {getRandomPositiveInteger, getRandomPositiveFloat} from './utils.js';

const ANNOUNCEMENT_TYPES = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Гостиница',
};
const ANNOUNCEMENT_CHECKINS = [
  '12:00',
  '13:00',
  '14:00',
];
const ANNOUNCEMENT_CHECKOUTS = [
  '12:00',
  '13:00',
  '14:00',
];
const ANNOUNCEMENT_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const ANNOUNCEMENT_DESCRIPTION = [
  'просторными',
  'светлыми',
  'удобными',
  'оснащенными всем необходимым',
];
const ANNOUNCEMENT_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

function getRandomElementArray(array) {
  return array[getRandomPositiveInteger(0, array.length - 1)];
}
function getRandomSubArray(array) {
  return array.sort(() => 0.5 - Math.random()).slice(0, getRandomPositiveInteger(0, array.length - 1));
}
function createAnnouncement(index) {
  const type = getRandomElementArray(Object.keys(ANNOUNCEMENT_TYPES));
  const rooms = getRandomPositiveInteger(1, 5);
  const lat = getRandomPositiveFloat(35.65000, 35.70000, 5);
  const lng = getRandomPositiveFloat(139.70000, 139.80000, 5);

  return {
    author: {
      avatar: `img/avatars/user${index.toString().padStart(2, '0')}.png`,
    },
    offer: {
      title: `${ANNOUNCEMENT_TYPES[type]} (всего комнат: ${rooms})`,
      address: `${lat}, ${lng}`,
      price: getRandomPositiveInteger(10, 200) * 100,
      type: type,
      rooms: rooms,
      guests: getRandomPositiveInteger(1, 10),
      checkin: getRandomElementArray(ANNOUNCEMENT_CHECKINS),
      checkout: getRandomElementArray(ANNOUNCEMENT_CHECKOUTS),
      features: getRandomSubArray(ANNOUNCEMENT_FEATURES),
      description: `${ANNOUNCEMENT_TYPES[type]} c ${getRandomSubArray(ANNOUNCEMENT_DESCRIPTION).join(', ')} комнатами`,
      photos: getRandomSubArray(ANNOUNCEMENT_PHOTOS),
    },
    location: {
      lat: lat,
      lng: lng,
    },
  };
}

function generateDataAnnouncements(num) {
  return new Array(num).fill(null).map((item, index) => createAnnouncement(index + 1));
}

export {generateDataAnnouncements};
