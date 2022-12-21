import { getPictures } from './get-pictures';
import { createImagesMarkup } from './create-markup';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import InfiniteScroll from 'infinite-scroll';
// import { options } from './query-options';

const showImages = async (query, destinationElement, loadButton) => {
  loadButton.disable();

  let response = [];

  try {
    response = await getPictures(query);
  } catch (error) {
    Notiflix.Notify.failure(error.message);
    loadButton.remove();
    return;
  }

  destinationElement.insertAdjacentHTML(
    'beforeend',
    createImagesMarkup(response)
  );

  const lightbox = new SimpleLightbox('.gallery a');

  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });

  const scrollOptions = {
    path: '.pagination__next',
    append: 'gallery__card',
  };

  const infScroll = new InfiniteScroll(destinationElement, scrollOptions);

  loadButton.show();
  loadButton.enable();
};

export { showImages };
