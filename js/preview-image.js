import {removePreviewPhoto} from './ad-form.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const adForm = document.querySelector('.ad-form');

const avatarChooser = adForm.querySelector('#avatar');
const avatarPreview = adForm.querySelector('.ad-form-header__preview img');

const adImageChooser = adForm.querySelector('#images');
const adFormPhotoContainer = adForm.querySelector('.ad-form__photo-container');

const isTypeMatche = (fileName) => FILE_TYPES.some((type) => fileName.endsWith(type));

avatarChooser.addEventListener('change', (evt) => {
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();

  if (!isTypeMatche(fileName)) {
    return;
  }

  const reader = new FileReader();

  reader.addEventListener('load', () => {
    avatarPreview.src = reader.result;
  });

  reader.readAsDataURL(file);
});

const createAdImagePreview = (src) => {
  const image = document.createElement('img');
  image.src = src;
  image.classList.add('ad-form__photo');

  return image;
};

adImageChooser.addEventListener('change', (evt) => {
  const files = evt.target.files;
  removePreviewPhoto();

  for (const file of files) {
    const fileName = file.name.toLowerCase();
    if (!isTypeMatche(fileName)) {
      return;
    }

    const reader = new FileReader();

    reader.addEventListener('load', () => {
      const image = createAdImagePreview(reader.result);
      adFormPhotoContainer.append(image);
    });

    reader.readAsDataURL(file);
  }
});
