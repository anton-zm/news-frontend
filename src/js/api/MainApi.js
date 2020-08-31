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
      body: JSON.stringify({ name, email, password }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.statusCode >= 400) {
          return Promise.reject(res.message);
        }
        return res;
      })
      .catch((err) => {
        console.log(err);
        return { status: 'error', message: err };
      });
  }

  signin(email, password) {
    return fetch(`${this.apiURL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.statusCode >= 400) {
          return Promise.reject(res.message);
        }
        return res;
      })
      .then((data) => {
        localStorage.setItem('token', data.token);
        return data;
      })
      .catch((err) => {
        console.log(err);
        return { status: 'error', message: err };
      });
  }

  getUserData() {
    return fetch(`${this.apiURL}/users/me`, {
      method: 'GET',
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.message);
      })
      .catch((err) => console.log(err));
  }

  getArticles() {
    return fetch(`${this.apiURL}/articles`, {
      method: 'GET',
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.message);
      })
      .catch((err) => console.log(err));
  }

  createArticle(keyword, title, text, date, source, link, image) {
    return fetch(`${this.apiURL}/articles`, {
      method: 'POST',
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
      .catch((err) => console.log(err));
  }

  removeArticle(id) {
    return fetch(`${this.apiURL}/articles/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.message);
      })
      .catch((err) => console.log(err));
  }
}
