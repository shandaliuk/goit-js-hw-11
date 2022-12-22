import Notiflix from 'notiflix';
import { getPictures } from './get-pictures';
import { createImagesMarkup } from './create-markup';

const showImages = async (query, destinationElement, loadButton) => {
  loadButton.disable();

  let response = [];

  try {
    response = await getPictures(query);
  } catch (error) {
    Notiflix.Notify.failure(error.message);
    loadButton.enable();
    return;
  }

  destinationElement.insertAdjacentHTML(
    'beforeend',
    createImagesMarkup(response)
  );

  loadButton.enable();
};

export { showImages };
