const Database = require('../../../database/DatabaseV2.js');

const tableName = 'Main_Course';
const database = new Database();

/**
 * @class Main_Course
 */
class Main_Course {
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
   * Equivalent to INSERT INTO for table Main_Course
   */
  static write() {
    database.write(tableName, ['name'], [this.name]);
  }

  /**
   * Equivalent to UPDATE for table Main_Course
   */
  static rewrite() {
    database.rewrite(tableName, ['name'], [this.name], 'id_main_course', this.id);
  }

	/* 
   * Get Main_Course
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

module.exports = Main_Course;
