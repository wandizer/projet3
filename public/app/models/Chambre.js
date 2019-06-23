const Database = require('../../database/DatabaseV2.js');

const database = new Database();

/**
 * @class Chambre
 */
class Chambre {

  /**
   * @constructor
   */
  constructor() {
    this.idRoom = null;
    this.details = [];
    this.reservations = [];
  }

  /**
   * Returns the room details
   * @param idRoom
   * @param {function} callback
   */
  getRoomDetails(idRoom, callback) {
    const $query = `SELECT * FROM Room WHERE id_room = ?;`;
    database.executeQuery($query, [idRoom], callback);
  }

  /**
   * Returns all the reservations' information with clients
   * @param {int} idRoom
   * @param {function} callback
   */
  getReservationsByRoom(idRoom, callback) {
    this.idRoom = idRoom;
    const $query = `SELECT * FROM Room RO, Room_Reservation RE, Client Cl
                    WHERE RO.id_room = RE.id_room AND RE.id_client = Cl.id_client
                      AND RO.id_room = ?;`;
    database.executeQuery($query, [idRoom], callback);
  }

}

module.exports = Chambre;
