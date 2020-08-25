export default function insertCurrentDate() {
  const copyrigth = document.querySelector('.footer__copyright');
  copyrigth.textContent = `© ${new Date().getFullYear()} Supersite, Powered by News API`;
}
