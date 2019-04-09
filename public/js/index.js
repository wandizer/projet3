const Database = require('./modules/Database.js');

const database = new Database('localhost', 'root', '', 'hotel');

const interactionWithDOM = (result) => {
  console.log(result);
};
database.executeQuery('SELECT * FROM client WHERE id=1', interactionWithDOM);

console.log('end');
