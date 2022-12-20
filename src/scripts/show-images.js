import { getPictures } from './get-pictures';
import { createImagesMarkup } from './create-markup';
import Notiflix from 'notiflix';

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
    createImagesMarkup(response.images)
  );

  loadButton.show();
  loadButton.enable();

  return response.imagesCount;
};

export { showImages };
