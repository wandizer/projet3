const Database = require('../../database/DatabaseV2.js');

const tableName = 'Service';
const database = new Database();

/**
 * @class Service
 */
class Service {
  /**
   * @constructor
   * @param id
   * @param name
   */
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  /**
   * Equivalent to INSERT INTO for table service
   */
  static write() {
    database.write(tableName, ['name'], [this.name]);
  }

  /**
   * Equivalent to UPDATE for table service
   */
  static rewrite() {
    database.rewrite(tableName, ['name'], [this.name], 'id_service', this.id);
  }

  /**
   * Get role by 'id'
   * @param id
   * @param callback
   */
  static getById(id, callback) {
    const sql = `SELECT * FROM ${tableName} WHERE id_service = ?;`;
    database.executeQuery(sql, id, callback);
  }
}

module.exports = Service;
