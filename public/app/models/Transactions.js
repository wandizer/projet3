const Database = require('../../database/DatabaseV2.js');

const database = new Database();

/**
 * @class Transactions
 */
class Transactions {
  /**
   * @constructor
   */
  constructor() {
    this.transactions = null;
  }

  /**
   * Returns all the transactions
   * @param {function} callback
   */
  getAllTransactions(callback) {
    const $query = 'SELECT * FROM Transactions';
    database.executeQuery($query, [], callback);
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
   * Returns the total income by type
   * @function
   * @param type
   * @param callback
   */
  getTotalIncome(type, callback) {
    const $query = 'SELECT SUM(amount) FROM Transactions WHERE type = ?';
    database.executeQuery($query, [type], callback);
  }

  /**
   * Returns the week income by type
   * @function
   * @param type
   * @param callback
   */
  getWeekIncome(type, callback) {
    const lastSevenDays = this.getFormattedPeriod(new Date(), 7);
    // We execute the query
    const $query = `SELECT SUM(amount) AS 'income' FROM Transactions
      WHERE date IN (${lastSevenDays}) AND type = ?`;
    database.executeQuery($query, [type], callback);
  }

  /**
   * Returns last week income by type
   * @param type
   * @param callback
   */
  getLastWeekIncome(type, callback) {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    const lastWeekDays = this.getFormattedPeriod(date, 7);
    // We execute the query
    const $query = `SELECT SUM(amount) AS 'income' FROM Transactions
      WHERE date IN (${lastWeekDays}) AND type = ?`;
    database.executeQuery($query, [type], callback);
  }
}

module.exports = Transactions;
