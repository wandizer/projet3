const mysql = require('mysql');

/**
 * @class Database
 */
class Database {
  /**
   * Class database constructor
   * @constructor
   * @param {string} host
   * @param {string} user
   * @param {string} password
   * @param {string} database
   */
  constructor(host, user, password, database) {
    this.connection = mysql.createConnection({
      host, user, password, database,
    });
  }

  /**
   * Connects to the database
   */
  startConnection() {
    // Opens a connection
    this.connection.connect((err) => {
      // in case of error
      if (err) console.log(err.code, err.fatal);
    });
  }

  /**
   * Closes the connection with the database
   */
  stopConnection() {
    // Close the connection
    this.connection.end((err) => {
      // in case of error
      if (err) console.log(err.code, err.fatal);
      // The connection has been closed
    });
  }

  /**
   * Creates a query to our database and returns the result if it exists
   * @param {string} $query
   * @param {Array} $params
   * @param {Function} callback
   * @param {Array} callbackArgs
   */
  executeQuery($query, $params, callback, callbackArgs) {
    // We open a connection
    this.startConnection();

    // We execute the query
    this.connection.query($query, $params, (err, rows) => {
      if (err) {
        console.log('An error ocurred performing the query.', err);
        return;
      }

      if (callback) callback(rows, callbackArgs);
    });

    // We close the connection
    this.stopConnection();
  }

  /**
   * Returns a Database object with host, user, password and database already inserted
   * @returns {Database}
   */
  static getDatabase(host, user, password, database) {
    return new Database(
      (!host) ? 'localhost' : host,
      (!user) ? 'root' : user,
      (!password) ? 'root' : password,
      (!database) ? 'hotel' : database,
    );
  }

  /**
   * Equivalent to an INSERT INTO
   * @param {string} table - corresponds to the table name
   * @param {Array} args
   * @param {} params
   */
  write(table, args, params) {
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

    const sql = `INSERT INTO ${table} ${stringArgs} VALUES ${stringParams};`;
    this.executeQuery(sql, params);
  }

	/** Equivalent to an UPDATE 
   * @param {string} table - corresponds to the table name
   * @param {Array} args
   * @param {} params
   */
  rewrite(table, args, argsParams, condition, conditionParams) {
		if(
			(condition !== null && condition !== undefined)
			&& (conditionParams !== null && conditionParams !== undefined) 
			&& (argsParams !== null && argsParams !== undefined) 
			&& (args !== null && args !== undefined) 
			&& (table !== null && table !== undefined) 
			&& (args.length===argsParams.length)
		){
			let stringArgs = '';
			for (let i = 0, l = args.length; i < l; i += 1) {
				stringArgs += `${args[i]} = ?,`;
			}
			//console.log(stringArgs);
			const sql = `UPDATE ${table} SET ${stringArgs} where ${condition}=${conditionParams};`;
			this.executeQuery(sql, argsParams);
  	}else{
        console.log('An error ocurred performing the update query.', err);
		}
	}

  getByUsername(table, username, callback, callbackArgs) {
    const sql = `SELECT * FROM ${table} WHERE username = ?;`;
    this.executeQuery(sql, username, callback, callbackArgs);
  }
}

module.exports = Database;
