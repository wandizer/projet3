const Database = require('./Database.js');

const table = 'User';

class User {
  constructor(id, email, username, password, idEmploye) {
    this.id = id;
    this.email = email;
    this.username = username;
    this.password = password;
    this.id_employe = idEmploye;
  }

  static write() {
    Database.getDatabase().write(table, ['email', 'username', 'password', 'id_employe'], [this.email, this.username, this.password, this.id_employe]);
  }

	static rewrite() {
    Database.getDatabase().rewrite(table, ['email', 'username', 'password'], [this.email, this.username, this.password],'id_user', this.id);
  }
	
  static getByUsername(username, callback, password) {
    Database.getDatabase().getByUsername(table, username, callback, password);
  }
}

module.exports = User;
