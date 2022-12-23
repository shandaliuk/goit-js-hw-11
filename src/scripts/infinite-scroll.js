import InfiniteScroll from 'infinite-scroll';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { createImagesMarkup } from './create-markup';
import { addSmoothLoading } from './smooth-loading';

const makeInfiniteScroll = async ({
  destinationElement,
  loadAnimation,
  options,
  lightbox,
}) => {
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

  loadAnimation.create();

  const onLoad = result => {
    destinationElement.insertAdjacentHTML(
      'beforeend',
      createImagesMarkup(result.hits)
    );

    lightbox.refresh();

    addSmoothLoading(destinationElement);

    loadAnimation.hide();

    if (result.hits.length < options.per_page) {
      infScroll.destroy();
      loadAnimation.hide();
      throw new Error(
        "We're sorry, but you've reached the end of search results."
      );
    }
  };

  const onThreshold = () => {
    loadAnimation.show();
  };

  infScroll.on('scrollThreshold', onThreshold);

  infScroll.on('load', onLoad);
};

export { makeInfiniteScroll };
