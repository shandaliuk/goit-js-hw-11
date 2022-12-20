const createImagesMarkup = images => {
  return images
    .map(image => {
      return `<div class="gallery__card">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" class="gallery__image"/>
        <div class="gallery__info">
          <p class="gallery__item">
            <b>Likes: ${image.likes}</b>
          </p>
          <p class="gallery__item">
            <b>Views: ${image.views}</b>
          </p>
          <p class="gallery__item">
            <b>Comments: ${image.comments}</b>
          </p>
          <p class="gallery__item">
            <b>Downloads: ${image.downloads}</b>
          </p>
        </div>
      </div>`;
    })
    .join('');
};

export { createImagesMarkup };
