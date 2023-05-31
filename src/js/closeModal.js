import { currentUser } from './api-service/firebase-api-auth';
import {
  writeQueue,
  writeWatched,
  getQueueByUserId,
  getWatchedByUserId,
} from './api-service/firebase-api-database';
import FilmotekaApi from './api-service/filmoteka-api';
import { Notify } from 'notiflix';

const infoFilmApi = new FilmotekaApi();
const refs = {
  backdrop: document.querySelector('.backdrop'),
  closeBtn: document.querySelector('[data-modal-close]'),
  modalWrap: document.querySelector('.modal__wrap'),
};

refs.backdrop.addEventListener('click', onBackdropHandler);
refs.closeBtn.addEventListener('click', closeModal);
window.addEventListener('keydown', closeModalEsc);
// TODO: add listener on ESC when modal is opening

function closeModal() {
  refs.backdrop.classList.remove('is-open');
  window.removeEventListener('keydown', closeModal);
  document.body.classList.remove('no-scroll');
  refs.modalWrap.innerHTML = '';
}

async function onBackdropHandler(e) {
  const filmId = e.target.dataset.id;
  if (e.target.classList.contains('backdrop')) {
    closeModal();
  } else if (e.target.classList.contains('js-btn-watched')) {
    if (await checkFilmFromUser(filmId, getWatchedByUserId)) {
      Notify.info('The film is already at the top of the watched');
      return;
    }
    write(filmId, writeWatched);
  } else if (e.target.classList.contains('js-btn-queue')) {
    if (await checkFilmFromUser(filmId, getQueueByUserId)) {
      Notify.info('The film is already at the top of the queue');
      return;
    }
    write(filmId, writeQueue);
  }
  return;
}

function closeModalEsc(e) {
  if (e.code === 'Escape') closeModal();
}

async function checkFilmFromUser(filmId, callback) {
  const user = await currentUser();
  if (user) {
    const object = await callback(user.uid);
    let films;
    if (object) {
      films = Object.values(object).map(object => object['film']);
    } else {
      return false;
    }

    let filmsUser;
    if (films.length > 0) {
      filmsUser = films.filter(
        film => Number.parseInt(film.id) === Number.parseInt(filmId)
      );
    } else {
      return false;
    }

    if (filmsUser.length > 0) {
      return true;
    } else {
      return false;
    }
  } else {
    window.location.href = './signin.html';
  }
}

async function write(filmId, callback) {
  const user = await currentUser();
  if (user) {
    const film = await infoFilmApi.fetchInfoFilm(filmId);
    callback(user.uid, film);
  } else {
    window.location.href = './signin.html';
  }
}
