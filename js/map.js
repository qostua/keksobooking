import {offers} from './generate-card.js';

const map = L.map('map-canvas')
  .on('load', () => {
    console.log('load');
  })
  .setView({
    lat: 35.652832,
    lng: 139.839478,
  }, 10);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
document.querySelector('.leaflet-control-attribution').style.fontSize = '5px';

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
const pinIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainMarker = L.marker(
  {
    lat: 35.652832,
    lng: 139.839478,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainMarker.addTo(map);

const addressInput = document.querySelector('#address');

mainMarker.on('move', () => {
  addressInput.value = Object.values(mainMarker._latlng)
    .map((item) => item.toFixed(5))
    .join(', ');
});

const offerMarkers = L.layerGroup().addTo(map);

function createMarker(card) {
  const lat = card.dataLat;
  const lng = card.dataLng;

  const marker = L.marker(
    {
      lat: lat,
      lng: lng,
    },
    {
      icon: pinIcon,
    },
  );

  marker
    .addTo(offerMarkers)
    .bindPopup(
      card,
      {
        keepInView: true,
      },
    );
}

offers.forEach((card) => {
  createMarker(card);
});

