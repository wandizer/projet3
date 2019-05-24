const sqlite3 = require('sqlite3').verbose();
const schema = require('./schema.js');
const data = require('./data.js');

// const data = require('./data.js');

/**
 * @class DatabaseV2
 */
class DatabaseV2 {
  /**
   * @constructor
   * @param databaseFilename - optional
   */
  constructor(databaseFilename) {
    this.db = null;
    if (databaseFilename) this.startConnection(databaseFilename);
    else this.startConnection();
    // this.createSchema();
    // this.insertData();
  }

  /**
   * Connects to the database
   */
  startConnection(databaseFilename) {
    // connecting to a disk file database
    this.db = new sqlite3.Database(
      `./public/database/${(!databaseFilename) ? 'hotel' : databaseFilename}.db`,
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
      this.db.all($query, $params, (err, rows) => {
        if (err) {
          console.log('An error ocurred performing the query.', err, $query);
          return;
        }
        if (callback) callback(rows, callbackArgs);
      });
    });
  }

  /**
   * Shows all the tables in the current database
   * @param {Function} callback
   */
  showAllTables(callback) {
    this.executeQuery('SELECT name FROM sqlite_master WHERE type = ?;', 'table', callback);
  }

  /**
   * Equivalent to an INSERT INTO
   * @param {string} tableName
   * @param {Array} args - Corresponds to the column names
   * @param params - Corresponds to the values
   * @param {Function} callback
   */
  write(tableName, args, params, callback) {
    let stringArgs = '';
    let stringParams = '';

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
    this.executeQuery(sql, params, callback);
  }

  /** Equivalent to an UPDATE
   * @param {string} table - corresponds to the table name
   * @param {Array} args - corresponds to the column names
   * @param argsParams - corresponds to the new values
   * @param condition - corresponds to the condition column
   * @param conditionParams - corresponds to the condition value
   * @param {Function} callback
   */
  rewrite(table, args, argsParams, condition, conditionParams, callback) {
    if ((condition !== null && condition !== undefined)
      && (conditionParams !== null && conditionParams !== undefined)
      && (argsParams !== null && argsParams !== undefined)
      && (args !== null && args !== undefined)
      && (table !== null && table !== undefined)
      && (args.length === argsParams.length)
    ) {
      let stringArgs = '';
      for (let i = 0, l = args.length; i < l; i += 1) {
        stringArgs += `${args[i]} = ?`;
        if (i < (l - 1)) {
          stringArgs += ' , ';
        }
      }
      // console.log(stringArgs);
      const sql = `UPDATE ${table} SET ${stringArgs} where ${condition}=${conditionParams};`;
      this.executeQuery(sql, argsParams, callback);
    } else {
      console.log('An error ocurred performing the update query.');
    }
  }

  /**
   * Equivalent to DELETE in SQL. In this case deletes a row on a table
   * @param table
   * @param conditionColumn
   * @param conditionValue
   * @param callback
   */
  deleteRow(table, conditionColumn, conditionValue, callback) {
    const sql = `DELETE FROM ${table} WHERE ${conditionColumn} = ?`;
    this.executeQuery(sql, conditionValue, callback);
  }

  /**
   * Creates the schema of the database (empty)
   */
  createSchema() {
    this.db.serialize(() => {
      Object.keys(schema).forEach((key) => {
        this.executeQuery(schema[key]);
      });
    });
  }

  /**
   * Inserts the initial data as example into the database
   */
  insertData() {
    this.db.serialize(() => {
      Object.keys(data).forEach(key => {
        Object.values(data[key]).forEach(value => {
          this.executeQuery(value);
        });
      });
    });
  }

  /**
   * Returns a Database object
   * @returns {DatabaseV2}
   */
  static getDatabase() {
    return new DatabaseV2();
  }
}

module.exports = DatabaseV2;
