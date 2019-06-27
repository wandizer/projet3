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
   * Function that returns a list of formatted dates according to the date given and the distance
   * @param date
   * @param distanceInDays
   * @returns {string}
   */
  getFormattedPeriod(date, distanceInDays) {
    let lastSevenDays = '';
    for (let i = 0; i < distanceInDays; i += 1) {
      const currentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      currentDate.setDate(currentDate.getDate() - distanceInDays + 1);
      currentDate.setDate(currentDate.getDate() + i);
      lastSevenDays += `'${currentDate.toLocaleDateString('fr-FR')}',`;
    }
    // We remove the last ','
    if (lastSevenDays.length > 0) {
      lastSevenDays = lastSevenDays.substring(0, lastSevenDays.length - 1);
    }
    return lastSevenDays;
  }

  /**
   * Returns the last seven reservations
   * @function
   * @param callback
   */
  getLastSevenDaysReservations(callback) {
    const lastSevenDays = this.getFormattedPeriod(new Date(), 7);
    // We execute the query
    const $query = `SELECT date_reservation AS 'label', count(date_reservation) AS 'data' FROM Room_Reservation
      WHERE date_reservation IN (${lastSevenDays}) GROUP BY date_reservation`;
    database.executeQuery($query, [], callback);
  }

  /**
   * Returns all the occupied rooms at the moment
   * @param {function} callback
   */
  getAllOccupiedRooms(callback) {
    const $query = `
      SELECT * FROM Room_Reservation RE, Room R 
      WHERE RE.id_room = R.id_room AND RE.active is TRUE;`;
    database.executeQuery($query, [], callback);
  }

  /**
   * Returns all the free rooms at the moment
   * @param {function} callback
   */
  getAllFreeRooms(callback) {
    this.getAllOccupiedRooms((rooms) => {
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
   * Returns the list of all rooms of the hotel
   * @param {function} callback
   */
  getRoomsList(callback) {
    const $query = `SELECT * FROM Room ORDER BY type`;
    database.executeQuery($query,[], callback);
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
   * @param payment_amount
   * @param {function} callback
   */
  reserveRoomByDate(idRoom, idClient, date, payment_amount, callback) {
    // const $query = `INSERT INTO Room_Reservation (date_arrival, date_depart, id_room, id_client, active)
    //   VALUES (?, ?, ?, ?, true);`;
    // database.executeQuery($query, [date, date, idRoom, idClient], callback);
    database.write(
      'Room_Reservation',
      ['date_arrival', 'date_depart', 'date_reservation', 'payment_amount', 'id_room', 'id_client', 'active'],
      [date, date, date, payment_amount, idRoom, idClient, true],
      callback,
    );
  }

  /**
   * Reserves a room by period
   * @param idRoom
   * @param idClient
   * @param dateDebut
   * @param dateFin
   * @param payment_amount
   * @param {function} callback
   */
  reserveRoomByPeriod(idRoom, idClient, dateDebut, dateFin, payment_amount, callback) {
    // const $query = `INSERT INTO Room_Reservation (date_arrival, date_depart, id_room, id_client, active)
    //   VALUES (?, ?, ?, ?, true);`;
    database.write(
      'Room_Reservation',
      ['date_arrival', 'date_depart', 'date_reservation', 'price', 'id_room', 'id_client', 'active'],
      [dateDebut, dateFin, dateDebut, payment_amount, idRoom, idClient, true],
      callback,
    );
    // database.executeQuery($query, [dateDebut, dateFin, idRoom, idClient], callback);
  }

  /**
   * Returns the amount of 'type' rooms in the hotel
   * @function
   * @param {string} type - 'simple' || 'double' || 'suite'
   * @param {function} callback
   */
  getCountTotalRoomsByType(type, callback) {
    const $query = `SELECT COUNT(id_room) AS 'nbRooms'
      FROM Room WHERE type = ?`;
    database.executeQuery($query, [type], callback);
  }

  /**
   * Returns the amount of occupied rooms (active = true)
   * @function
   * @param callback
   */
  getCountOccupiedRooms(callback) {
    const $query = `SELECT COUNT(id_room_reservation) AS 'nbOccupiedRooms' 
      FROM Room_Reservation RR WHERE RR.active IS TRUE;`;
    database.executeQuery($query, [], callback);
  }

  /**
   * Returns the amount of simple occupied rooms
   * @function
   * @param callback
   */
  getCountSimpleOccupiedRooms(callback) {
    const $query = `SELECT COUNT(id_room_reservation) AS 'nbOccupiedSimpleRooms'
      FROM Room_Reservation RR, Room R WHERE RR.id_room = R.id_room
      AND R.type = 'simple' AND RR.active IS TRUE;`;
    database.executeQuery($query, [], callback);
  }

  /**
   * Returns the amount of double occupied rooms
   * @function
   * @param callback
   */
  getCountDoubleOccupiedRooms(callback) {
    const $query = `SELECT COUNT(id_room_reservation) AS 'nbOccupiedDoubleRooms'
      FROM Room_Reservation RR, Room R WHERE RR.id_room = R.id_room
      AND R.type = 'double' AND RR.active IS TRUE;`;
    database.executeQuery($query, [], callback);
  }

  /**
   * Returns the amount of suite occupied rooms
   * @function
   * @param callback
   */
  getCountSuiteOccupiedRooms(callback) {
    const $query = `SELECT COUNT(id_room_reservation) AS 'nbOccupiedSuiteRooms'
      FROM Room_Reservation RR, Room R WHERE RR.id_room = R.id_room
      AND R.type = 'suite' AND RR.active IS TRUE;`;
    database.executeQuery($query, [], callback);
  }
}

module.exports = Hebergement;
