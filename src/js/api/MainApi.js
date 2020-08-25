export default class MainApi {
  constructor() {
    this.loggedIn = false;
    this.apiURL = 'https://api.diploma.ml';
  }
  signup(name, email, password) {
    return fetch(`${this.apiURL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ name, email, password }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.ok) {
          return Promise.reject(res.message);
        }
        return res;
      })
      .catch((err) => Promise.reject(err));
  }

  signin(email, password) {
    return fetch(`${this.apiURL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.ok) {
          return Promise.reject(res.message);
        }
        return res;
      })
      .then((data) => {
        localStorage.setItem('token', data.token);
        return data;
      })
      .catch((err) => Promise.reject(err));
  }

  getUserData() {
    return fetch(`${this.apiURL}/users/me`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.message);
      })
      .catch((err) => Promise.reject(err));
  }

  getArticles() {
    return fetch(`${this.apiURL}/articles`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.message);
      })
      .catch((err) => Promise.reject(err));
  }

  createArticle(keyword, title, text, date, source, link, image) {
    return fetch(`${this.apiURL}/articles`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ keyword, title, text, date, source, link, image }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.message);
      })
      .catch((err) => Promise.reject(err));
  }

  removeArticle(id) {
    return fetch(`${this.apiURL}/articles/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.message);
      })
      .catch((err) => Promise.reject(err));
  }
}
