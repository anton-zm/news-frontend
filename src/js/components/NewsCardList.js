export default class NewsCardList {
  constructor(section, container, techContainer, titleContainer) {
    this.section = section;
    this.container = container;
    this.techContainer = techContainer;
    this.titleContainer = titleContainer;
    // this.showMore = this.showMore.bind(this);
  }

  renderResults() {
    this.section.classList.remove('result_hidden');
  }

  renderLoader(result) {
    if (result === 'loading') {
      this.techContainer.classList.remove('tech_hidden');
      this.techContainer.innerHTML = `<i class="circle-preloader"></i>
      <p class="tech__message">Идет поиск новостей...</p>`;
    } else if (result === 'nothing') {
      this.techContainer.classList.remove('tech_hidden');
      this.techContainer.innerHTML = `<img src="../images/not-found_v1.png" alt="Ничего не найдено">
      <h3 class="tech__title">Ничего не найдено</h3>
      <p class="tech__message">К сожалению по вашему запросу ничего не найдено.</p>`;
    } else {
      this.techContainer.innerHTML = ``;
      this.techContainer.classList.add('tech_hidden');
    }
  }

  // showMore(container, func, i, arr) {
  //   document.addEventListener('click', (event) => {
  //     if (event.target.classList.contains('result__button')) {
  //       container.innerHTML = '';
  //       func(arr, i + 3);
  //     }
  //   });
  // }

  addCard(card) {
    this.container.appendChild(card);
  }
}
