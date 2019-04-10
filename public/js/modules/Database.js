const mysql = require('mysql');

class Database {
  constructor(host, user, password, database) {
    this.connection = mysql.createConnection({
      host, user, password, database,
    });
  }

  startConnection() {
    // Opens a connection
    this.connection.connect((err) => {
      // in case of error
      if (err) console.log(err.code, err.fatal);
    });
  }

  stopConnection() {
    // Close the connection
    this.connection.end((err) => {
      // in case of error
      if (err) console.log(err.code, err.fatal);
      // The connection has been closed
    });
  }



  executeQuery($query, $params, callback, callbackArgs) {
    // We open a connection
    this.startConnection();

    // We execute the query
    this.connection.query($query, $params, (err, rows) => {

      if (err) {
        console.log("An error ocurred performing the query.", err);
        return;
      }

      if(callback) callback(rows, callbackArgs);

    });

    // We close the connection
    this.stopConnection();
  }



  static getDatabase() {
    return new Database('localhost', 'root', '', 'hotel');
  }



  write(table, args, params) {
    let stringArgs = '', stringParams = '';

    for ( let i = 0, l = args.length ; i < l ; ++i ) {
      stringArgs += (i === 0) ? '(' : (i !== l ? ', ' : '');
      stringArgs += args[i];

      stringParams += (i === 0) ? '(' : (i !== l ? ', ' : '');
      stringParams += '?';

      if ((i+1) === l ) {
        stringArgs += ')';
        stringParams += ')';
      }
    }

    const sql = 'INSERT INTO ' + table + ' ' + stringArgs + ' VALUES' + stringParams + ';';
    this.executeQuery(sql, params);
  }

  getByUsername(table, username, callback, callbackArgs) {
    const sql = 'SELECT * FROM ' + table + ' WHERE username = ?;';
    this.executeQuery(sql, username, callback, callbackArgs);
  }
}

module.exports = Database;
