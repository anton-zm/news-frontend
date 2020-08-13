import './style.css';

const authBtn = document.querySelector('.header__button');
const copyrigth = document.querySelector('.footer__copyright');
const techContainer = document.querySelector('.tech');


techContainer.addEventListener('click', (e) => {

    e.target.innerHTML = `<i class="circle-preloader"></i><p class="tech__message">Идет поиск новостей...</p>`
    setTimeout(() => {
        e.target.innerHTML = `<img src="../images/not-found_v1.png" alt="Ничего не найдено">
        <h3 class="tech__title">Ничего не найдено</h3>
        <p class="tech__message">К сожалению по вашему запросу ничего не найдено.</p>`
    }, 3000)
})


copyrigth.textContent = `© ${new Date().getFullYear()} Supersite, Powered by News API`