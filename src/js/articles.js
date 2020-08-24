import '../css/articles.css';
import insertCurrentDate from './copyright';

const menuBtn = document.querySelector('#mobile-menu-icon');
const menuCross = document.querySelector('#mobile-cross');
const mobileMenu = document.querySelector('.mobile-menu');

// меню для мобилок

function mobileMenuHandler() {
  mobileMenu.classList.toggle('mobile-menu_opened');
}

// mobile menu
menuBtn.addEventListener('click', mobileMenuHandler);
menuCross.addEventListener('click', mobileMenuHandler);

// copyrigth
insertCurrentDate();
