const User = require('../models/User.js');
const Employe = require('../models/Employe.js');
const Role = require('../models/Role.js');
const Service = require('../models/Service.js');

// ############################################################################################# //
// ####################################    FUNCTIONS    ######################################## //
// ############################################################################################# //

/**
 * Toggles red input when content not correct or not found
 * @param element
 */
function showInvalidMessage(element) {
  // eslint-disable-next-line no-param-reassign
  element.className = 'validate invalid';
}

// ############################################################################################# //
// ####################################    CALLBACKS    ######################################## //
// ############################################################################################# //

/**
 * Stores service session data in sessionStorage
 * @callback
 * @param result
 */
function storeService(result) {
  console.log('Service : ', result);
  // Storage
  sessionStorage.setItem('service', JSON.stringify(result[0]));
  // redirection to dashboard
  if (result[0].name === 'Direction' || result[0].name === 'Admin') {
    window.location.assign('../direction/direction_view.html');
  } else if (result[0].name === 'Gestionnaires') {
    window.location.assign('../gestion/gestion_view.html');
  } else if (result[0].name === 'Restauration') {
    window.location.assign('../restauration/restauration_view.html');
  } else if (result[0].name === 'Hebergement') {
    window.location.assign('../hebergement/dashboard_hebergement.html');
  } else if (result[0].name === 'Réception') {
    window.location.assign('../reception/reception_view.html');
  } else if (result[0].name === 'Maintenance') {
    window.location.assign('../maintenance/maintenance_view.html');
  } else if (result[0].name === 'Spa') {
    window.location.assign('../spa/spa_view.html');
  } else if (result[0].name === 'Nettoyage') {
    window.location.assign('../nettoyage/nettoyage_view.html');
  }
}

/**
 * Stores role session data in sessionStorage
 * @callback
 * @param result
 */
function storeRole(result) {
  console.log('Role : ', result);
  // Storage
  sessionStorage.setItem('role', JSON.stringify(result[0]));
  // SessionStorage - Role Data
  Service.getById(result[0].id_service, storeService);
}

/**
 * Stores employe session data in sessionStorage
 * @callback
 * @param result
 */
function storeEmploye(result) {
  console.log('Employe :', result);
  // Storage
  sessionStorage.setItem('employe', JSON.stringify(result[0]));
  // SessionStorage - Role Data
  Role.getById(result[0].id_role, storeRole);
}

function storeUser(result) {
  console.log('User :', result);
  // Storage (without password and username)
  sessionStorage.setItem('user', JSON.stringify({
    id_user: result[0].id_user,
    email: result[0].email,
  }));
  // SessionStorage - Employe Data
  Employe.getById(result[0].id_employe, storeEmploye);
}

/**
 * Compares the password with one from the Database. If equal, redirects to dashboard
 * @callback
 * @param result
 * @param password
 */
function checkCredentials(result, password) {
  if (Array.isArray(result) && result.length === 1) {
    if (password === result[0].password) {
      storeUser(result);
    } else {
      // shows invalid password
      showInvalidMessage(document.body.querySelector('#password'));
    }
  } else {
    // shows invalid username
    showInvalidMessage(document.body.querySelector('#username'));
  }
}

/**
 * Retrieves the username and password entered in form and check if they are correct
 * @callback
 * @param e - Event
 */
function authenticate(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const username = formData.get('username');
  const password = formData.get('password');

  // if form is not empty
  if (username !== '' && password !== '') {
    User.getByUsername(username, checkCredentials, password);
  }
}

// ############################################################################################# //
// #################################    EVENT LISTENERS    ##################################### //
// ############################################################################################# //

/**
 * When form is submitted
 * @event submit
 */
document.body.querySelector('#login').addEventListener('submit', authenticate, false);

// ############################################################################################# //
// #######################################    MAIN    ########################################## //
// ############################################################################################# //
