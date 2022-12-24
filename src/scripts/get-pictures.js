import axios from 'axios';

const getPictures = async options => {
  const params = new URLSearchParams(options);
  const response = await axios(`https://pixabay.com/api/?${params}`);
  return {
    images: response.data.hits,
    overallImagesCount: response.data.totalHits,
  };
};

export { getPictures };
