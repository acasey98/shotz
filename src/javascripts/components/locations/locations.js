import locationsData from '../../helpers/data/locationsData';

import './locations.scss';

import util from '../../helpers/util';

let locations = [];

const domStringBuilder = () => {
  let domString = '';
  locations.forEach((movie) => {
    domString += `<h3>${movie.name}</h3>`;
  });
  util.printToDom('locations', domString);
};

const initializeLocations = () => {
  locationsData.getLocationsData()
    .then((resp) => {
      const locationsResults = resp.data.locations;
      locations = locationsResults;
      domStringBuilder();
    })
    .catch(err => console.error(err));
};

export default { initializeLocations };
