import { API_KEY } from '../constants/apiKey';

export default class NewsApi {
  constructor() {
    this.server = 'https://newsapi.org/v2/everything';
    this.apiKey = API_KEY;
    this.pageSize = 100;
  }
  getNews(keyword, date, term) {
    return fetch(`${this.server}?q=${encodeURI(keyword)}&from=${date}&to=${term}&pageSize=${this.pageSize}&apiKey=${this.apiKey}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.message);
      })
      .then((res) => {
        if (res.totalResults > 0) {
          return res;
        }
        return Promise.reject('Nothing');
      })
      .catch((err) => {
        console.log(err);
        return {
          status: 'nothing',
        };
      });
  }
}
