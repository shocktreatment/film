const API_KEY = '431ab85139813dba3796c445694ce723';
const BASE_URL = 'https://api.themoviedb.org/3';

export default class FilmotekaApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  globalFetch(url) {
    return fetch(url)
      .then(response => response.json())
      .then(date => {
        this.incrementPage();
        return date.results;
      });
  }
  fetchGenres() {
    const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        return data.genres;
      });
  }

  fetchInTrendFilmWithGenres() {
    return this.fetchTrendFilm().then(data => {
      return this.fetchGenres().then(genresList => {
        return data.map(movie => ({
          ...movie,
          release_date: movie.release_date.split('-')[0],
          genres: movie.genre_ids
            .map(id => genresList.filter(el => el.id === id))
            .flat(),
        }));
      });
    });
  }

  fetchSearchFilmWithGenres() {
    return this.fetchSearchFilm().then(data => {
      return this.fetchGenres().then(genresList => {
        return data.map(movie => ({
          ...movie,
          release_date: movie.release_date.split('-')[0],
          genres: movie.genre_ids
            .map(id => genresList.filter(el => el.id === id))
            .flat(),
        }));
      });
    });
  }

  fetchTrendFilm() {
    const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${this.page}`;
    return this.globalFetch(url);
  }

  fetchSearchFilm() {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${this.searchQuery}&page=${this.page}&include_adult=false`;
    return this.globalFetch(url);
  }
  fetchSearchTotalFilm() {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${this.searchQuery}&page=${this.page}&include_adult=false`;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        this.incrementPage();
        return data;
      });
  }

  // fetchInfoFilm() {
  //   const movie_id = 1031653;
  //   const url = ` https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}&language=en-US`;
  //   return this.globalFetch(url);
  // }

  fetchInfoFilm(movie_id) {
    const url = ` https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}&language=en-US`;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        return data;
        // console.log(data);
      });
  }

  fetchTrailreFilm(movie_id, lang) {
    const url = ` https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${API_KEY}&language=${lang}`;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        return data;
        // console.log(data);
      });
  }

  incrementPage() {
    this.page += 1;
  }

  decrementPage() {
    this.page -= 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
  get pageNum() {
    return this.page;
  }
  set pageNum(newPage) {
    this.page = newPage;
  }
}
