import '../css/index.css';
import insertCurrentDate from './utils/copyright';
import dateFormatter from './utils/dateFormatter';
import preloader from './utils/preloader';

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
const newsApi = new NewsApi();
const signInForm = new Form(DOM.signInForm, DOM.signinButton);
const signUpForm = new Form(DOM.signUpForm, DOM.signupButton);
const header = new Header(DOM.headerMenu, DOM.mobileMenu);

const JWT_TOKEN = localStorage.getItem('token');
console.log(JWT_TOKEN);
if (JWT_TOKEN) {
  // mainApi.loggedIn = true;
  mainApi
    .getUserData(JWT_TOKEN)
    .then((res) => {
      header.render({ isLoggedIn: true, name: res.name });
    })
    .catch((err) => console.error(err));
  // mainApi
  //   .getArticles()
  //   .then((res) => {
  //     newsCardList.savedCards = res.data;
  //   })
  //   .catch((err) => console.error(err));
}

// меню для мобилок

function mobileMenuHandler() {
  DOM.mobileMenu.classList.toggle('mobile-menu_opened');
}

document.addEventListener('click', (event) => {
  if (event.target.id === 'exit') {
    showMenu(false);
  }
});

// меняет "Ничего не найдено на лоадер"

// DOM.techContainer.addEventListener('click', (e) => {
//   e.target.innerHTML = `<i class="circle-preloader"></i>
//   <p class="tech__message">Идет поиск новостей...</p>`;
//   setTimeout(() => {
//     e.target.innerHTML = `<img src="../images/not-found_v1.png" alt="Ничего не найдено">
//         <h3 class="tech__title">Ничего не найдено</h3>
//         <p class="tech__message">К сожалению по вашему запросу ничего не найдено.</p>`;
//   }, 3000);
// });

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

// form submits

DOM.signInForm.addEventListener('submit', (event) => {
  event.preventDefault();
  mainApi
    .signin(DOM.signInEmailInput.value, DOM.signInPasswordInput.value)
    .then((res) => {
      if (res.status === 'error') {
        signInForm.setServerError(DOM.signUpServerError, res.message);
      } else {
        signinPopupInstance.clearContent(event.target);
        signinPopupInstance.close();
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

DOM.signUpForm.addEventListener('submit', (event) => {
  event.preventDefault();
  mainApi
    .signup(DOM.signUpNameInput.value, DOM.signUpEmailInput.value, DOM.signUpPasswordInput.value)
    .then((res) => {
      if (res.status === 'error') {
        signUpForm.setServerError(DOM.signUpServerError, res.message);
      } else {
        signupPopupInstance.clearContent(event.target);
        signupPopupInstance.close();
        successPopupInstance.open();
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

DOM.searchForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const keyword = DOM.searchInput.value;
  if (!keyword) {
    DOM.searchInput.classList.add('search__input_missing');
    setTimeout(() => {
      DOM.searchInput.classList.remove('search__input_missing');
    }, 200);
    return;
  }
  preloader(DOM.techContainer, 'loading');
  const today = new Date();
  const articlesAgeFrom = dateFormatter.setArticleAge(today, 7);
  const articlesAgeTo = dateFormatter.requestDate(today);
  newsApi
    .getNews(keyword, articlesAgeFrom, articlesAgeTo)
    .then((res) => {
      console.log(res);
      preloader(DOM.techContainer, 'stop');
      if (res.status === 'nothing') {
        preloader(DOM.techContainer, 'nothing');
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

// mobile menu
DOM.menuBtn.addEventListener('click', mobileMenuHandler);
DOM.menuCross.addEventListener('click', mobileMenuHandler);

// copyrigth
insertCurrentDate();
