const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR_URL = 'img/muffin-grey.svg';

const adForm = document.querySelector('.ad-form');
const avatarChooser = adForm.querySelector('#avatar');
const avatarPreview = adForm.querySelector('.ad-form-header__preview img');
const adImageChooser = adForm.querySelector('#images');
const adPhotoContainer = adForm.querySelector('.ad-form__photo-container');

const isTypeMatche = (fileName) => FILE_TYPES.some((type) => fileName.endsWith(type));
const createAdPhotoPreview = (src) => {
  const image = document.createElement('img');
  image.src = src;
  image.classList.add('ad-form__photo');

  return image;
};
const removePreviewAvatar = () => {
  avatarPreview.src = DEFAULT_AVATAR_URL;
};
const removePreviewPhoto = () => {
  const adPhotos = adPhotoContainer.querySelectorAll('.ad-form__photo');

  for (let index = adPhotos.length - 1; index >= 0; index--) {
    adPhotos[index].remove();
  }
};


const setAvatarChooserChange = () => {
  avatarChooser.addEventListener('change', (evt) => {
    removePreviewAvatar();
    const file = evt.target.files[0];
    if (!file) {
      return;
    }

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
};
const setAdImageChooserChange = () => {
  adImageChooser.addEventListener('change', (evt) => {
    removePreviewPhoto();
    const files = evt.target.files;

    for (const file of files) {
      const fileName = file.name.toLowerCase();
      if (!isTypeMatche(fileName)) {
        return;
      }

      const reader = new FileReader();
      reader.addEventListener('load', () => {
        const image = createAdPhotoPreview(reader.result);
        adPhotoContainer.append(image);
      });

      reader.readAsDataURL(file);
    }
  });
};

export {
  removePreviewAvatar,
  removePreviewPhoto,
  setAvatarChooserChange,
  setAdImageChooserChange
};
