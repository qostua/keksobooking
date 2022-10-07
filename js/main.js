import {setAdFormSubmit, resetForm, setAddressValue} from './form.js';
import {activateAdForm, activateMapForm} from './activation-page.js';
import {getData} from './api.js';
import {createOffersList, getMap, setMainMarkerMove} from './map.js';
import {generateOffersList} from './generate-card.js';
import {showAlert} from './utils.js';

getMap(() => {
  activateAdForm();
  getData((offers) => {
    createOffersList(generateOffersList(offers));
    activateMapForm();
  });
  setMainMarkerMove(setAddressValue);
});

setAdFormSubmit(() => {
  resetForm();
  showAlert('success');
});
