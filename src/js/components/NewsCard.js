import dateFormatter from '../utils/dateFormatter';
import { JWT_TOKEN } from '../constants/token';

export default class NewsCard {
  constructor(title, description, date, source, url, image, api, keyword, id) {
    this.title = title;
    this.description = description;
    this.date = date;
    this.source = source;
    this.url = url;
    this.image = image;
    this.api = api;
    this.keyword = keyword;
    this.id = id;
    this._markArticleIcon = this._markArticleIcon.bind(this);
    this._mouseoutEvent = this._mouseoutEvent.bind(this);
    this._mouseoverEvent = this._mouseoverEvent.bind(this);
    this.card = document.createElement('div');
    this.deleteCard = this.deleteCard.bind(this);
  }

  createCard() {
    const cardDate = dateFormatter.articleDateFormatter(new Date(this.date));
    this.card.classList.add('card');
    this.card.innerHTML = `<img src=${this.image} class="card__img" alt='${this.title}'>
        <div class="card__save-container">
            <button class="card__button">
                <img src="../images/save.svg" alt="Сохранить статью" class="card__button-img card__button-img-2">
            </button>
        </div>
    <p class="card__date">${cardDate}</p>
    <h3 class="card__title">${this.title}</h3>
    <p class="card__subtitle">${this.description}</p>
    <a href=${this.url} class="card__link" target="_blank">${this.source}</a>`;

    this.card.addEventListener('mouseover', this._mouseoverEvent);

    this.card.addEventListener('mouseout', this._mouseoutEvent);

    this.card.addEventListener('click', this._markArticleIcon);
    return this.card;
  }

  _mouseoverEvent() {
    if (JWT_TOKEN) {
      if (event.target.classList.contains('card__button-img')) {
        event.target.setAttribute('src', '../images/savehover.svg');
      }
    } else {
      if (event.target.classList.contains('card__button-img')) {
        const iconContainer = document.querySelector('.card__save-container');
        this.renderIcon(iconContainer, 'unknown');
      }
    }
  }

  _mouseoutEvent() {
    if (JWT_TOKEN) {
      if (event.target.classList.contains('card__button-img')) {
        event.target.setAttribute('src', '../images/save.svg');
      }
    } else {
      if (event.target.classList.contains('card__button-img')) {
        const iconContainer = document.querySelector('.card__save-container');
        this.renderIcon(iconContainer, '');
      }
    }
  }

  _markArticleIcon(event) {
    if (JWT_TOKEN) {
      if (event.target.classList.contains('card__button-img')) {
        event.target.setAttribute('src', '../images/savemarked.svg');
        this.api.createArticle(this.keyword, this.title, this.description, this.date, this.source, this.url, this.image);
        this.card.removeEventListener('mouseout', this._mouseoutEvent);
        this.card.removeEventListener('mouseover', this._mouseoverEvent);
      }
    }
  }

  renderIcon(container, status) {
    if (status === 'unknown') {
      container.insertAdjacentHTML('afterbegin', '<button class="card__button card__button_prompt">Войдите, чтобы сохранять статьи</button>');
    } else {
      const prompt = document.querySelector('.card__button_prompt');
      prompt.remove();
    }
  }
  createCardforArticlePage() {
    const cardDate = dateFormatter.articleDateFormatter(new Date(this.date));
    this.card.classList.add('card');
    this.card.innerHTML = `<button class="card__button card__button_keyword">${this.keyword}</button>
    <img src=${this.image} class="card__img" alt='${this.title}'>
        <div class="card__save-container">
            <button class="card__button">
                <img src="../images/trash.png" alt="Удалить статью" class="card__button-img card__button-trash">
            </button>
        </div>
    <p class="card__date">${cardDate}</p>
    <h3 class="card__title">${this.title}</h3>
    <p class="card__subtitle">${this.description}</p>
    <a href=${this.url} class="card__link" target="_blank">${this.source}</a>`;

    this.card.addEventListener('click', this.deleteCard);
    return this.card;
  }

  deleteCard() {
    if (event.target.classList.contains('card__button-trash')) {
      confirm('Вы действительно хотите удалить статью?');
      this.api.removeArticle(this.id);
      this.card.remove();
    }
  }
}
