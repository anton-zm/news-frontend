export default class Popup {
  constructor(popup) {
    this.popup = popup;
  }
  open() {
    this.popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.close();
      }
    });
  }
  close() {
    this.popup.classList.remove('popup_is-opened');
  }

  clearContent(form) {
    form.reset();
  }
}
