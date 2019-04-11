const moduleUser = require('./modules/User.js');

function checkConnection(result, password) {
  if (Array.isArray(result) && result.length === 1) {
    if (password === result[0].password) window.location.assign('../views/pages/index2.html');
  }
}

document.getElementById('login').addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  const username = formData.get('username');
  const password = formData.get('password');

  if (username !== '' && password !== '') {
    moduleUser.getByUsername(username, checkConnection, password);
  }
}, false);
