import moviesData from '../../helpers/data/moviesData';
import locationsData from '../../helpers/data/locationsData';
import './movies.scss';
import util from '../../helpers/util';

let movies = [];

let locations = [];

let buttonSwitch = false;

const shootTimeClass = (shootTime) => {
  let selectedClass = '';
  switch (shootTime) {
    case 'Morning':
      selectedClass = 'bg-secondary';
      break;
    case 'Afternoon':
      selectedClass = 'bg-success';
      break;
    case 'Evening':
      selectedClass = 'bg-info';
      break;
    case 'After Dark':
      selectedClass = 'bg-danger';
      break;
    default:
      selectedClass = '';
  }
  return selectedClass;
};

const locationsDomStringBuilder = (locationsArray) => {
  let domString = '';
  locationsArray.forEach((location) => {
    domString += `<div id=${location.id} class="card col-3" style="width: 18rem;">`;
    domString += `<h5 class="card-header ${shootTimeClass(location.shootTime)}">${location.name}</h5>`;
    domString += '<div class="card-body">';
    domString += `<img src="${location.imageUrl}" class="card-img-top" alt="Worlds largest ball of twine"></img>`;
    domString += `<p class="card-text">${location.address}</p>`;
    domString += '</div>';
    domString += '</div>';
  });
  util.printToDom('locations', domString);
};

const reloadPage = () => window.location.reload();

const addBtn = () => document.getElementById('closebtn').addEventListener('click', reloadPage);

const domStringBuilder = (movieArray) => {
  let domString = '';
  movieArray.forEach((movie) => {
    domString += `<div id=${movie.id} class="card movie" style="width: 18rem;">`;
    domString += `<h5 class="card-header">${movie.name}</h5>`;
    domString += '<div class="card-body">';
    domString += `<p class="card-text">Releases ${movie.releaseDate}</p>`;
    domString += `<p class="card-text">${movie.genre}</p>`;
    domString += `<p class="card-text">${movie.description}</p>`;
    domString += `<p class="card-text">${movie.locations.length} Locations</p>`;
    domString += '</div>';
    if (buttonSwitch === true) {
      domString += '<btn id="closebtn"class="btn btn-danger">Close</btn>';
    }
    domString += '</div>';
  });
  util.printToDom('movies', domString);
};

const filterFunc = (movieLocations) => {
  const tempArray = [];
  movieLocations.forEach((movieLocation) => {
    locations.filter((x) => {
      const hasLocation = x.id.includes(movieLocation);
      if (x.id === movieLocation) {
        tempArray.push(x);
        // console.error(movieLocation);
      }
      return hasLocation;
    });
  });
  console.error(tempArray);
  locationsDomStringBuilder(tempArray);
  if (buttonSwitch === true) {
    addBtn();
  }
};

// const initLocations = () => {
//   locationsData.getLocationsData()
//     .then((resp) => {
//       const locationsResults = resp.data.locations;
//       locations = locationsResults;
//     })
//     .catch(err => console.error(err));
// };

const displayMovie = (currentMovie) => {
  console.error(currentMovie);
  buttonSwitch = true;
  const movie1Locations = movies[0].locations;
  const movie2Locations = movies[1].locations;
  const movie3Locations = movies[2].locations;
  const movie4Locations = movies[3].locations;
  document.getElementById('movies').innerHTML = '';
  document.getElementById('filters').innerHTML = '';
  document.getElementById('locations').innerHTML = '';
  const movieCard1 = movies.filter(x => x.id === 'movie1');
  const movieCard2 = movies.filter(x => x.id === 'movie2');
  const movieCard3 = movies.filter(x => x.id === 'movie3');
  const movieCard4 = movies.filter(x => x.id === 'movie4');
  switch (currentMovie) {
    case 'movie1':
      domStringBuilder(movieCard1);
      filterFunc(movie1Locations);
      break;
    case 'movie2':
      domStringBuilder(movieCard2);
      filterFunc(movie2Locations);
      break;
    case 'movie3':
      domStringBuilder(movieCard3);
      filterFunc(movie3Locations);
      break;
    case 'movie4':
      domStringBuilder(movieCard4);
      filterFunc(movie4Locations);
      break;
    default:
      domStringBuilder(movies);
  }
};

const addMovieCardEvents = () => {
  const movieCards = document.getElementsByClassName('movie');
  for (let i = 1; i <= movieCards.length; i += 1) {
    const currentMovieCard = `movie${i}`;
    document.getElementById(currentMovieCard).addEventListener('click', () => {
      displayMovie(currentMovieCard);
    });
  }
};

const initializeMovies = () => {
  moviesData.getMoviesData()
    .then((resp) => {
      const moviesResults = resp.data.movies;
      movies = moviesResults;
      domStringBuilder(movies);
      addMovieCardEvents();
    })
    .catch(err => console.error(err));
  locationsData.getLocationsData()
    .then((resp) => {
      const locationsResults = resp.data.locations;
      locations = locationsResults;
    })
    .catch(err => console.error(err));
};


export default { initializeMovies };
