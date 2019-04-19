const User = require('./models/User.js');

// ############################################################################################# //
// ####################################    FUNCTIONS    ######################################## //
// ############################################################################################# //


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
      // redirection to dashboard
      window.location.assign('./views/generic_view.html');
    }
  }
}

// ############################################################################################# //
// #######################################    MAIN    ########################################## //
// ############################################################################################# //

// When form is submitted
document.getElementById('login').addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const username = formData.get('username');
  const password = formData.get('password');

  // if form is not empty
  if (username !== '' && password !== '') {
    User.getByUsername(username, checkCredentials, password);
  }
}, false);
