const Database = require('../../database/DatabaseV2.js');

const database = new Database();

/**
 * @class Hebergement
 */
class Hebergement {

  /**
   * @constructor
   */
  constructor() {
    this.occupiedRooms = {};
    this.freeRooms = {};
  }

  /**
   * Returns all the occupied rooms
   * @param callback
   */
  getAllOccupiedRooms(callback) {
    const $query = `SELECT * FROM Room_Reservation RE WHERE RE.active is TRUE;`;
    database.executeQuery($query, callback);
  }

  getAllFreeRooms(callback) {
    const $query = `
    SELECT * FROM ROOM R WHERE R.id_room NOT IN (
    SELECT RE.id_room FROM Room_Reservation RE WHERE RE.active is TRUE);`;
    database.executeQuery($query, callback);
  }

  getAllOccupiedRoomsByPeriod(dateDebut, dateFin, callback) {
    const $query = `
      SELECT * FROM Room_Reservation RE, Room R WHERE RE.id_room = R.id_room
      AND (? BETWEEN RE.date_arrival AND RE.date_depart
      OR ? BETWEEN RE.date_arrival AND RE.date_depart) AND RE.active is TRUE;`;
    database.executeQuery($query, [dateDebut, dateFin], callback);
  }

  getAllOccupiedRoomsByDate(formattedDate, callback) {
    const $query = `
      SELECT * FROM Room_Reservation RE, Room R WHERE RE.id_room = R.id_room AND
      ? BETWEEN RE.date_arrival AND RE.date_depart;`;
    database.executeQuery($query, formattedDate, callback);
  }

  getAllFreeRoomsByPeriod(dateDebut, dateFin, callback) {
    const $query = `SELECT * FROM ROOM R
      WHERE R.id_room NOT IN (
      SELECT RE.id_room FROM Room_Reservation RE
      WHERE RE.active is TRUE  AND (? BETWEEN RE.date_arrival AND RE.date_depart
      OR ? BETWEEN RE.date_arrival AND RE.date_depart));`;
    database.executeQuery($query, [dateDebut, dateFin], callback);
  }

  getAllFreeRoomsByDate(formattedDate, callback) {
    const $query = `
    SELECT * FROM ROOM R
    WHERE R.id_room NOT IN (
    SELECT RE.id_room FROM Room_Reservation RE
    WHERE RE.active is TRUE AND
    ? BETWEEN RE.date_arrival AND RE.date_depart);`;
    database.executeQuery($query, formattedDate, callback);
  }

}

module.exports = Hebergement;
