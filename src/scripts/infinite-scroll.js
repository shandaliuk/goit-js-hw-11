import InfiniteScroll from 'infinite-scroll';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { options } from './query-options';
import { createImagesMarkup } from './create-markup';
import { addSmoothLoading } from './smooth-loading';

const makeInfiniteScroll = async (destinationElement, loadAnimation) => {
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

  loadAnimation.create();

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
      loadAnimation.hide();
      return;
    }

    lightbox.refresh();

    addSmoothLoading(destinationElement);

    loadAnimation.hide();
  };

  const onThreshold = () => {
    loadAnimation.show();
  };

  infScroll.on('scrollThreshold', onThreshold);

  infScroll.on('load', onLoad);
};

export { makeInfiniteScroll };
