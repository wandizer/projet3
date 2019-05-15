const User = require('./models/User.js');
const Employe = require('./models/Employe.js');

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
 * Stores employe session data in sessionStorage
 * @callback
 * @param result
 */
function storeEmploye(result) {
  console.log(result);
  // Storage
  sessionStorage.setItem('employe', JSON.stringify(result[0]));
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
      // SessionStorage - Employe Data
      Employe.getById(result[0].id_employe, storeEmploye);
      // SessionStorage - User Data
      sessionStorage.setItem('user', JSON.stringify(result[0]));
      // redirection to dashboard
      window.location.assign('../../dashboards/views/generic_view.html');
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
