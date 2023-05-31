import { currentUser, signOutUser } from './api-service/firebase-api-auth';
import { getWatchedByUserId, getQueueByUserId } from './api-service/firebase-api-database';
import filmsCardTpl from '../templates/card-films.hbs';
import { setThemeFromLocalStorage } from './theme-change';

//open/close modal window NO DELETE!!
import openModal from './modal-info/modalInfoFilm';
import closeModal from './closeModal';
import onFooterModal from './modal-info/footer-modal';

setThemeFromLocalStorage();
const currentUrl = window.location.href;

let user = null;

const refs = {
  btnWatched: document.querySelector('#btn__watched'),
  btnQueue: document.querySelector('#btn__queue'),
  containerList: document.querySelector('.js-card'),
  logOut: document.querySelector('.js-log-out'),
  nickname: document.querySelector('.js-nickname'),
};

status();

refs.btnWatched.addEventListener('click', onWatched);
refs.btnQueue.addEventListener('click', onQueue);
refs.logOut.addEventListener('click', signOutUser);

// if (currentUrl.includes('my-library')) {
//   if (!getUid()) {
//     //window.location.href = '../auth/signin.html';
//   }
// }

async function status() {
  user = await currentUser();
  if (currentUrl.includes('my-library')) {
    if (!user) {
      window.location.href = './signin.html';
    }

    setNickname(user);

    onWatched();
  }
}

function setNickname(user) {
  refs.nickname.textContent = user.email;
}

async function onWatched() {
  activeBtn(refs.btnWatched);
  inactiveBtn(refs.btnQueue);
  const watches = await getWatchedByUserId(user.uid);
  appendResultsMarkup(Object.values(watches).map(watch => watch['film']));
}

async function onQueue() {
  activeBtn(refs.btnQueue);
  inactiveBtn(refs.btnWatched);
  const queues = await getQueueByUserId(user.uid);
  appendResultsMarkup(Object.values(queues).map(queue => queue['film']));
}

function inactiveBtn(bt) {
  bt.classList.remove('btn__library--active');
}

function activeBtn(bt) {
  bt.classList.add('btn__library--active');
}

function appendResultsMarkup(results) {
  refs.containerList.innerHTML = filmsCardTpl(results);
}
