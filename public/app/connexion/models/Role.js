const Database = require('../../../database/DatabaseV2.js');

const tableName = 'Role';
const database = new Database();

/**
 * @class Role
 */
class Role {
  /**
   * @constructor
   * @param id
   * @param name
   * @param id_service
   */
  constructor(id, name, id_service) {
    this.id = id;
    this.name = name;
    this.id_service = id_service;
  }

  /**
   * Equivalent to INSERT INTO for table role
   */
  static write() {
    database.write(tableName, ['name', 'id_service'], [this.name, this.id_service]);
  }

  /**
   * Equivalent to UPDATE for table role
   */
  static rewrite() {
    database.rewrite(tableName, ['name', 'id_service'], [this.name, this.id_service], 'id_role', this.id);
  }
	
	/**
	 * Get role by 'id'
	 * @param id
	 * @param callback
	 */
  static getById(id, callback) {
    const sql = `SELECT * FROM ${tableName} WHERE id_role = ?;`;
    database.executeQuery(sql, id, callback);
  }
}

module.exports = Role;
