import Errors from '../constants/errors';

const validator = require('validator');

export default class Form {
  constructor(form, button) {
    this.form = form;
    this.button = button;

    this._validateInputElement = this._validateInputElement.bind(this);
    this.form.addEventListener('input', this._validateInputElement);
  }

  setInputListeners(el) {
    this._validateInputElement(el);
  }

  setServerError(container, message) {
    container.textContent = message;
  }

  _validateInputElement(event) {
    const el = event.target;
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

  _clear() {
    this.form.reset();
  }

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

  disableForm(handler) {
    this.form.removeEventListener('input', this._validateInputElement);
    if (handler === 'off') {
      Array.from(this.form.elements).forEach((e) => {
        e.setAttribute('disabled', true);
      });
    } else {
      Array.from(this.form.elements).forEach((e) => {
        e.removeAttribute('disabled');
      });
    }
  }
}
