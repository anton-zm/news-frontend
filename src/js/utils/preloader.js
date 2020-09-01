export default function preloader(container, result) {
  if (result === 'loading') {
    container.innerHTML = `<i class="circle-preloader"></i>
    <p class="tech__message">Идет поиск новостей...</p>`;
  } else if (result === 'nothing') {
    container.innerHTML = `<img src="../images/not-found_v1.png" alt="Ничего не найдено">
    <h3 class="tech__title">Ничего не найдено</h3>
    <p class="tech__message">К сожалению по вашему запросу ничего не найдено.</p>`;
  } else {
    container.innerHTML = ``;
  }
}
