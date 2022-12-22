import InfiniteScroll from 'infinite-scroll';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { options } from './query-options';
import { createImagesMarkup } from './create-markup';
import Notiflix from 'notiflix';

const refs = {
  ellipse: document.querySelector('.infinite-scroll-request'),
};

const makeInfiniteScroll = async (destinationElement, input) => {
  const params = new URLSearchParams(options);

  const scrollOptions = {
    path: `https://pixabay.com/api/?${params}&page={{#}}`,
    history: false,
    responseBody: 'json',
    scrollThreshold: 100,
  };

  let infScroll = new InfiniteScroll(destinationElement, scrollOptions);

  if (infScroll.isActive) {
    infScroll.destroy();
    infScroll = new InfiniteScroll(destinationElement, scrollOptions);
  }

  infScroll.isActive = true;

  const lightbox = new SimpleLightbox('.gallery a');

  const onLoad = result => {
    destinationElement.insertAdjacentHTML(
      'beforeend',
      createImagesMarkup(result.hits)
    );

    if (result.hits.length === 0) {
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
      infScroll.destroy();
      refs.ellipse.classList.add('hidden');
      return;
    }

    lightbox.refresh();

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 1,
      behavior: 'smooth',
    });

    refs.ellipse.classList.add('hidden');
  };

  const onThreshold = () => {
    refs.ellipse.classList.remove('hidden');
  };

  infScroll.on('scrollThreshold', onThreshold);

  infScroll.on('load', onLoad);
};

export { makeInfiniteScroll };
