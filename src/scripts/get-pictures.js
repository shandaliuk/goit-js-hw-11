import axios from 'axios';
import { options } from './query-options';

const getPictures = async input => {
  options.q = input;
  const params = new URLSearchParams(options);

  const response = await axios(`https://pixabay.com/api/?${params}`);

  return response.data.hits;
};

export { getPictures };
