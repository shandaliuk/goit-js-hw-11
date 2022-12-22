class LoadingAnimation {
  constructor(destinationElement) {
    this.destinationElement = destinationElement;
    this.loadingEllipse = `<div class="infinite-scroll-request loader-ellips hidden">
    <span class="loader-ellips__dot"></span>
    <span class="loader-ellips__dot"></span>
    <span class="loader-ellips__dot"></span>
    <span class="loader-ellips__dot"></span>
  </div>`;
    this.isActive = false;
  }

  create() {
    this.destinationElement.innerHTML = this.loadingEllipse;
    this.isActive = true;
  }

  show() {
    if (this.isActive) {
      const ellipse = this.destinationElement.querySelector(
        '.infinite-scroll-request'
      );
      ellipse.classList.remove('hidden');
    }
  }

  hide() {
    if (this.isActive) {
      const ellipse = this.destinationElement.querySelector(
        '.infinite-scroll-request'
      );
      ellipse.classList.add('hidden');
    }
  }

  delete() {
    if (this.isActive) {
      this.destinationElement.innerHTML = '';
    }
  }
}

export { LoadingAnimation };
