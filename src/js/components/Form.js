import Errors from '../constants/errors';

const validator = require('validator');

export default class Form {
  constructor(form, button) {
    this.form = form;
    this.button = button;
    // this._api = api;
    // this._header = header;
    // this._popup = popup;
    // this._successPopup = successPopup;
    // this._cardList = cardList;
    // form.addEventListener('input', this._validateInputElement.bind(this));
    // form.addEventListener('submit', this._submitForm.bind(this));
    // this.setEvent = this.setEvent.bind(this);
    // this.setInputListeners = this.setInputListeners.bind(this);
    // this._validateForm = this._validateForm.bind(this);
    form.addEventListener('input', this._validateInputElement.bind(this));
  }

  setInputListeners(input) {
    input.addEventListener('input', this._validateInputElement);
  }

  setServerError(container, message) {
    container.textContent = message;
  }

  _validateInputElement(event) {
    const el = event.target;
    this._validateForm();
    if (el.value === '') {
      el.nextElementSibling.textContent = Errors.REQUIRED;
    } else if (el.name === 'email' && !validator.isEmail(el.value)) {
      el.nextElementSibling.textContent = Errors.EMAIL_ERROR;
    } else if (el.name === 'email' && validator.isEmail(el.value)) {
      el.nextElementSibling.textContent = '';
    } else if (el.name === 'password' && !el.validity.valid) {
      el.nextElementSibling.textContent = Errors.PASSWORD_ERROR;
    } else if (el.name === 'password' && el.validity.valid) {
      el.nextElementSibling.textContent = '';
    } else if (el.name === 'name' && el.value.length < 2) {
      el.nextElementSibling.textContent = Errors.NAME_ERROR;
    } else if (el.name === 'name' && el.value.length >= 2) {
      el.nextElementSibling.textContent = '';
    }
    this._validateForm();
  }

  _validateForm() {
    const inputs = Array.from(this.form.elements).every((input) => input.validity.valid);
    if (inputs) {
      this._setButtonState(true);
    } else {
      this._setButtonState(false);
    }
  }

  _clear() {}

  _getInfo() {}

  _setButtonState(state) {
    if (state) {
      this.button.classList.add('popup__button_active');
      this.button.classList.remove('popup__button_disable');
      this.button.removeAttribute('disabled');
    } else {
      this.button.classList.remove('popup__button_active');
      this.button.classList.add('popup__button_disable');
      this.button.setAttribute('disabled', 'true');
    }
  }
}
