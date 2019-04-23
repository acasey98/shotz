import locationsData from '../../helpers/data/locationsData';

import './locations.scss';

import util from '../../helpers/util';

let locations = [];

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

const domStringBuilder = (locationsArray) => {
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

const filterFunction = (e) => {
  const timeShot = e.target.id;
  const darkLocations = locations.filter(x => x.shootTime === 'After Dark');
  const morningLocations = locations.filter(x => x.shootTime === 'Morning');
  const afternoonLocations = locations.filter(x => x.shootTime === 'Afternoon');
  const eveningLocations = locations.filter(x => x.shootTime === 'Evening');
  switch (timeShot) {
    case 'morning':
      domStringBuilder(morningLocations);
      break;
    case 'afternoon':
      domStringBuilder(afternoonLocations);
      break;
    case 'evening':
      domStringBuilder(eveningLocations);
      break;
    case 'dark':
      domStringBuilder(darkLocations);
      break;
    default:
      domStringBuilder(locations);
  }
};


const initializeLocations = () => {
  locationsData.getLocationsData()
    .then((resp) => {
      const locationsResults = resp.data.locations;
      locations = locationsResults;
      domStringBuilder(locations);
      document.getElementById('all').addEventListener('click', filterFunction);
      document.getElementById('morning').addEventListener('click', filterFunction);
      document.getElementById('afternoon').addEventListener('click', filterFunction);
      document.getElementById('evening').addEventListener('click', filterFunction);
      document.getElementById('dark').addEventListener('click', filterFunction);
    })
    .catch(err => console.error(err));
};

export default { initializeLocations };
