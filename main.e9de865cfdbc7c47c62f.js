!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=4)}([function(e,t,n){"use strict";function o(){document.querySelector(".footer__copyright").textContent="© ".concat((new Date).getFullYear()," Supersite, Powered by News API")}n.d(t,"a",(function(){return o}))},function(e,t,n){},,,function(e,t,n){"use strict";n.r(t);n(1);var o=n(0);function r(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var c=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.pop=t}var t,n,o;return t=e,(n=[{key:"open",value:function(){this.pop.classList.add("popup_is-opened")}},{key:"close",value:function(){this.pop.classList.remove("popup_is-opened")}}])&&r(t.prototype,n),o&&r(t,o),e}(),i=document.querySelector("#auth-btn"),u=document.querySelector("#auth-mobile-btn"),a=document.querySelector(".tech"),l=document.querySelector("#signup-btn"),s=document.querySelector("#signin-btn"),d=document.querySelector("#sign-in-popup"),p=document.querySelector("#sign-up-popup"),f=document.querySelector("#success-popup"),_=document.querySelector("#popup__signup-link"),m=document.querySelector("#mobile-menu-icon"),b=document.querySelector("#mobile-cross"),v=document.querySelector(".mobile-menu"),y=new c(d),g=new c(p),h=new c(f),k=document.querySelector(".header__menu");function L(){v.classList.toggle("mobile-menu_opened")}function S(e){k.innerHTML=e?'<a href="/" class="header__link header__link_active">Главная</a>\n<a href="/articles" class="header__link">Сохранённые статьи</a>\n<button class="header__button header__button-icon" id="exit">Антон</button>':'<a href="" class="header__link header__link_active">Главная</a>\n<button class="header__button" id="auth-btn" >Авторизоваться</button>'}s.addEventListener("click",(function(e){e.preventDefault(),S(!0),y.close()})),document.addEventListener("click",(function(e){"exit"===e.target.id&&S(!1)})),a.addEventListener("click",(function(e){e.target.innerHTML='<i class="circle-preloader"></i>\n  <p class="tech__message">Идет поиск новостей...</p>',setTimeout((function(){e.target.innerHTML='<img src="../images/not-found_v1.png" alt="Ничего не найдено">\n        <h3 class="tech__title">Ничего не найдено</h3>\n        <p class="tech__message">К сожалению по вашему запросу ничего не найдено.</p>'}),3e3)})),i.addEventListener("click",(function(){y.open()})),u.addEventListener("click",(function(){y.open()})),window.addEventListener("click",(function(e){e.target.classList.contains("popup__link_to-signin")&&(y.open(),g.close(),h.close())})),_.addEventListener("click",(function(){g.open(),y.close()})),l.addEventListener("click",(function(e){e.preventDefault(),h.open(),g.close()})),window.addEventListener("click",(function(e){e.target.classList.contains("popup__cross")&&e.target.parentElement.parentElement.classList.remove("popup_is-opened")})),m.addEventListener("click",L),b.addEventListener("click",L),Object(o.a)()}]);