import { showImages } from './scripts/show-images';
import { makeInfiniteScroll } from './scripts/infinite-scroll';
import { LoadButton } from './scripts/load-button';
import { LoadingAnimation } from './scripts/loading-animation';
import { options } from './scripts/query-options';

const refs = {
  galleryElement: document.querySelector('.gallery'),
  formElement: document.querySelector('.form'),
  submitButton: document.querySelector('.form__button'),
  loadingStatusElement: document.querySelector('.page-load-status'),
};

const submitButton = new LoadButton(refs.submitButton);

const loadingAnimation = new LoadingAnimation(refs.loadingStatusElement);

const onFormSubmit = async event => {
  event.preventDefault();

  const { searchQuery } = event.currentTarget.elements;

  options.q = searchQuery.value;

  refs.galleryElement.innerHTML = '';

  await showImages(refs.galleryElement, submitButton);

  await makeInfiniteScroll(refs.galleryElement, loadingAnimation);
};

refs.formElement.addEventListener('submit', onFormSubmit);

// try catch;
