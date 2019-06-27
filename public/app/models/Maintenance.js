const Database = require('../../database/DatabaseV2.js');

const database = new Database();

/**
 * @class Maintenance
 */
class Maintenance {

  /**
   * @constructor
   */
  constructor() {
    this.id_maintenance = null;
  }

  /**
   * Equivalent to INSERT INTO Maintenance
   * @function
   * @param {string} title
   * @param {string} description
   * @param {string} priority
   * @param {string} date_deadline
   * @param {boolean} state
   * @param {function} callback
   */
  write(title, description, priority, date_deadline, state, callback) {
    database.write(
      'Cleaning',
      ['title', 'description', 'priority', 'date_creation', 'date_deadline', 'state'],
      [title, description, priority, new Date().toLocaleDateString('fr-FR'), date_deadline, state],
      callback,
    );
  }
}

module.exports = Maintenance;
