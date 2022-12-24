import { showImages } from './scripts/show-images';

const refs = {
  galleryElement: document.querySelector('.gallery'),
  formElement: document.querySelector('.form'),
  inputElement: document.querySelector('.form__input'),
};

const onFormSubmit = async event => {
  event.preventDefault();

  const { searchQuery } = event.currentTarget.elements;

  const queryOptions = {
    key: '32195177-b6f496b0ec037ea4cdfde6da3',
    q: searchQuery.value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
  };

  await showImages(refs.galleryElement, queryOptions);

  const onInputFocus = () => refs.formElement.reset();

  refs.inputElement.addEventListener('focus', onInputFocus);
};

refs.formElement.addEventListener('submit', onFormSubmit);
