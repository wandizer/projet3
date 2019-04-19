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
  console.log(result);
  console.log('Inside Callback');
  if (Array.isArray(result) && result.length === 1) {
    console.log('Il y a un resultat');
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
  console.log('Submitted');
  const formData = new FormData(e.target);
  const username = formData.get('username');
  const password = formData.get('password');

  // if form is not empty
  if (username !== '' && password !== '') {
    console.log('Form not NULL');
    User.getByUsername(username, checkCredentials, password);
  }
}, false);
