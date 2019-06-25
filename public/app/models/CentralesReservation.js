const Database = require('../../database/DatabaseV2.js');

const database = new Database();

/**
 * @class CentralesReservation
 */
class CentralesReservation {
  /**
   * @constructor
   */
  constructor() {
    this.centrales = [];
  }

  /**
   * Returns a centrale by Id
   * @param idCentrale
   * @param {function} callback
   */
  getCentraleReservationById(idCentrale, callback) {
    const $query = 'SELECT * FROM Centrales_Reservation WHERE id_centrales_reservation = ?';
    database.executeQuery($query, [idCentrale], callback);
  }

  /**
   * Returns all the current reservation centrals associated with ERPion
   * @param {function} callback
   */
  getAllCentralesReservation(callback) {
    const $query = 'SELECT * FROM Centrales_Reservation';
    database.executeQuery($query, [], callback);
  }

  /**
   * Equivalent to an UPDATE by ID
   * @param {int} idCentrale
   * @param {string} nomCentrale
   * @param {string} websiteCentrale
   * @param {string} statusCentrale
   * @param {string} logoCentrale
   * @param {function} callback
   */
  rewrite(idCentrale, nomCentrale, websiteCentrale, statusCentrale, logoCentrale, callback) {
    database.rewrite(
      'Centrales_Reservation',
      ['nom', 'website', 'status', 'logo'],
      [nomCentrale, websiteCentrale, statusCentrale, logoCentrale],
      'id_centrales_reservation',
      idCentrale,
      callback,
    );
  }

  /**
   *  Equivalent to INSERT INTO
   * @function
   * @param {string} nomCentrale
   * @param {string} websiteCentrale
   * @param {string} statusCentrale
   * @param {string} logoCentrale
   * @param {function} callback
   */
  write(nomCentrale, websiteCentrale, statusCentrale, logoCentrale, callback) {
    database.write(
      'Centrales_Reservation',
      ['nom', 'website', 'status', 'logo'],
      [nomCentrale, websiteCentrale, statusCentrale, logoCentrale],
      callback,
    );
  }

  /**
   * Equivalent to DELETE FROM TABLE
   * @function
   * @param idCentrale
   * @param {function} callback
   */
  deleteRow(idCentrale, callback) {
    database.deleteRow(
      'Centrales_Reservation',
      'id_centrales_reservation',
      idCentrale,
      callback,
    );
  }
}

module.exports = CentralesReservation;
