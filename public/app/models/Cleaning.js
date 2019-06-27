const Database = require('../../database/DatabaseV2.js');

const database = new Database();

/**
 * @class Cleaning
 */
class Cleaning {

  /**
   * @constructor
   */
  constructor() {
    this.id_cleaning = null;
  }

  /**
   * Equivalent to INSERT INTO Cleaning
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

module.exports = Cleaning;
