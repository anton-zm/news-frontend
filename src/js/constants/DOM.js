export default {
  authBtn: document.querySelector('#auth-btn'), // кнопка "Авторизоваться" в хэдере
  authMobileBtn: document.querySelector('#auth-mobile-btn'), // она же в мобильном меню
  techContainer: document.querySelector('.tech'), // место, где появляется прелоудер и "Ничего не найдено"
  signupButton: document.querySelector('#signup-btn'), // кнопка "Зарегистрироваться" в форме регистрации
  signinButton: document.querySelector('#signin-btn'), // кнопка "Войти" в форме входа
  searchButton: document.querySelector('#search-btn'), // кнопка "Искать"
  signinPopup: document.querySelector('#sign-in-popup'), // попап входа
  signupPopup: document.querySelector('#sign-up-popup'), // попап регистрации
  successPopup: document.querySelector('#success-popup'), // попап успешной регистрации
  signupLink: document.querySelector('#popup__signup-link'), // ссылка "Зарегистрироваться" в форме входа
  menuBtn: document.querySelector('#mobile-menu-icon'), // иконка меню для мобильных
  menuCross: document.querySelector('#mobile-cross'), // иконка крестик для мобильных меню
  mobileMenu: document.querySelector('.mobile-menu'), // меню для мобилок
  popup: document.querySelector('.popup'), // любой попап
  headerMenu: document.querySelector('.header__menu'), // меню в хэдере

  // поля ввода

  signUpEmailInput: document.querySelector('#signup-input-email'), // поле ввода EMAIL в форме регистрации
  signUpPasswordInput: document.querySelector('#signup-input-password'), // поле ввода PASSWORD в форме регистрации
  signUpNameInput: document.querySelector('#signup-input-name'), // поле ввода ИМЯ в форме регистрации

  signInEmailInput: document.querySelector('#signin-input-email'), // поле ввода EMAIL в форме входа
  signInPasswordInput: document.querySelector('#signin-input-password'), // поле ввода PASSWORD в форме входа

  searchInput: document.querySelector('#search-input'), // поле ввода ключевого слова

  // поля ошибок

  signInEmailError: document.querySelector('#signin-email-error'), // ошибка поля почты
  signInPasswordError: document.querySelector('#signin-input-password'), // ошибка поля пароля
  signInServerError: document.querySelector('#signin-server-error'), // ошибка сервера

  signUpEmailError: document.querySelector('#signup-email-error'), // ошибка поля почты
  signUpPasswordError: document.querySelector('#signup-password-error'), // ошибка поля пароля
  signUpNameError: document.querySelector('#signup-name-error'), // ошибка поля имени
  signUpServerError: document.querySelector('#signup-server-error'), // ошибка сервера

  // формы

  signUpForm: document.querySelector('#sign-up-form'), // форма регистрации
  signInForm: document.querySelector('#sign-in-form'), // форма входа
  searchForm: document.querySelector('.search'), // форма поиска статей
};
