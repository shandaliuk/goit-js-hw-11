import { getPictures } from './get-pictures';
import { createImagesMarkup } from './create-markup';
import Notiflix from 'notiflix';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
// import { options } from './query-options';

const showImages = async (query, destinationElement, loadButton) => {
  loadButton.disable();

  let response = [];

  try {
    response = await getPictures(query);
  } catch (error) {
    Notiflix.Notify.failure(error.message);
    loadButton.remove();
    return;
  }

  destinationElement.insertAdjacentHTML(
    'beforeend',
    createImagesMarkup(response)
  );

  loadButton.show();
  loadButton.enable();
};

export { showImages };
