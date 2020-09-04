import '../css/articles.css';
import insertCurrentDate from './utils/copyright';
import { JWT_TOKEN } from './constants/token';
import DOM from './constants/DOM';
import MainApi from './api/MainApi';
import Header from './components/Header';
import NewsCardList from './components/NewsCardList';
import NewsCard from './components/NewsCard';

//
const mainApi = new MainApi();
const header = new Header(DOM.headerMenu, DOM.mobileMenu);
const cardList = new NewsCardList('', DOM.resultContainer, '', '');
let username = '';

function setHeadings(name, array) {
  const keywordsArr = [];
  array.forEach((e) => {
    if (!keywordsArr.includes(e.keyword)) {
      keywordsArr.push(e.keyword);
    }
  });
  const remind = keywordsArr.length - 2;
  const keywordIntro = `${keywordsArr[0]}, ${keywordsArr[1]}`;
  DOM.headings.insertAdjacentHTML(
    'beforeend',
    `<h1 class="saved-headings__title">Сохранённые статьи</h1>
  <p class="saved-headings__amount"><span id="saved-user-name">${name}, </span> у вас ${array.length} сохранённых статей</p>
  <p class="saved-headings__keywords">По ключевым словам: <span class="saved-headings__keywords saved-headings__keywords_keyword">${keywordIntro}</span> и
  <span class="saved-headings__keywords saved-headings__keywords_keyword">${remind} другим</span></p>`
  );
}

function renderCards(array) {
  for (let i = 0; i < array.length; i++) {
    const card = new NewsCard(array[i].title, array[i].text, array[i].date, array[i].source, array[i].link, array[i].image, mainApi, array[i].keyword, array[i]._id);
    cardList.addCard(card.createCardforArticlePage());
  }
}

console.log(JWT_TOKEN); // убрать потом
if (JWT_TOKEN) {
  mainApi
    .getUserData(JWT_TOKEN)
    .then((res) => {
      header.renderForArticles(res.name);
      username = res.name;
    })
    .catch((err) => console.error(err));
  mainApi.getArticles().then((res) => {
    setHeadings(username, res.data);
    console.log(res.data);
    renderCards(res.data);
  });
} else {
  window.location.reload('./');
}

// меню для мобилок

function mobileMenuHandler() {
  DOM.mobileMenu.classList.toggle('mobile-menu_opened');
}

// mobile menu
DOM.menuBtn.addEventListener('click', mobileMenuHandler);
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('menu-close')) {
    mobileMenuHandler();
  }
});

// copyrigth
insertCurrentDate();
