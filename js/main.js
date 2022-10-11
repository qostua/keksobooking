import {
  getMap,
  renderPopups,
  setMainMarkerMove,
  setStartPositionMap
} from './map.js';
import {
  activateAdForm,
  activateMapForm
} from './activation-page.js';
import {
  getData
} from './api.js';
import {
  generatePopupList
} from './generate-ad-popup.js';
import {
  setMapFormChange,
  setMapFormReset,
  resetMapForm
} from './map-form.js';
import {
  setAddressValue,
  setAdFormSubmit,
  activateSubmit,
  setResetBtnClick,
  resetAdForm
} from './ad-form.js';
import {
  showAlert,
  debounce
} from './utils.js';

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
    setMapFormReset(
      debounce(
        () => renderPopups(generatePopupList(adsData)),
      ),
    );
  });
  setMainMarkerMove((coordinates) => setAddressValue(coordinates));
});

const resetForm = () => {
  resetAdForm();
  resetMapForm();
  setStartPositionMap();
};

setAdFormSubmit(() => {
  resetForm();
  showAlert('success');
  activateSubmit();
});
setResetBtnClick(() => {
  resetForm();
});
