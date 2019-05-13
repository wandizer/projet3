const sqlite3 = require('sqlite3').verbose();
const schema = require('./schema.js');

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
   * @param {Array} args
   * @param params
   */
  write(tableName, args, params) {
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
    this.executeQuery(sql, params);
  }

  createSchema() {
    this.db.serialize(() => {
      Object.keys(schema).forEach((key) => {
        this.executeQuery(schema[key]);
      });
    });
  }

  servicesInserts() {
    const querys = [];
    const arg = [
      'Admin',
      'Gestionnaires',
      'Cuisine',
      'Salle',
      'Réception',
      'Etages',
      'Maintenance',
      'Direction',
      'Loisirs'];
    for (let i = 0; i < arg.length; i += 1) {
      querys.push(`INSERT INTO service(name) VALUES ('${arg[i]}')`);
    }
    return querys;
  }

  rolesInserts() {
    const querys = [];
    querys.push('INSERT INTO role(name,id_service) VALUES ("Directeur de l’hôtel",1)');
    let arg = ['Directeur du restaurant',
      'Directeur d’hébergement',
      'Chef de réception',
      'Gouvernante générale',
      'Chef de maintenance',
      'Spa manager'];
    for (let i = 0; i < arg.length; i += 1) {
      querys.push(`INSERT INTO role(name,id_service) VALUES ('${arg[i]}',2);`);
    }
    arg = ['chef de cuisine',
      'seconde de cuisine',
      'chef de partie',
      'pâtissier',
      'boulanger',
      'cuisinier',
      'commis de cuisine',
      'pizzaïolo',
      'crêpier',
      'écailler',
      'plongeur',
      'chef econome',
      'économes'];
    for (let i = 0; i < arg.length; i += 1) {
      querys.push(`INSERT INTO role(name,id_service) VALUES ('${arg[i]}',3)`);
    }
    arg = ['responsable de salle',
      'maître d’hôtel',
      'chef de range',
      'serveur',
      'commis de salle',
      'chef sommelier',
      'sommelier',
      'barman',
      'garçon de café'];
    for (let i = 0; i < arg.length; i += 1) {
      querys.push(`INSERT INTO role(name,id_service) VALUES ('${arg[i]}',4)`);
    }
    arg = ['chef de réception',
      'réceptionniste',
      'night auditor',
      'veilleur de nuit',
      'concierge',
      'voiturier',
      'portier',
      'bagagiste',
      'groom',
      'room service'];
    for (let i = 0; i < arg.length; i += 1) {
      querys.push(`INSERT INTO role(name,id_service) VALUES ('${arg[i]}',5)`);
    }
    arg = ['Gouvernante Générale',
      'gouvernante',
      'femme de chambre',
      'lingère'];
    for (let i = 0; i < arg.length; i += 1) {
      querys.push(`INSERT INTO role(name,id_service) VALUES ('${arg[i]}',6)`);
    }
    arg = ['chef de maintenance',
      'techniciens de maintenance'];
    for (let i = 0; i < arg.length; i += 1) {
      querys.push(`INSERT INTO role(name,id_service) VALUES ('${arg[i]}',7)`);
    }
    arg = ['directeur d’hôtel',
      'directeur du restaurant',
      'directeur de l’hébergement'];
    for (let i = 0; i < arg.length; i += 1) {
      querys.push(`INSERT INTO role(name,id_service) VALUES ('${arg[i]}',8)`);
    }
    querys.push('INSERT INTO role(name,id_service) VALUES (\'Spa Manager\',9)');
    return querys;
  }


  employeInserts() {
    const querys = [];
    for (let i = 0; i < 9; i += 1) {
      querys.push(`INSERT INTO employe(name,surname,birthday,salary,id_role) VALUES ('testNam${i}','testSur${i}','2019-04-01','1000','${i}')`);
    }
    return querys;
  }

  userInserts() {
    const querys = [];
    for (let i = 0; i < 9; i += 1) {
      querys.push(`INSERT INTO user(email,username,password,id_employe) VALUES ('testEmail${i}@yopmail.com','test${i}','123','${i}')`);
    }
    return querys;
  }

  roomInserts() {
    const querys = [];
    for (let i = 0; i < 20; i += 1) {
      querys.push(`INSERT INTO room(number,floor,price,type) VALUES ('A${i}','1','100','Single')`);
    }
    for (let i = 0; i < 20; i += 1) {
      querys.push(`INSERT INTO room(number,floor,price,type) VALUES ('B${i}','2','200','Double')`);
    }
    for (let i = 0; i < 20; i += 1) {
      querys.push(`INSERT INTO room(number,floor,price,type) VALUES ('C${i}','3','300','Suite')`);
    }
    return querys;
  }


  insertData() {
    const servicesInserts = this.servicesInserts();
    const rolesInserts = this.rolesInserts();
    const employeInserts = this.employeInserts();
    const userInserts = this.userInserts();
    const roomInserts = this.roomInserts();
    this.db.serialize(() => {
      servicesInserts.forEach((sql) => {
        this.executeQuery(sql);
      });
      rolesInserts.forEach((sql) => {
        this.executeQuery(sql);
      });
      employeInserts.forEach((sql) => {
        this.executeQuery(sql);
      });
      userInserts.forEach((sql) => {
        this.executeQuery(sql);
      });
      roomInserts.forEach((sql) => {
        this.executeQuery(sql);
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
