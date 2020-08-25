import '../css/index.css';

import insertCurrentDate from './utils/copyright';

// classes

import Popup from './components/Popup';
import NewsCardList from './components/NewsCardList';
import NewsCard from './components/NewsCard';
import MainApi from './api/MainApi';
import NewsApi from './api/NewsApi';
import DOM from './constants/DOM';
import Form from './components/Form';

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
const headerMenu = document.querySelector('.header__menu');

const signinPopup = new Popup(DOM.signinForm);
const signupPopup = new Popup(DOM.signupForm);
const successPopup = new Popup(DOM.success);

const signedMenu = `<a href="/" class="header__link header__link_active">Главная</a>
<a href="./articles.html" class="header__link">Сохранённые статьи</a>
<button class="header__button header__button-icon" id="exit">Антон</button>`;

const notSignedMenu = `<a href="" class="header__link header__link_active">Главная</a>
<button class="header__button" id="auth-btn" >Авторизоваться</button>`;

const JWT_TOKEN = localStorage.getItem('token');
if (JWT_TOKEN) {
  mainApi.loggedIn = true;
  mainApi
    .getUserData()
    .then((res) => {
      header.render({ isLoggedIn: true, userName: res.data.name });
    })
    .catch((err) => console.error(err));
  mainApi
    .getArticles()
    .then((res) => {
      newsCardList.savedCards = res.data;
    })
    .catch((err) => console.error(err));
}

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
