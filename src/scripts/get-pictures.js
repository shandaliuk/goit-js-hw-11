import axios from 'axios';

const getPictures = async input => {
  const options = {
    key: '32195177-b6f496b0ec037ea4cdfde6da3',
    q: input,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: 1,
  };

  const params = new URLSearchParams(options);

  const response = await axios(`https://pixabay.com/api/?${params}`);

  return response.data.hits;
};

export { getPictures };
