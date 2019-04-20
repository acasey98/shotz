import moviesData from '../../helpers/data/moviesData';

import './movies.scss';

import util from '../../helpers/util';

let movies = [];

const domStringBuilder = () => {
  let domString = '';
  movies.forEach((movie) => {
    domString += `<h3>${movie.name}</h3>`;
  });
  util.printToDom('movies', domString);
};

const initializeMovies = () => {
  moviesData.getMoviesData()
    .then((resp) => {
      const moviesResults = resp.data.movies;
      movies = moviesResults;
      domStringBuilder();
    })
    .catch(err => console.error(err));
};

export default { initializeMovies };
