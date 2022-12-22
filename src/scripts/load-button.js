class LoadButton {
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
    const loaderWheel =
      '<div class="loader-wheel"><i><i><i><i><i><i><i><i><i><i><i><i></i></i></i></i></i></i></i></i></i></i></i></i></div>';
    this.button.innerHTML = loaderWheel;
  }

  enable() {
    this.button.disabled = false;
    this.button.textContent = this.initialText;
  }
}

export { LoadButton };
