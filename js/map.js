const StartCoordinate = {
  LAT: 35.67598,
  LNG: 139.75245,
};
const MAP_START_ZOOM_SETTING = 15;
const MAP_MAX_ZOOM_SETTING = 19;

const MAP_TILE_LAYER_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const MAP_TILE_LAYER_COPYRIGHT = '&copy;<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

const mainPinIconOptions = {
  iconUrl: './../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
};
const pinIconOptions = {
  iconUrl: './../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
};

const map = L.map('map-canvas');

const setStartMapPosition = () => {
  map.setView({
    lat: StartCoordinate.LAT,
    lng: StartCoordinate.LNG,
  }, MAP_START_ZOOM_SETTING);
};

L.tileLayer(MAP_TILE_LAYER_URL, {
  maxZoom: MAP_MAX_ZOOM_SETTING,
  attribution: MAP_TILE_LAYER_COPYRIGHT,
}).addTo(map);

const getMap = (onSucsess) => {
  map.on('load', () => {
    onSucsess();
  });
  setStartMapPosition();
};

const mainPinIcon = L.icon(mainPinIconOptions);
const pinIcon = L.icon(pinIconOptions);

const mainMarker = L.marker(
  {
    lat: StartCoordinate.LAT,
    lng: StartCoordinate.LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
    zIndexOffset: 999999,
  },
);
const setStartMainMarkerPosition = () => {
  mainMarker.setLatLng({
    lat: StartCoordinate.LAT,
    lng: StartCoordinate.LNG,
  });
};
mainMarker.addTo(map);

const setMainMarkerMove = (cb) => {
  mainMarker.on('move', () => {
    const coordinates = Object.values(mainMarker.getLatLng())
      .map((item) => item.toFixed(5))
      .join(', ');
    cb(coordinates);
  });
};

const popupMarkers = L.layerGroup();

const createMarker = (popup) => {
  const lat = popup.dataLat;
  const lng = popup.dataLng;

  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon: pinIcon,
    },
  );

  marker
    .addTo(popupMarkers)
    .bindPopup(
      popup,
    );
};

const renderPopups = (popups) => {
  map.removeLayer(popupMarkers);
  popupMarkers.clearLayers();

  popups.forEach((popup) => {
    createMarker(popup);
  });

  popupMarkers.addTo(map);
};

export {
  getMap,
  setMainMarkerMove,
  setStartMapPosition,
  setStartMainMarkerPosition,
  renderPopups
};
