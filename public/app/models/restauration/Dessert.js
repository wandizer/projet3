const Database = require('../../../database/DatabaseV2.js');

const tableName = 'Dessert';
const database = new Database();

/**
 * @class Dessert
 */
class Dessert {
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
   * Equivalent to INSERT INTO for table Dessert
   */
  static write() {
    database.write(tableName, ['name'], [this.name]);
  }

  /**
   * Equivalent to UPDATE for table Dessert
   */
  static rewrite() {
    database.rewrite(tableName, ['name'], [this.name], 'id_dessert', this.id);
  }

	/* 
   * Get Dessert
   * @param name
   * @param callback
   */
  static findByName(name, callback) {
    const sql = `SELECT * FROM ${tableName} WHERE name = ?;`;
    database.executeQuery(sql, name, callback);
  }
	
	
	/* 
   * Get Dessert
   * @param id_menu
   * @param callback
   */
  static findById(id_menu, callback) {
    const sql = `SELECT * FROM ${tableName} WHERE id_dessert = ?;`;
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

module.exports = Dessert;
