import FilmotekaApi from '../api-service/filmoteka-api';
import filmsCardSliderTpl from '../../templates/slider-films.hbs';
import { Loading } from 'notiflix';
import { loadingSpiner } from './spiner';

const refs = {
  sliderContainer: document.querySelector('.slide-track'),
};
const filmotekaApi = new FilmotekaApi();

export function renderTrendy() {
  loadingSpiner();
  filmotekaApi
    .fetchTrendFilm()
    .then(renderSliderFilms)
    .catch(err => {
      refs.sliderContainer.innerHTML = `<img class="catch-error-pagination" src="${errorUrl}" loading="lazy"/>`;
    });
  Loading.remove();
}

function renderSliderFilms(articles) {
  refs.sliderContainer.innerHTML = filmsCardSliderTpl(articles);
}
