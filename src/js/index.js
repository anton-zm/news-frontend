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
import Header from './components/Header';

const signinPopupInstance = new Popup(DOM.signinPopup);
const signupPopupInstance = new Popup(DOM.signupPopup);
const successPopupInstance = new Popup(DOM.successPopup);
const mainApi = new MainApi();
const signInForm = new Form(DOM.signInForm, DOM.signinButton);
const signUpForm = new Form(DOM.signUpForm, DOM.signupButton);
const header = new Header(DOM.headerMenu, DOM.mobileMenu);

const JWT_TOKEN = localStorage.getItem('token');
console.log(JWT_TOKEN);
if (JWT_TOKEN) {
  // mainApi.loggedIn = true;
  mainApi
    .getUserData()
    .then((res) => {
      header.render({ isLoggedIn: true, name: res.data.name });
    })
    .catch((err) => console.error(err));
  // mainApi
  //   .getArticles()
  //   .then((res) => {
  //     newsCardList.savedCards = res.data;
  //   })
  //   .catch((err) => console.error(err));
}

DOM.signInForm.addEventListener('submit', (event) => {
  event.preventDefault();
  mainApi.signin(DOM.signInEmailInput, DOM.signInPasswordInput);
});

DOM.signUpForm.addEventListener('submit', (event) => {
  event.preventDefault();
  mainApi.signup(DOM.signUpNameInput.value, DOM.signUpEmailInput.value, DOM.signUpPasswordInput.value).then((res) => {
    console.log(res.status);
    if (res.status === 'error') {
      signUpForm.setServerError(DOM.signUpServerError, res.message);
    }
    // else {
    //   signupPopupInstance.clearContent();
    //   signupPopupInstance.close();
    //   successPopupInstance.open();
    // }
  });
});

// меню для мобилок

function mobileMenuHandler() {
  DOM.mobileMenu.classList.toggle('mobile-menu_opened');
}
// меняет шапку хэдера

// function showMenu(signin) {
//   if (signin) {
//     DOM.headerMenu.innerHTML = signedMenu;
//   } else {
//     DOM.headerMenu.innerHTML = notSignedMenu;
//   }
// }

// DOM.signinButton.addEventListener('click', (event) => {
//   event.preventDefault();
//   showMenu(true);
//   signinPopup.close();
// });

document.addEventListener('click', (event) => {
  if (event.target.id === 'exit') {
    showMenu(false);
  }
});

// меняет "Ничего не найдено на лоадер"

DOM.techContainer.addEventListener('click', (e) => {
  e.target.innerHTML = `<i class="circle-preloader"></i>
  <p class="tech__message">Идет поиск новостей...</p>`;
  setTimeout(() => {
    e.target.innerHTML = `<img src="../images/not-found_v1.png" alt="Ничего не найдено">
        <h3 class="tech__title">Ничего не найдено</h3>
        <p class="tech__message">К сожалению по вашему запросу ничего не найдено.</p>`;
  }, 3000);
});

// открывают попап входа
DOM.authBtn.addEventListener('click', () => {
  signinPopupInstance.open();
});
DOM.authMobileBtn.addEventListener('click', () => {
  signinPopupInstance.open();
});

window.addEventListener('click', (event) => {
  if (event.target.classList.contains('popup__link_to-signin')) {
    signinPopupInstance.open();
    signupPopupInstance.close();
    successPopupInstance.close();
  }
});

// открывает попап регистрации

DOM.signupLink.addEventListener('click', () => {
  signupPopupInstance.open();
  signinPopupInstance.close();
});

// закрывают попап
window.addEventListener('click', (event) => {
  if (event.target.classList.contains('popup__cross')) {
    const popup = event.target.parentElement.parentElement;
    popup.classList.remove('popup_is-opened');
  }
});

DOM.popup.addEventListener('click', (event) => {
  event.target.classList.remove('popup_is-opened');
});

// mobile menu
DOM.menuBtn.addEventListener('click', mobileMenuHandler);
DOM.menuCross.addEventListener('click', mobileMenuHandler);

// валидация форм
// signInForm.setInputListeners(DOM.signInEmailInput);
// signInForm.setInputListeners(DOM.signInPasswordInput);

// signUpForm.setInputListeners(DOM.signUpEmailInput);
// signUpForm.setInputListeners(DOM.signUpPasswordInput);
// signUpForm.setInputListeners(DOM.signUpNameInput);

// DOM.signInEmailInput.addEventListener('input', (event) => {
//   signInForm.setInputListeners(event.target);
// });
// DOM.signInPasswordInput.addEventListener('input', (event) => {
//   signInForm.setInputListeners(event.target);
// });
// DOM.signUpEmailInput.addEventListener('input', (event) => {
//   signUpForm.setInputListeners(event.target);
// });
// DOM.signUpPasswordInput.addEventListener('input', (event) => {
//   signUpForm.setInputListeners(event.target);
// });
// DOM.signUpNameInput.addEventListener('input', (event) => {
//   signUpForm.setInputListeners(event.target);
// });

// copyrigth
insertCurrentDate();
