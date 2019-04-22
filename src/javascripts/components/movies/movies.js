import moviesData from '../../helpers/data/moviesData';

import './movies.scss';

import util from '../../helpers/util';

let movies = [];

const domStringBuilder = () => {
  let domString = '';
  movies.forEach((movie) => {
    domString += `<div id=${movie.id} class="card" style="width: 18rem;">`;
    domString += '<div class="card-body">';
    domString += `<h5 class="card-title">${movie.name}</h5>`;
    domString += `<p class="card-text">Releases ${movie.releaseDate}</p>`;
    domString += `<p class="card-text">${movie.genre}</p>`;
    domString += `<p class="card-text">${movie.description}</p>`;
    domString += `<p class="card-text">${movie.locations.length} Locations</p>`;
    domString += '</div>';
    domString += '</div>';
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
