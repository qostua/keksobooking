import {setAdFormSubmit, resetForm, setAddressValue} from './form.js';
import {activateAdForm, activateMapForm} from './activation-page.js';
import {getData} from './api.js';
import {createOffersList, getMap, setMainMarkerMove} from './map.js';
import {generateOffersList} from './generate-card.js';
import {showAlert} from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  disableForm();
  activateForm();
});
