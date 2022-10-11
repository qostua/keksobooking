const StartCoordinates = {
  LAT: 35.67598,
  LNG: 139.75245,
};
const MAP_START_ZOOM_SETTING = 15;
const MAP_MAX_ZOOM_SETTING = 19;

const MAP_TILE_LAYER_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const MAP_TILE_LAYER_COPYRIGHT = '&copy;<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

const mainPinIconOptions = {
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
};
const pinIconOptions = {
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
};

const map = L.map('map-canvas');
const mainMarker = L.marker();
const layerPopupMarkers = L.layerGroup();

const mainPinIcon = L.icon(mainPinIconOptions);
const pinIcon = L.icon(pinIconOptions);

const setMainMarkerPosition = (lat, lng) => {
  mainMarker.setLatLng({
    lat: lat,
    lng: lng,
  });
};
const createMainMarker = () => {
  mainMarker.options.draggable = true;
  mainMarker.options.icon = mainPinIcon;
  mainMarker.options.zIndexOffset = 999999;

  mainMarker.addTo(map);
};
const setStartPositionMap = () => {
  map.setView({
    lat: StartCoordinates.LAT,
    lng: StartCoordinates.LNG,
  }, MAP_START_ZOOM_SETTING);

  setMainMarkerPosition(StartCoordinates.LAT, StartCoordinates.LNG);
};
const setMapTileLayer = () => {
  L.tileLayer(MAP_TILE_LAYER_URL, {
    maxZoom: MAP_MAX_ZOOM_SETTING,
    attribution: MAP_TILE_LAYER_COPYRIGHT,
  }).addTo(map);
};

const getMap = (onSucsess) => {
  map.on('load', () => {
    onSucsess();
  });

  setMapTileLayer();
  setStartPositionMap();
  createMainMarker();
};

const createPopupMarker = (popup) => {
  const lat = popup.dataset.lat;
  const lng = popup.dataset.lng;

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
    .addTo(layerPopupMarkers)
    .bindPopup(
      popup,
    );
};
const renderPopups = (popups) => {
  map.removeLayer(layerPopupMarkers);
  layerPopupMarkers.clearLayers();

  popups.forEach((popup) => {
    createPopupMarker(popup);
  });

  layerPopupMarkers.addTo(map);
};

const setMainMarkerMove = (cb) => {
  mainMarker.on('move', () => {
    const coordinates = Object.values(mainMarker.getLatLng())
      .map((item) => item.toFixed(5))
      .join(', ');
    cb(coordinates);
  });
};

export {
  getMap,
  renderPopups,
  setMainMarkerMove,
  setStartPositionMap
};
