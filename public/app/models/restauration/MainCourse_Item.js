const Database = require('../../../database/DatabaseV2.js');

const tableName = 'MainCourse_Item';
const database = new Database();

/**
 * @class MainCourse_Item
 */
class MainCourse_Item {
  /**
   * @constructor
   * @param id_food_item
   * @param id_main_course
   */
  constructor(id_food_item, id_main_course) {
		this.id_food_item = id_food_item;
		this.id_main_course = id_main_course;
  }

  /**
   * Equivalent to INSERT INTO for table MainCourse_Item
   */
  static write() {
    database.write(tableName, ['id_main_course','id_food_item'], [this.id_main_course,this.id_food_item]);
  }

	/* 
   * Get Stock food
   * @param id_main_course
   * @param callback
   */
  static findByIdCourse(id_main_course, callback) {
    const sql = `SELECT * FROM ${tableName} WHERE id_main_course = ?;`;
    database.executeQuery(sql, id_main_course, callback);
  }	
	
	/* 
   * Get Stock item
   * @param id_food_item
   * @param callback
   */
  static findByIdItem(id_food_item, callback) {
    const sql = `SELECT * FROM ${tableName} WHERE id_food_item = ?;`;
    database.executeQuery(sql, id_food_item, callback);
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

module.exports = MainCourse_Item;
