const Database = require('../../../database/DatabaseV2.js');

const tableName = 'Menu_Dessert_Item';
const database = new Database();

/**
 * @class Menu_Dessert_Item
 */
class Menu_Dessert_Item {
  /**
   * @constructor
   * @param id_food_item
   * @param id_dessert
   */
  constructor(id, id_food_item, id_dessert) {
		this.id = id;
		this.id_dessert = id_dessert;
		this.id_dessert = id_dessert;
  }

  /**
   * Equivalent to INSERT INTO for table Menu_Dessert_Item
   */
  static write() {
    database.write(tableName, ['id_dessert','id_food_item'], [this.id_dessert,this.id_food_item]);
  }
	
	 /**
   * Equivalent to UPDATE for table Main_Course
   */
  static rewrite() {
    database.rewrite(tableName, ['id_dessert,id_food_item'], [this.id_dessert,this.id_food_item], 'id_menu_main_course', this.id);
  }

	/* 	
   * Get Menu_Dessert_Item
   * @param id_food_item
   * @param callback
   */
  static findByIdItem(id_food_item, callback) {
    const sql = `SELECT * FROM ${tableName} WHERE id_food_item = ?;`;
    database.executeQuery(sql, id_food_item, callback);
  }
	
	/* 	
   * Get Menu_Dessert_Item
   * @param id_menu_course
   * @param callback
   */
  static findByIdMenu(id_dessert_course, callback) {
    const sql = `SELECT * FROM ${tableName} WHERE id_dessert = ?;`;
    database.executeQuery(sql, id_dessert_course, callback);
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

module.exports = Menu_Dessert_Item;
