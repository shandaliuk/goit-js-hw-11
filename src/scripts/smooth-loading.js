const addSmoothLoading = originElement => {
  const { height: cardHeight } =
    originElement.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
};

export { addSmoothLoading };
