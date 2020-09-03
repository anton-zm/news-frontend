import dateFormatter from '../utils/dateFormatter';

export default class NewsCard {
  constructor(title, description, date, source, url, image) {
    this.title = title;
    this.description = description;
    this.date = date;
    this.source = source;
    this.url = url;
    this.image = image;
    this.isLogged = false;
    this.setEvent = this.setEvent.bind(this);
  }

  createCard() {
    const cardDate = dateFormatter.articleDateFormatter(new Date(this.date));
    const card = `<div class="card">
    <img src=${this.image} class="card__img" alt='${this.title}'>
        <div class="card__save-container">
            <button class="card__button">
                <img src="../images/save.svg" alt="Сохранить статью" class="card__button-img">
            </button>
        </div>
    <p class="card__date">${cardDate}</p>
    <h3 class="card__title">${this.title}</h3>
    <p class="card__subtitle">${this.description}</p>
    <a href=${this.url} class="card__link" target="_blank">${this.source}</a>
</div>`;

    return card;

    //     return `<div class="card">
    //     <img src=${this.image} class="card__img" alt='${this.title}'>
    //         <div class="card__save-container">
    //             <button class="card__button">
    //                 <img src="../images/save.svg" alt="Сохранить статью" class="card__button-img">
    //             </button>
    //         </div>
    //     <p class="card__date">${cardDate}</p>
    //     <h3 class="card__title">${this.title}</h3>
    //     <p class="card__subtitle">${this.description}</p>
    //     <a href=${this.url} class="card__link" target="_blank">${this.source}</a>
    // </div>`;
  }

  setEvent() {
    console.log('WELL!!!');
  }
  renderIcon() {}
}

// author: null
// content: ""
// description: "Московский «Спартак» обыграл волгоградский «Ротор» в матче пятого тура Российской премьер-лиги. Встреча состоялась в среду, 26 августа, на стадионе «Волгоград Арена» и завершилась победой гостей со счетом 1:0. Единственный мяч на 55-й минуте с пенальти забил …"
// publishedAt: "2020-08-26T18:09:33Z"
// source: {id: "lenta", name: "Lenta"}
// title: "«Спартак» обыграл «Ротор» в РПЛ"
// url: "https://lenta.ru/news/2020/08/26/spartak_rotor/"
// urlToImage: "https://icdn.lenta.ru/images/2020/08/26/21/20200826210906017/share_2319a0dfda44f36c0d
