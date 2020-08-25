import '../css/index.css';

import insertCurrentDate from './utils/copyright';
import DOM from './constants/DOM';
import Popup from './components/Popup';

const authBtn = document.querySelector('#auth-btn');
const authMobileBtn = document.querySelector('#auth-mobile-btn');
const techContainer = document.querySelector('.tech');
const signupButton = document.querySelector('#signup-btn');
const signinButton = document.querySelector('#signin-btn');
const signinForm = document.querySelector('#sign-in-popup');
const signupForm = document.querySelector('#sign-up-popup');
const success = document.querySelector('#success-popup');
const signupLink = document.querySelector('#popup__signup-link');
const menuBtn = document.querySelector('#mobile-menu-icon');
const menuCross = document.querySelector('#mobile-cross');
const mobileMenu = document.querySelector('.mobile-menu');
const popup = document.querySelector('.popup');

const signinPopup = new Popup(signinForm);
const signupPopup = new Popup(signupForm);
const successPopup = new Popup(success);

const headerMenu = document.querySelector('.header__menu');

const signedMenu = `<a href="/" class="header__link header__link_active">Главная</a>
<a href="./articles.html" class="header__link">Сохранённые статьи</a>
<button class="header__button header__button-icon" id="exit">Антон</button>`;

const notSignedMenu = `<a href="" class="header__link header__link_active">Главная</a>
<button class="header__button" id="auth-btn" >Авторизоваться</button>`;

// меню для мобилок

function mobileMenuHandler() {
  mobileMenu.classList.toggle('mobile-menu_opened');
}

// меняет шапку хэдера

function showMenu(signin) {
  if (signin) {
    headerMenu.innerHTML = signedMenu;
  } else {
    headerMenu.innerHTML = notSignedMenu;
  }
}

signinButton.addEventListener('click', (event) => {
  event.preventDefault();
  showMenu(true);
  signinPopup.close();
});

document.addEventListener('click', (event) => {
  if (event.target.id === 'exit') {
    showMenu(false);
  }
});

// меняет "Ничего не найдено на лоадер"

techContainer.addEventListener('click', (e) => {
  e.target.innerHTML = `<i class="circle-preloader"></i>
  <p class="tech__message">Идет поиск новостей...</p>`;
  setTimeout(() => {
    e.target.innerHTML = `<img src="../images/not-found_v1.png" alt="Ничего не найдено">
        <h3 class="tech__title">Ничего не найдено</h3>
        <p class="tech__message">К сожалению по вашему запросу ничего не найдено.</p>`;
  }, 3000);
});

// открывают попап входа
authBtn.addEventListener('click', () => {
  signinPopup.open();
});
authMobileBtn.addEventListener('click', () => {
  signinPopup.open();
});

window.addEventListener('click', (event) => {
  if (event.target.classList.contains('popup__link_to-signin')) {
    signinPopup.open();
    signupPopup.close();
    successPopup.close();
  }
});

// открывает попап регистрации

signupLink.addEventListener('click', () => {
  signupPopup.open();
  signinPopup.close();
});

// открывает попап успешной регистрации
signupButton.addEventListener('click', (event) => {
  event.preventDefault();
  successPopup.open();
  signupPopup.close();
});

// закрывают попап
window.addEventListener('click', (event) => {
  if (event.target.classList.contains('popup__cross')) {
    const popup = event.target.parentElement.parentElement;
    popup.classList.remove('popup_is-opened');
  }
});

popup.addEventListener('click', (event) => {
  event.target.classList.remove('popup_is-opened');
});

// mobile menu
menuBtn.addEventListener('click', mobileMenuHandler);
menuCross.addEventListener('click', mobileMenuHandler);

// copyrigth
insertCurrentDate();
