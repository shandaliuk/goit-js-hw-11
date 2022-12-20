import axios from 'axios';
import Notiflix from 'notiflix';
import { showImages } from './scripts/show-images';

const refs = {
  galleryItem: document.querySelector('.gallery'),
  formElement: document.querySelector('.form'),
};

const onFormSubmit = event => {
  event.preventDefault();
  const { searchQuery } = event.currentTarget.elements;

  showImages(searchQuery.value, refs.galleryItem);
};

refs.formElement.addEventListener('submit', onFormSubmit);

// try catch
