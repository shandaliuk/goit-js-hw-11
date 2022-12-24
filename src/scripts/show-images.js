import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getPictures } from './get-pictures';
import { createImagesMarkup } from './create-markup';
import { makeInfiniteScroll } from './infinite-scroll';
import { LoadButton } from './load-button';
import InfiniteScroll from 'infinite-scroll';

const showImages = async (destinationElement, options) => {
  const submitButton = new LoadButton(document.querySelector('.form__button'));

  submitButton.disable();

  try {
    const response = await getPictures(options);
    const { images, overallImagesCount } = response;

    if (overallImagesCount === 0) {
      throw new Error(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    Notiflix.Notify.success(`Hooray! We found ${overallImagesCount} images.`);

    destinationElement.innerHTML = createImagesMarkup(images);

    scroll(0, 0);

    const simpleLightbox = new SimpleLightbox('.gallery a');

    submitButton.enable();

    const infiniteScroll = makeInfiniteScroll({
      destinationElement,
      options,
      lightbox: simpleLightbox,
    });

    if (images.length < options.per_page) {
      infiniteScroll.destroy();

      throw new Error(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (error) {
    Notiflix.Notify.failure(error.message, {
      timeout: 5000,
    });
    submitButton.enable();
    return;
  }
};

export { showImages };
