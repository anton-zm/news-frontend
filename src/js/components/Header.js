export default class Header {
  constructor(desktop, mobile) {
    this.desktop = desktop;
    this.mobile = mobile;
  }

  render(props) {
    if (props.isLoggedIn) {
      this.desktop.innerHTML = `<a href="/" class="header__link header__link_active">Главная</a>
      <a href="./articles.html" class="header__link">Сохранённые статьи</a>
      <button class="header__button header__button-icon" id="exit">${props.name}</button>`;
      this.mobile.innerHTML = `<a href="/" class="mobile-menu__link">Главная</a>
      <a href="./articles.html" class="mobile-menu__link">Сохраненные статьи</a>
      <button class="mobile-menu__button header__button-icon" id="mobile-exit">${props.name}</button>`;
    } else {
      this.desktop.innerHTML = `<a href="" class="header__link header__link_active">Главная</a>
      <button class="header__button" id="auth-btn" >Авторизоваться</button>`;
      this.mobile.innerHTML = `<a href="/" class="mobile-menu__link">Главная</a>
      <button class="mobile-menu__button" id="auth-mobile-btn">Авторизоваться</button>`;
    }
  }
}
