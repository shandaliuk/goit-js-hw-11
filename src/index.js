import { showImages } from './scripts/show-images';
import { makeInfiniteScroll } from './scripts/infinite-scroll';
import { LoadButton } from './scripts/load-button';
import { LoadingAnimation } from './scripts/loading-animation';

const refs = {
  galleryElement: document.querySelector('.gallery'),
  formElement: document.querySelector('.form'),
  submitButton: document.querySelector('.form__button'),
  loadingStatusElement: document.querySelector('.page-load-status'),
};

let currentQuery = '';

const submitButton = new LoadButton(refs.submitButton);

const loadingAnimation = new LoadingAnimation(refs.loadingStatusElement);

const onFormSubmit = async event => {
  event.preventDefault();

  const { searchQuery } = event.currentTarget.elements;

  currentQuery = searchQuery.value;

  refs.galleryElement.innerHTML = '';

  await showImages(currentQuery, refs.galleryElement, submitButton);

  await makeInfiniteScroll(refs.galleryElement, loadingAnimation);
};

refs.formElement.addEventListener('submit', onFormSubmit);

// try catch;
