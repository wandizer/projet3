const Database = require('../../database/DatabaseV2.js');

const database = new Database();

/**
 * @class Chambre
 */
class Chambre {

  constructor() {
    this.idRoom = null;
    this.reservations = [];
  }

  getRoomDetails(idRoom) {

  }

  getReservationsByRoom(idRoom, callback) {
    const $query = `SELECT * FROM Room_Reservation RE, Client C
      WHERE RE.id_client = C.id_client AND RE.id_room = ?`;
    database.executeQuery($query, [idRoom], callback);
  }

}

module.exports = Chambre;
