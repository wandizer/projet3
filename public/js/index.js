const Database = require('./modules/Database.js');

const database = Database.getDatabase();

const interactionWithDOM = (result) => {
  console.log(result);
};

database.executeQuery('SELECT * FROM user WHERE id_user = ?', [1], interactionWithDOM);

console.log('end');

window.location.assign('pages/login.html');
