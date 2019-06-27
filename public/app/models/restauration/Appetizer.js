const Database = require('../../../database/DatabaseV2.js');

const tableName = 'Appetizers';
const database = new Database();

/**
 * @class Appetizers
 */
class Appetizers {
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
   * Equivalent to INSERT INTO for table Appetizers
   */
  static write() {
    database.write(tableName, ['name'], [this.name]);
  }

  /**
   * Equivalent to UPDATE for table Appetizers
   */
  static rewrite() {
    database.rewrite(tableName, ['name'], [this.name], 'id_appetizer', this.id);
  }

	/* 
   * Get Appetizers
   * @param name
   * @param callback
   */
  static findByName(name, callback) {
    const sql = `SELECT * FROM ${tableName} WHERE name = ?;`;
    database.executeQuery(sql, name, callback);
  }
	
	/* 
   * Get Appetizers
   * @param id_menu
   * @param callback
   */
  static findById(id_menu, callback) {
    const sql = `SELECT * FROM ${tableName} WHERE id_appetizer = ?;`;
    database.executeQuery(sql, id_menu, callback);
  }
	
	/* 
   * Find all types
	 * @param callback
   */
  static findAll(callback) {
    const sql = `SELECT * FROM ${tableName};`;
    database.executeQuery(sql,{},callback);
  }
	
}

module.exports = Appetizers;
