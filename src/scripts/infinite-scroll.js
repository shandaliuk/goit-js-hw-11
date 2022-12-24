import InfiniteScroll from 'infinite-scroll';
import { createImagesMarkup } from './create-markup';
import { addSmoothLoading } from './smooth-loading';
import { LoadingAnimation } from './loading-animation';
import Notiflix from 'notiflix';

const makeInfiniteScroll = ({ destinationElement, options, lightbox }) => {
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

  const loadingAnimation = new LoadingAnimation(
    document.querySelector('.page-load-status')
  );

  loadingAnimation.create();

  const onLoad = result => {
    destinationElement.insertAdjacentHTML(
      'beforeend',
      createImagesMarkup(result.hits)
    );

    lightbox.refresh();

    addSmoothLoading(destinationElement);

    loadingAnimation.hide();

    if (result.hits.length < options.per_page) {
      infScroll.destroy();
      loadingAnimation.hide();
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results.",
        { timeout: 6000 }
      );
      return;
    }
  };

  const onThreshold = () => {
    loadingAnimation.show();
  };

  infScroll.on('scrollThreshold', onThreshold);

  infScroll.on('load', onLoad);

  return infScroll;
};

export { makeInfiniteScroll };
