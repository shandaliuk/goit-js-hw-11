import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import { getPictures } from './get-pictures';
import { createImagesMarkup } from './create-markup';
import { LoadingAnimation } from './loading-animation';
import { makeInfiniteScroll } from './infinite-scroll';

const showImages = async ({
  destinationElement,
  loadingAnimationElement,
  loadButton,
  options,
}) => {
  loadButton.disable();

  try {
    const response = await getPictures(options);
    const { images, overallImagesCount } = response;
    const totalImagesCount = images.length;

    if (overallImagesCount === 0) {
      throw new Error(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    Notiflix.Notify.success(`Hooray! We found ${overallImagesCount} images.`);

    destinationElement.insertAdjacentHTML(
      'beforeend',
      createImagesMarkup(images)
    );

    const simpleLightbox = new SimpleLightbox('.gallery a');

    loadButton.enable();

    if (totalImagesCount < options.per_page) {
      throw new Error(
        "We're sorry, but you've reached the end of search results."
      );
    }

    const loadingAnimation = new LoadingAnimation(loadingAnimationElement);

    await makeInfiniteScroll({
      destinationElement,
      loadAnimation: loadingAnimation,
      options,
      lightbox: simpleLightbox,
    });
  } catch (error) {
    Notiflix.Notify.failure(error.message);
    loadButton.enable();
    return;
  }
};

export { showImages };
