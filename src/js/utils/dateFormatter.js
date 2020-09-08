import RUS_MONTH from '../constants/rusMonth';

function articleDateFormatter(dateRes) {
  const year = dateRes.getFullYear();
  const month = dateRes.getMonth();
  const day = dateRes.getDate();
  return `${day} ${RUS_MONTH[month]}, ${year}`;
}

function requestDate(age) {
  const day = age.getDate().toString().padStart(2, '0');
  const month = (1 + age.getMonth()).toString().padStart(2, '0');
  const year = age.getFullYear();
  return `${year}-${month}-${day}`;
}

function setArticleAge(date, days) {
  const Msec = 1000 * 60 * 60 * 24 * days;
  const articleAge = new Date(Date.parse(date) - Msec);
  return requestDate(articleAge);
}

export default { articleDateFormatter, requestDate, setArticleAge };
