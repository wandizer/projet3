const Database = require('../../database/DatabaseV2.js');

const database = new Database();

/**
 * @class Client
 */
class Client {
  /**
   * @constructor
   */
  constructor() {
    this.idClient = null;
  }

  /**
   * Returns a specific client by id
   * @param idClient
   * @param {function} callback
   */
  getClientById(idClient, callback) {
    const $query = 'SELECT * FROM Client WHERE id_client = ?;';
    database.executeQuery($query, [idClient], callback);
  }

		/*
   * Get Stock food
   * @param idClient
   * @param callback
   */
  static findById(idClient, callback) {
    const sql = `SELECT * FROM Client WHERE id_client = ?;`;
    database.executeQuery(sql, idClient, callback);
  }

  /**
   * Returns a specific client by email
   * @param {string} email - unique
   * @param {function} callback
   */
  getClientByEmail(email, callback) {
    const $query = 'SELECT * FROM Client WHERE email = ?;';
    database.executeQuery($query, [email], callback);
  }

  /**
   * Checks if the client already exists or not
   * @param {string} email
   * @param {string} number
   * @param {function} callback
   */
  checkClientExists(email, number, callback) {
    const $query = 'SELECT * FROM Client WHERE email = ? AND number = ?;';
    database.executeQuery($query, [email, number], callback);
  }

  /**
   * Equivalent to INSERT INTO Client
   * @param {string} name
   * @param {string} surname
   * @param {string} email
   * @param {string} number
   * @param {function} callback
   */
  write(name, surname, email, number, callback) {
    const $query = 'INSERT INTO Client (name, surname, email, number) VALUES (?, ?, ?, ?);';
    database.executeQuery($query, [name, surname, email, number], callback);
  }
}

module.exports = Client;
