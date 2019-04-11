const sqlite3 = require('sqlite3').verbose();

/**
 * @class DatabaseV2
 */
class DatabaseV2 {
  /**
   * @constructor
   */
  constructor() {
    this.db = null;
    this.startConnection();
  }

  /**
   * Connects to the database
   */
  startConnection(databaseFilename) {
    // connecting to a disk file database
    this.db = new sqlite3.Database(
      `../../database/${(!databaseFilename) ? 'hotel' : databaseFilename}.db`,
      (err) => {
        if (err) console.error(err.message);
        else console.log('Connected to the in-memory SQlite database.');
      },
    );
  }

  /**
   * Closes the connection with the database
   */
  stopConnection() {
    // close the database connection
    this.db.close((err) => {
      if (err) console.error(err.message);
      else console.log('Close the database connection.');
    });
  }

  /**
   * Creates a query to our database and returns the result if it exists
   * @param {string} $query
   * @param $params
   * @param {Function} callback
   * @param callbackArgs
   */
  executeQuery($query, $params, callback, callbackArgs) {
    this.db.serialize(() => {
      // We execute the query
      this.db.run($query, $params, (err, rows) => {
        if (err) {
          console.log('An error ocurred performing the query.', err);
          return;
        }

        if (callback) callback(rows, callbackArgs);
      });
    });
  }

  /**
   * Equivalent to an INSERT INTO
   * @param {string} tableName
   * @param {Array} args
   * @param params
   */
  write(tableName, args, params) {
    let stringArgs = ''; let stringParams = '';

    for (let i = 0, l = args.length; i < l; i += 1) {
      stringArgs += (i === 0) ? '(' : (i !== l ? ', ' : '');
      stringArgs += args[i];

      stringParams += (i === 0) ? '(' : (i !== l ? ', ' : '');
      stringParams += '?';

      if ((i + 1) === l) {
        stringArgs += ')';
        stringParams += ')';
      }
    }

    const sql = `INSERT INTO ${tableName} ${stringArgs} VALUES${stringParams};`;
    this.executeQuery(sql, params);
  }

  /**
   * Get User by username
   * @param {string} tableName
   * @param {string} username
   * @param {Function} callback
   * @param {Array} callbackArgs
   */
  getByUsername(tableName, username, callback, callbackArgs) {
    const sql = `SELECT * FROM ${tableName} WHERE username = ?;`;
    this.executeQuery(sql, username, callback, callbackArgs);
  }
}

module.exports = DatabaseV2;
