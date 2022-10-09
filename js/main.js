import {
  setAdFormSubmit,
  resetForm,
  setAddressValue
} from './ad-form.js';
import {
  setMapFormChange
} from './map-form.js';
import {
  activateAdForm,
  activateMapForm
}from './activation-page.js';
import {
  getData
} from './api.js';
import {
  renderPopups,
  getMap,
  setMainMarkerMove
} from './map.js';
import {
  generatePopupList
} from './generate-popup-list.js';
import {
  showAlert,
  debounce
} from './utils.js';
import './preview-image.js';

const RENDER_DELAY = 500;

getMap(() => {
  activateAdForm();
  getData((adsData) => {
    renderPopups(generatePopupList(adsData));
    activateMapForm();
    setMapFormChange(
      debounce(
        () => renderPopups(generatePopupList(adsData)),
      ),
      RENDER_DELAY,
    );
  });
  setMainMarkerMove(setAddressValue);
});

setAdFormSubmit(() => {
  resetForm();
  showAlert('success');
});
