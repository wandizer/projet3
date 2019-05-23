const Database = require('../../../database/DatabaseV2.js');

const tableName = 'Kitchen';
const database = new Database();

/**
 * @class User
 */
class Kitchen {
  /**
   * @constructor
   * @param id
   * @param email
   * @param username
   * @param password
   * @param idEmploye
   */
  constructor(id, email, username, password, idEmploye) {
    this.id = id;
    this.email = email;
    this.username = username;
    this.password = password;
    this.id_employe = idEmploye;
  }

  /**
   * Equivalent to INSERT INTO for table User
   */
  static write() {
    database.write(tableName, ['email', 'username', 'password', 'id_employe'], [this.email, this.username, this.password, this.id_employe]);
  }

  /**
   * Equivalent to UPDATE for table User
   */
  static rewrite() {
    database.rewrite(tableName, ['email', 'username', 'password'], [this.email, this.username, this.password], 'id_user', this.id);
  }

  /**
   * Get user my 'username'
   * @param username
   * @param callback
   * @param password
   */
  static getByUsername(username, callback, password) {
    const sql = `SELECT * FROM ${tableName} WHERE username = ?;`;
    database.executeQuery(sql, username, callback, password);
  }
}

module.exports = Kitchen;
