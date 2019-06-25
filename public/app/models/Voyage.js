const Database = require('../../database/DatabaseV2.js');

const database = new Database();

/**
 * @class Voyage
 */
class Voyage {
  /**
   * @constructor
   */
  constructor() {
    this.voyages = [];
  }

  /**
   * Returns all the voyages
   * @param {function} callback
   */
  getAllVoyages(callback) {
    const $query = `SELECT * FROM Voyages V, Centrales_Reservation CR 
      WHERE V.id_agence = CR.id_centrales_reservation`;
    database.executeQuery($query, [], callback);
  }
}

module.exports = Voyage;
