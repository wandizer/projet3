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

  executeQuery($query, callback) {
    // We open a connection
    this.startConnection();
    // We execute the query
    let result;
    this.connection.query($query, (err, rows) => {
      if (err) {
        console.log("An error ocurred performing the query.", err);
        return;
      }
      callback(rows);
    });
    // We close the connection
    this.stopConnection();
  }
}

module.exports = Database;
