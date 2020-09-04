export default class Header {
  constructor(desktop, mobile) {
    this.desktop = desktop;
    this.mobile = mobile;
    this.header = document.querySelector('.header');
  }

  render(props) {
    if (props.isLoggedIn) {
      this.desktop.innerHTML = `<a href="/" class="header__link header__link_active">Главная</a>
      <a href="./articles.html" class="header__link">Сохранённые статьи</a>
      <button class="header__button header__button-icon exit" id="exit">${props.name}</button>`;
      this.mobile.innerHTML = `<div class="mobile-menu__container">
      <div class="content">
        <div class="mobile-menu__head">
          <p class="header__logo">NewsExplorer</p>
          <img src="../images/close.png" alt="Закрыть" id="mobile-cross" class="mobile-menu__icon menu-close" >
        </div>
        <div class="mobile-menu__line"></div>
        <nav class="mobile-menu__nav">
          <a href="/" class="mobile-menu__link">Главная</a>
          <a href="./articles.html" class="mobile-menu__link">Сохраненные статьи</a>
          <button class="header__button header__button-icon exit" id="exit">${props.name}</button>
        </nav>
      </div>
    </div>`;
    } else {
      this.desktop.innerHTML = `<a href="" class="header__link header__link_active">Главная</a>
      <button class="header__button" id="auth-btn" >Авторизоваться</button>`;
      this.mobile.innerHTML = `<div class="mobile-menu__container">
      <div class="content">
        <div class="mobile-menu__head">
          <p class="header__logo">NewsExplorer</p>
          <img src="../images/close.png" alt="Закрыть" id="mobile-cross" class="mobile-menu__icon" >
        </div>
        <div class="mobile-menu__line"></div>
        <nav class="mobile-menu__nav">
          <a href="/" class="mobile-menu__link">Главная</a>
          <button class="header__button" id="auth-btn" >Авторизоваться</button>
        </nav>
      </div>
    </div>`;
    }
  }
  renderForArticles(name) {
    this.desktop.innerHTML = `<a href="./" class="header__link header__link_theme_light">Главная</a>
    <a href="./articles" class="header__link header__link_theme_light header__link_active_theme_light">Сохранённые статьи</a>
    <button class="header__button header__button_articles header__button-icon_articles" id="exit">${name}</button>`;
    this.mobile.innerHTML = `<div class="mobile-menu__container">
    <div class="content">
      <div class="mobile-menu__head">
        <p class="header__logo">NewsExplorer</p>
        <img src="../images/close.png" alt="Закрыть" id="mobile-cross" class="mobile-menu__icon menu-close" >
      </div>
      <div class="mobile-menu__line"></div>
      <nav class="mobile-menu__nav">
        <a href="/" class="mobile-menu__link">Главная</a>
        <a href="./articles.html" class="mobile-menu__link">Сохраненные статьи</a>
        <button class="header__button header__button-icon exit" id="exit">${name}</button>
      </nav>
    </div>
  </div>`;
  }
}
