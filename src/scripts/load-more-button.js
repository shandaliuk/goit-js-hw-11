class LoadMoreButton {
  constructor(button) {
    this.button = button;
    this.initialText = button.textContent;
  }

  remove() {
    this.button.classList.add('hidden');
  }

  show() {
    this.button.classList.remove('hidden');
  }

  disable() {
    this.button.disabled = true;
    this.button.textContent = 'Loading';
  }

  enable() {
    this.button.disabled = false;
    this.button.textContent = this.initialText;
  }
}

export { LoadMoreButton };
