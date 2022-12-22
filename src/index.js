import { showImages } from './scripts/show-images';
import { LoadButton } from './scripts/load-button';
import { makeInfiniteScroll } from './scripts/infinite-scroll';

const refs = {
  galleryElement: document.querySelector('.gallery'),
  formElement: document.querySelector('.form'),
  submitButton: document.querySelector('.form__button'),
};

let currentQuery = '';

const submitButton = new LoadButton(refs.submitButton);

const onFormSubmit = async event => {
  event.preventDefault();

  const { searchQuery } = event.currentTarget.elements;

  currentQuery = searchQuery.value;

  refs.galleryElement.innerHTML = '';

  await showImages(currentQuery, refs.galleryElement, submitButton);

  await makeInfiniteScroll(refs.galleryElement, currentQuery);
};

refs.formElement.addEventListener('submit', onFormSubmit);

// try catch;
