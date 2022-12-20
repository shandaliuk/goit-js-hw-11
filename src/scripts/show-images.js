import { getPictures } from './get-pictures';
import { createImagesMarkup } from './create-markup';

const showImages = async (query, destinationElement) => {
  const response = await getPictures(query);
  destinationElement.innerHTML = createImagesMarkup(response);
};

export { showImages };
