import './style.css';

import Popup from './js/Popup';

const authBtn = document.querySelector('#auth-btn');
const copyrigth = document.querySelector('.footer__copyright');
const techContainer = document.querySelector('.tech');
const signupButton = document.querySelector('#signup-btn');
const signinButton = document.querySelector('#signin-btn');
const signinForm = document.querySelector('#sign-in-popup');
const signupForm = document.querySelector('#sign-up-popup');
const success = document.querySelector('#success-popup');
const signupLink = document.querySelector('#popup__signup-link');

const signinPopup = new Popup(signinForm);
const signupPopup = new Popup(signupForm);
const successPopup = new Popup(success);

const headerMenu = document.querySelector('.header__menu');

const signedMenu = `<a href="/" class="header__link header__link_active">Главная</a>
<a href="/articles" class="header__link">Сохранённые статьи</a>
<button class="header__button header__button-icon" id="exit">Антон</button>`;

const notSignedMenu = `<a href="" class="header__link header__link_active">Главная</a>
<button class="header__button" id="auth-btn" >Авторизоваться</button>`;

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

// закрывает попап
window.addEventListener('click', (event) => {
  if (event.target.classList.contains('popup__cross')) {
    const popup = event.target.parentElement.parentElement;
    popup.classList.remove('popup_is-opened');
  }
});

// copyrigth
copyrigth.textContent = `© ${new Date().getFullYear()} Supersite, Powered by News API`;
