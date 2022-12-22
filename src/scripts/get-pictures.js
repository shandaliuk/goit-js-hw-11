import axios from 'axios';
import Notiflix from 'notiflix';
import { options } from './query-options';

const getPictures = async input => {
  options.q = input;

  const params = new URLSearchParams(options);

  const response = await axios(`https://pixabay.com/api/?${params}`);

  const totalImagesCount = response.data.totalHits;

  // const currentImagesCount = response.data.hits.length;

  if (totalImagesCount === 0) {
    throw new Error(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  // if (currentImagesCount === 0) {
  //   throw new Error(
  //     "We're sorry, but you've reached the end of search results."
  //   );
  // }

  Notiflix.Notify.success(`Hooray! We found ${totalImagesCount} images.`);

  return response.data.hits;
};

export { getPictures };
