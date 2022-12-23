import { showImages } from './scripts/show-images';
import { LoadButton } from './scripts/load-button';

const refs = {
  galleryElement: document.querySelector('.gallery'),
  formElement: document.querySelector('.form'),
  submitButton: document.querySelector('.form__button'),
  loadingStatusElement: document.querySelector('.page-load-status'),
};

const submitButton = new LoadButton(refs.submitButton);

const onFormSubmit = async event => {
  event.preventDefault();

  const { searchQuery } = event.currentTarget.elements;

  refs.galleryElement.innerHTML = '';

  const queryOptions = {
    key: '32195177-b6f496b0ec037ea4cdfde6da3',
    q: searchQuery.value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
  };

  await showImages({
    destinationElement: refs.galleryElement,
    loadingAnimationElement: refs.loadingStatusElement,
    loadButton: submitButton,
    options: queryOptions,
  });
};

refs.formElement.addEventListener('submit', onFormSubmit);
