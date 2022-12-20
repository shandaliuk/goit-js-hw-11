import { getPictures } from './get-pictures';
import { createImagesMarkup } from './create-markup';

const showImages = async (query, destinationElement, loadButton) => {
  loadButton.disable();

  const response = await getPictures(query);
  destinationElement.insertAdjacentHTML(
    'beforeend',
    createImagesMarkup(response)
  );

  loadButton.show();
  loadButton.enable();
};

export { showImages };
