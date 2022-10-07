const StartCoordinate = {
  LAT: 35.67598,
  LNG: 139.75245,
};
const MAP_START_ZOOM_SETTING = 15;
const MAP_MAX_ZOOM_SETTING = 19;

const MAP_TILE_LAYER_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const MAP_TILE_LAYER_COPYRIGHT = '&copy;<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

const mainPinIconOptions = {
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
};
const pinIconOptions = {
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

