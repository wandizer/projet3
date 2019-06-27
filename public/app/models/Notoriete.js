const Database = require('../../database/DatabaseV2.js');

const database = new Database();
const dateProblem = `
SELECT * FROM Room_Reservation
WHERE strftime('%d/%m/%Y', datetime(1281353727/1000, 'unixepoch')) BETWEEN
    strftime('%d/%m/%Y', datetime(date_arrival/1000, 'unixepoch')) AND
    strftime('%d/%m/%Y', datetime(date_depart/1000, 'unixepoch'));`;

/**
 * @class Notoriete
 */
class Notoriete {
  /**
   * @constructor
   */
  constructor() {
    this.rating_room = null;
    this.rating_services = null;
    this.rating_restaurant = null;
    this.rating_events = null;
  }

  /**
   * Returns the client id by email or phone number, since they are unique
   * @function
   * @param {string} email
   * @param {string} phone
   * @param {function} callback
   */
  getClientIdByEmailOrPhone(email, phone, callback) {
    const $query = `SELECT id_client FROM Client 
      WHERE email = ? OR number = ?`;
    database.executeQuery($query, [email, phone], callback);
  }

  /**
   * Equivalent to INSERT INTO Notoriete
   * @param rating_room
   * @param rating_services
   * @param rating_restaurant
   * @param rating_events
   * @param comments
   * @param id_client
   * @param {function} callback
   */
  write(
    rating_room,
    rating_services,
    rating_restaurant,
    rating_events,
    comments,
    id_client,
    callback,
  ) {
    console.log([rating_room, rating_services, rating_restaurant, rating_events, comments, id_client]);
    database.write(
      'Notoriete',
      ['rating_room', 'rating_services', 'rating_restaurant', 'rating_events', 'comments', 'id_client'],
      [rating_room, rating_services, rating_restaurant, rating_events, comments, id_client],
      callback,
    );
  }
}

module.exports = Notoriete;
