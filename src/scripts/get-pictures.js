import axios from 'axios';
import Notiflix from 'notiflix';
import { options } from './query-options';

const getPictures = async () => {
  const params = new URLSearchParams(options);

  const response = await axios(`https://pixabay.com/api/?${params}`);

  const totalImagesCount = response.data.totalHits;

  if (totalImagesCount === 0) {
    throw new Error(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  Notiflix.Notify.success(`Hooray! We found ${totalImagesCount} images.`);

  return response.data.hits;
};

export { getPictures };
