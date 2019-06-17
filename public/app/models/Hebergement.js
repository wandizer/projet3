const Database = require('../../database/DatabaseV2.js');

const database = new Database();

/**
 * @class Hebergement
 */
class Hebergement {


  constructor() {
    this.occupiedRooms = {};
    this.freeRooms = {};
  }

  getAllOccupiedRooms(callback) {
    const $query = `SELECT * FROM ROOM_RESERVATION RE, ROOM RO 
    WHERE RE.id_room = RO.id_room;`;
    database.executeQuery($query, [], callback);
  }

  getAllOccupiedRoomsByPeriod(dateDebut, dateFin, callback) {
    let $query = `SELECT * FROM ROOM_RESERVATION RE, ROOM RO
    WHERE RE.id_room = RO.id_room AND (RE.date_arrival BETWEEN 
    ? AND ?) OR (RE.date_depart BETWEEN ? AND ?);`;
    console.log($query);
    database.executeQuery($query, [dateDebut, dateFin], callback);
  }

  getAllOccupiedRoomsByDate(formattedDate, callback) {
    let $query = `SELECT * FROM ROOM_RESERVATION RE, ROOM RO
    WHERE RE.id_room = RO.id_room AND RE.date_arrival = ?;`;
    console.log($query);
    database.executeQuery($query, formattedDate, callback);
  }

}

module.exports = Hebergement;
