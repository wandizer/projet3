const moduleUser = require('./modules/User.js');

function checkConnection(result, password) {
  if (Array.isArray(result) && result.length === 1) {
    if (password === result[0].password) window.location.assign('index2.html');
  }
}

document.getElementById('login').addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  const username = formData.get('username');
  const password = formData.get('password');

  if (username !== '' && password !== '') {
    const user = moduleUser.getByUsername(username, checkConnection, password);
  }
}, false);
