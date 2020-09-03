import dateFormatter from '../utils/dateFormatter';
import { JWT_TOKEN } from '../constants/token';

export default class NewsCard {
  constructor(title, description, date, source, url, image, api) {
    this.title = title;
    this.description = description;
    this.date = date;
    this.source = source;
    this.url = url;
    this.image = image;
    this.api = api;
    this.markArticleIcon = this.markArticleIcon.bind(this);
    this.mouseoutEvent = this.mouseoutEvent.bind(this);
    this.card = document.createElement('div');
  }

  createCard() {
    const cardDate = dateFormatter.articleDateFormatter(new Date(this.date));
    this.card.classList.add('card');
    this.card.innerHTML = `<div class="card">
    <img src=${this.image} class="card__img" alt='${this.title}'>
        <div class="card__save-container">
            <button class="card__button">
                <img src="../images/save.svg" alt="Сохранить статью" class="card__button-img card__button-img-2">
            </button>
        </div>
    <p class="card__date">${cardDate}</p>
    <h3 class="card__title">${this.title}</h3>
    <p class="card__subtitle">${this.description}</p>
    <a href=${this.url} class="card__link" target="_blank">${this.source}</a>
</div>`;

    this.card.addEventListener('mouseover', this.mouseoverEvent);

    this.card.addEventListener('mouseout', this.mouseoutEvent);

    this.card.addEventListener('click', this.markArticleIcon);
    return this.card;
  }

  mouseoverEvent() {
    if (JWT_TOKEN) {
      if (event.target.classList.contains('card__button-img')) {
        event.target.setAttribute('src', '../images/savehover.svg');
      }
    } else {
      const iconContainer = this.card.querySelector('.card__save-container');
      this.renderIcon(iconContainer, unknown);
    }
  }

  mouseoutEvent() {
    if (JWT_TOKEN) {
      if (event.target.classList.contains('card__button-img')) {
        event.target.setAttribute('src', '../images/save.svg');
      }
    }
  }

  markArticleIcon(event) {
    if (JWT_TOKEN) {
      if (event.target.classList.contains('card__button-img')) {
        event.target.setAttribute('src', '../images/savemarked.svg');
        this.card.removeEventListener('mouseout', this.mouseoutEvent);
        this.card.removeEventListener('mouseover', this.mouseoverEvent);
      }
    }
  }

  renderIcon(container, status) {
    if (status === 'unknown') {
      container.insertAdjacentHTML('afterbegin', '<button class="card__button ">Войдите, чтобы сохранять статьи</button>');
    } else {
      container.insertAdjacentHTML('afterbegin', '');
    }
  }
}
