const Database = require('../../../database/DatabaseV2.js');

const tableName = 'Menu_Main_Course_Item';
const database = new Database();

/**
 * @class Menu_Main_Course_Item
 */
class Menu_Main_Course_Item {
  /**
   * @constructor
   * @param id_food_item
   * @param id_maincourse
   */
  constructor(id, id_food_item, id_maincourse) {
		this.id = id;
		this.id_maincourse = id_maincourse;
		this.id_food_item = id_food_item;
  }

  /**
   * Equivalent to INSERT INTO for table Menu_Main_Course_Item
   */
  static write() {
    database.write(tableName, ['id_maincourse','id_food_item'], [this.id_maincourse,this.id_food_item]);
  }
	
	 /**
   * Equivalent to UPDATE for table Main_Course
   */
  static rewrite() {
    database.rewrite(tableName, ['id_maincourse,id_food_item'], [this.id_maincourse,this.id_food_item], 'id_menu_main_course', this.id);
  }

	/* 	
   * Get Menu_Main_Course_Item
   * @param id_food_item
   * @param callback
   */
  static findByIdItem(id_food_item, callback) {
    const sql = `SELECT * FROM ${tableName} WHERE id_food_item = ?;`;
    database.executeQuery(sql, id_food_item, callback);
  }
	
	/* 	
   * Get Menu_Main_Course_Item
   * @param id_menu_course
   * @param callback
   */
  static findByIdMenu(id_menu_course, callback) {
    const sql = `SELECT * FROM ${tableName} WHERE id_main_course = ?;`;
    database.executeQuery(sql, id_menu_course, callback);
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

module.exports = Menu_Main_Course_Item;
