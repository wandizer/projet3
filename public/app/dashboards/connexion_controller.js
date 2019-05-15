const User = require('./models/User.js');
const Employe = require('./models/Employe.js');

// ############################################################################################# //
// ####################################    FUNCTIONS    ######################################## //
// ############################################################################################# //

function showInvalidMessage(element) {
  // eslint-disable-next-line no-param-reassign
  element.className = 'validate invalid';
}

// ############################################################################################# //
// ####################################    CALLBACKS    ######################################## //
// ############################################################################################# //

/**
 * Compares the password with one from the Database. If equal, redirects to dashboard
 * @callback
 * @param result
 * @param password
 */
function checkCredentials(result, password) {
  if (Array.isArray(result) && result.length === 1) {
    if (password === result[0].password) {
			// Store 
			Employe.getById(result[0].id,storeEmploye);
			sessionStorage.setItem("user", JSON.stringify(result[0]);
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
 * Stores employe session data
 * @callback
 * @param result
 */
function storeEmploye(result) {
  if (Array.isArray(result) && result.length === 1) {
			// Store 
			/*var movies = ["Reservoir Dogs", "Pulp Fiction", "Jackie Brown", "Kill Bill", "Death Proof", "Inglourious Basterds"];
			localStorage.setItem("quentinTarantino", JSON.stringify(movies));
			var retrievedData = localStorage.getItem("quentinTarantino");
			var movies2 = JSON.parse(retrievedData);*/
			sessionStorage.setItem("employe", JSON.stringify(result[0]);
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
  console.log('authenticating...');
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
