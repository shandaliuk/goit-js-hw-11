import axios from 'axios';
import Notiflix from 'notiflix';
import { options } from './query-options';

const getPictures = async input => {
  options.q = input;
  const params = new URLSearchParams(options);

  const response = await axios(`https://pixabay.com/api/?${params}`);

  const imagesCount = response.data.totalHits;

  if (options.page * options.per_page > imagesCount) {
    if (imagesCount === 0) {
      throw new Error(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    throw new Error(
      "We're sorry, but you've reached the end of search results."
    );
  }

  return {
    images: response.data.hits,
    imagesCount,
  };
};

export { getPictures };
