const Database = require('../../database/DatabaseV2.js');

const database = new Database();

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

  /**
   * Retrieves the average notations for the room rating
   * @function
   * @param callback
   */
  getAvgRatingRoom(callback) {
    const $query = 'SELECT AVG(rating_room) AS "avgRoom" FROM Notoriete';
    database.executeQuery($query, [], callback);
  }

  /**
   * Retrieves the average notations for the services rating
   * @function
   * @param callback
   */
  getAvgRatingServices(callback) {
    const $query = 'SELECT AVG(rating_services) AS "avgServices" FROM Notoriete';
    database.executeQuery($query, [], callback);
  }

  /**
   * Retrieves the average notations for the restaurant rating
   * @function
   * @param callback
   */
  getAvgRatingRestaurant(callback) {
    const $query = 'SELECT AVG(rating_restaurant) AS "avgRestaurant" FROM Notoriete';
    database.executeQuery($query, [], callback);
  }

  /**
   * Retrieves the average notations for the events rating
   * @function
   * @param callback
   */
  getAvgRatingEvents(callback) {
    const $query = 'SELECT AVG(rating_events) AS "avgEvents" FROM Notoriete';
    database.executeQuery($query, [], callback);
  }
}

module.exports = Notoriete;
