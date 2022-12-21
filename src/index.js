import Notiflix from 'notiflix';
import { showImages } from './scripts/show-images';
import { options } from './scripts/query-options';
import { LoadMoreButton } from './scripts/load-more-button';

const refs = {
  galleryItem: document.querySelector('.gallery'),
  formElement: document.querySelector('.form'),
  loadMoreButton: document.querySelector('.load-more'),
  submitButton: document.querySelector('.form__button'),
};

let currentQuery = '';

const loadMoreButton = new LoadMoreButton(refs.loadMoreButton);

const onFormSubmit = event => {
  event.preventDefault();

  options.page = 1;

  const { searchQuery } = event.currentTarget.elements;

  currentQuery = searchQuery.value;

  refs.galleryItem.innerHTML = '';

  loadMoreButton.remove();

  showImages(currentQuery, refs.galleryItem, loadMoreButton);
};

refs.formElement.addEventListener('submit', onFormSubmit);

const onLoadMoreClick = () => {
  options.page += 1;

  showImages(currentQuery, refs.galleryItem, loadMoreButton);
};

refs.loadMoreButton.addEventListener('click', onLoadMoreClick);

// try catch;
