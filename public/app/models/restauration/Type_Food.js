const Database = require('../../../database/DatabaseV2.js');

const tableName = 'Type_Food';
const database = new Database();

/**
 * @class Type_Food
 */
class Type_Food {
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
   * Equivalent to INSERT INTO for table TypeFood
   */
  static write() {
    database.write(tableName, ['name'], [this.name]);
  }

  /**
   * Equivalent to UPDATE for table TypeFood
   */
  static rewrite() {
    database.rewrite(tableName, ['name'], [this.name], 'id_type_food', this.id);
  }

	/* 
   * Get type
   * @param name
   * @param callback
   */
  static findByName(name, callback) {
    const sql = `SELECT * FROM ${tableName} WHERE name = ?;`;
    database.executeQuery(sql, name, callback);
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

module.exports = Type_Food;
