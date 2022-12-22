import InfiniteScroll from 'infinite-scroll';
import { options } from './query-options';
import { createImagesMarkup } from './create-markup';

const makeInfiniteScroll = (destinationElement, input) => {
  const params = new URLSearchParams(options);

  const scrollOptions = {
    path: `https://pixabay.com/api/?${params}&page={{#}}`,
    history: false,
    responseBody: 'json',
    status: '.page-load-status',
  };

  const infScroll = new InfiniteScroll(destinationElement, scrollOptions);

  const lightbox = new SimpleLightbox('.gallery a');

  const onLoad = result => {
    lightbox.refresh();
    destinationElement.insertAdjacentHTML(
      'beforeend',
      createImagesMarkup(result.hits)
    );

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 1,
      behavior: 'smooth',
    });
  };

  infScroll.on('load', onLoad);
};

export { makeInfiniteScroll };
