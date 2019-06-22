const Database = require('../../database/DatabaseV2.js');

const database = new Database();
const dateProblem = `
SELECT * FROM Room_Reservation
WHERE strftime('%d/%m/%Y', datetime(1281353727/1000, 'unixepoch')) BETWEEN
    strftime('%d/%m/%Y', datetime(date_arrival/1000, 'unixepoch')) AND
    strftime('%d/%m/%Y', datetime(date_depart/1000, 'unixepoch'));`;

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
   * Function that checks if the date is inside a given period
   * @param dateCheck - Exemple: '20/06/2019'
   * @param dateFrom - Exemple: '20/06/2019'
   * @param dateTo - Exemple: '20/06/2019'
   * @returns {boolean} - Returns true if date inside period
   */
  checkDateBetween(dateCheck, dateFrom, dateTo) {
    const from = new Date(
      dateFrom.split('/')[2], dateFrom.split('/')[1] - 1, dateFrom.split('/')[0],
    );
    const to = new Date(
      dateTo.split('/')[2], dateTo.split('/')[1] - 1, dateTo.split('/')[0],
    );
    const check = new Date(
      dateCheck.split('/')[2], dateCheck.split('/')[1] - 1, dateCheck.split('/')[0],
    );
    return (check >= from && check <= to);
  }

  /**
   * Returns all the occupied rooms at the moment
   * @param {Function} callback
   */
  getAllOccupiedRooms(callback) {
    const $query = `
      SELECT * FROM Room_Reservation RE, Room R 
      WHERE RE.id_room = R.id_room AND RE.active is TRUE;`;
    database.executeQuery($query, [], callback);
  }

  /**
   * Returns all the free rooms at the moment
   * @param {Function} callback
   */
  getAllFreeRooms(callback) {
    const $query = `
      SELECT * FROM ROOM R WHERE R.id_room NOT IN (
      SELECT RE.id_room FROM Room_Reservation RE WHERE RE.active is TRUE);`;
    database.executeQuery($query, callback);
  }

  /**
   * Returns all the free rooms to a corresponding date
   * @param {string} formattedDate
   * @param {function} callback
   */
  getAllFreeRoomsByDate(formattedDate, callback) {
    this.getAllOccupiedRoomsByDate(formattedDate, (rooms) => {
      let blackListedIds = '';
      rooms.forEach(room => {
        blackListedIds += `${room.id_room},`;
      });
      // We remove the last ','
      if (blackListedIds != null && blackListedIds.length > 0) {
        blackListedIds = blackListedIds.substring(0, blackListedIds.length - 1);
      }
      const $query = `SELECT * FROM Room WHERE id_room NOT IN (${blackListedIds})`;
      database.executeQuery($query, [], callback);
    });
  }

  /**
   * Returns all the occupied rooms to a corresponding date
   * @param {string} formattedDate
   * @param {function} callback
   */
  getAllOccupiedRoomsByDate(formattedDate, callback) {
    const $query = `SELECT * FROM Room_Reservation RE, Room R
      WHERE RE.id_room = R.id_room AND RE.active IS TRUE;`;
    database.executeQuery($query, [], (results) => {
      const rooms = [];
      results.forEach((row) => {
        if (this.checkDateBetween(formattedDate, row.date_arrival, row.date_depart)) {
          rooms.push(row);
        }
      });
      callback(rooms);
    });
  }

  /**
   * Returns all the free rooms to a corresponding period
   * @param {string} dateDebut
   * @param {string} dateFin
   * @param {function} callback
   */
  getAllFreeRoomsByPeriod(dateDebut, dateFin, callback) {
    this.getAllOccupiedRoomsByPeriod(dateDebut, dateFin, (rooms) => {
      let blackListedIds = '';
      rooms.forEach(room => {
        blackListedIds += `${room.id_room},`;
      });
      // We remove the last ','
      if (blackListedIds != null && blackListedIds.length > 0) {
        blackListedIds = blackListedIds.substring(0, blackListedIds.length - 1);
      }
      const $query = `SELECT * FROM Room WHERE id_room NOT IN (${blackListedIds})`;
      database.executeQuery($query, [], callback);
    });
  }

  /**
   * Returns all the occupied rooms to a corresponding period
   * @param {string} dateDebut
   * @param {string} dateFin
   * @param {function} callback
   */
  getAllOccupiedRoomsByPeriod(dateDebut, dateFin, callback) {
    const $query = `SELECT * FROM Room_Reservation RE, Room R
      WHERE RE.id_room = R.id_room AND RE.active IS TRUE;`;
    database.executeQuery($query, [], (results) => {
      const rooms = [];
      results.forEach((row) => {
        if (this.checkDateBetween(dateDebut, row.date_arrival, row.date_depart)
          || this.checkDateBetween(dateFin, row.date_arrival, row.date_depart)) {
          rooms.push(row);
        }
      });
      callback(rooms);
    });
  }

  /**
   * Reserves a room by date
   * @param idRoom
   * @param idClient
   * @param date - DateArrival = DateDepart
   * @param {function} callback
   */
  reserveRoomByDate(idRoom, idClient, date, callback) {
    const $query = `INSERT INTO Room_Reservation (date_arrival, date_depart, id_room, id_client, active)
      VALUES (?, ?, ?, ?, true);`;
    database.executeQuery($query, [date, date, idRoom, idClient], callback);
  }

  /**
   * Reserves a room by period
   * @param idRoom
   * @param idClient
   * @param dateDebut
   * @param dateFin
   * @param {function} callback
   */
  reserveRoomByPeriod(idRoom, idClient, dateDebut, dateFin, callback) {
    const $query = `INSERT INTO Room_Reservation (date_arrival, date_depart, id_room, id_client, active)
      VALUES (?, ?, ?, ?, true);`;
    database.executeQuery($query, [dateDebut, dateFin, idRoom, idClient], callback);
  }
}

module.exports = Hebergement;
