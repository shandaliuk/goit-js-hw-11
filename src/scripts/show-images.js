import { getPictures } from './get-pictures';
import { createImagesMarkup } from './create-markup';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const showImages = async (query, destinationElement, loadButton) => {
  loadButton.disable();

  let response = [];

  try {
    response = await getPictures(query);
  } catch (error) {
    Notiflix.Notify.failure(error.message);
    return;
  }

  destinationElement.insertAdjacentHTML(
    'beforeend',
    createImagesMarkup(response)
  );

  loadButton.enable();
};

export { showImages };
