import '../css/index.css';
import insertCurrentDate from './utils/copyright';
import dateFormatter from './utils/dateFormatter';
import { JWT_TOKEN } from './constants/token';

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
const searchForm = new Form(DOM.searchForm, DOM.searchButton);
const header = new Header(DOM.headerMenu, DOM.mobileMenu);
const cardList = new NewsCardList(DOM.resultSection, DOM.resultContainer, DOM.techContainer, DOM.resultContent);
const cardsArray = [];
let cardsInRow = 3;

console.log(JWT_TOKEN); // убрать потом
if (JWT_TOKEN) {
  mainApi
    .getUserData(JWT_TOKEN)
    .then((res) => {
      header.render({ isLoggedIn: true, name: res.name });
    })
    .catch((err) => console.error(err));
}

// меню для мобилок

function mobileMenuHandler() {
  DOM.mobileMenu.classList.toggle('mobile-menu_opened');
}

function checkCards(array) {
  const resultArr = [];
  array.forEach((i) => {
    if (i.title && i.description && i.publishedAt && i.source.name && i.url && i.urlToImage) {
      resultArr.push(i);
    }
  });
  return resultArr;
}

function renderCards(array, iter) {
  if (array.length < iter) {
    iter = array.length;
  }
  for (let i = 0; i < iter; i++) {
    if (array[i].title && array[i].description && array[i].publishedAt && array[i].source.name && array[i].url && array[i].urlToImage) {
      const card = new NewsCard(
        array[i].title,
        array[i].description,
        array[i].publishedAt,
        array[i].source.name,
        array[i].url,
        array[i].urlToImage,
        mainApi,
        DOM.searchInput.value,
        ''
      );
      cardList.addCard(card.createCard());
    }
  }
}

function clearResults() {
  DOM.resultContainer.innerHTML = '';
}

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
        window.location.reload();
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

  cardList.renderLoader('loading');
  searchForm.disableForm('off');
  const today = new Date();
  const articlesAgeFrom = dateFormatter.setArticleAge(today, 7);
  const articlesAgeTo = dateFormatter.requestDate(today);
  cardsArray.forEach((e) => {
    cardsArray.pop(e);
  });
  clearResults();
  newsApi
    .getNews(keyword, articlesAgeFrom, articlesAgeTo)
    .then((res) => {
      console.log(res.articles); // удалить потом
      cardList.renderLoader('stop');
      searchForm.disableForm('on');
      if (res.status === 'nothing') {
        cardList.renderLoader('nothing');
      }

      res.articles.forEach((e) => {
        cardsArray.push(e);
      });
      cardList.renderResults();
      renderCards(checkCards(cardsArray), cardsInRow);
    })
    .then()
    .catch((err) => {
      console.log(err);
    });
});

DOM.headerMenu.addEventListener('click', (event) => {
  if (event.target.classList.contains('exit') || event.target.classList.contains('mobile-exit')) {
    header.render({});
    localStorage.clear();
    window.location.reload();
  }
});

// mobile menu
DOM.menuBtn.addEventListener('click', mobileMenuHandler);
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('menu-close')) {
    mobileMenuHandler();
  }
});

// copyrigth
insertCurrentDate();

// показать еще

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('result__button')) {
    clearResults();
    cardsInRow = cardsInRow + 3;
    renderCards(checkCards(cardsArray), cardsInRow);
    hideMoreBtn(event.target, checkCards(cardsArray));
  }
});

function hideMoreBtn(btn, resArr) {
  const renderedCards = document.querySelectorAll('.card');
  if (renderedCards.length == resArr.length) {
    btn.classList.add('result__button_hidden');
  }
}
