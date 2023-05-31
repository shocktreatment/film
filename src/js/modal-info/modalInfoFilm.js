import FilmotekaApi from '../api-service/filmoteka-api';
import { modalInfoCreat } from './modal-creat-element';
import { Notify } from 'notiflix';

const infoFilmApi = new FilmotekaApi();
let ID_FILMS = '';

const backdrop = document.querySelector('.backdrop');
const modalWrap = document.querySelector('.modal__wrap');
const modalJsCard = document.querySelector('.card__list');

let slideTrack = '';
document.querySelector('.slide-track')
  ? (slideTrack = document.querySelector('.slide-track'))
  : (slideTrack = modalWrap);

slideTrack.addEventListener('click', openModal);
modalJsCard.addEventListener('click', openModal);

const e = document.getElementsByClassName('slide-track');

const langTrailer = {
  ua: 'uk-UA',
  en: 'en-US',
};

async function modalFunction(id) {
  await infoFilmApi
    .fetchInfoFilm(id)
    .then(creatRender)
    .catch(error =>
      Notify.failure('An error occurred. Try again!', {
        position: 'center-center',
      })
    );
}

async function openModal(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  modalWrap.innerHTML = '';
  backdrop.classList.add('is-open');
  document.body.classList.add('no-scroll');

  ID_FILMS = e.target.dataset.id;
  modalFunction(ID_FILMS);
}

async function creatRender(e) {
  const trailerKey = await creatTrailerFilm(ID_FILMS);
  const res = modalInfoCreat(e, ID_FILMS, trailerKey);
  modalWrap.insertAdjacentHTML('beforeend', res);
}

async function creatTrailerFilm(id) {
  const enTrailerUa = infoFilmApi.fetchTrailreFilm(id, langTrailer.ua);
  const enTrailerEn = infoFilmApi.fetchTrailreFilm(id, langTrailer.en);
  const dataTrailerLang = await Promise.all([
    enTrailerUa.catch(e =>
      Notify.failure('Error loading trailer. Please try again', {
        position: 'center-center',
      })
    ),
    enTrailerEn.catch(e =>
      Notify.failure('Error loading trailer. Please try again', {
        position: 'center-center',
      })
    ),
  ]);
  const spaceArray = dataTrailerLang.map(e => e.results).join('').length;

  if (!spaceArray) return;

  const dataLang = [];
  dataTrailerLang.forEach(({ results }) => {
    if (results.length) dataLang.push(results);
  });

  const dataUa = dataLang.find(e => e[0].iso_639_1 === 'uk');
  return dataUa ? dataUa[0].key : dataLang[0][0].key;
}
