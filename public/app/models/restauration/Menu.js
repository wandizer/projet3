const Database = require('../../../database/DatabaseV2.js');

const tableName = 'Menu';
const database = new Database();

/**
 * @class Menu
 */
class Menu {
  /**
   * @constructor
   * @param id
   * @param name
   * @param price
   * @param id_appetizer
   * @param id_main_course
   * @param id_dessert
   */
  constructor(id, name, price, id_appetizer,id_main_course,id_dessert) {
    this.id = id;
    this.name = name;
		this.price = price;
		this.id_appetizer = id_appetizer;
		this.id_main_course = id_main_course;
		this.id_dessert = id_dessert;
  }

  /**
   * Equivalent to INSERT INTO for table Menu
   */
  static write(name,price,id_appetizer,id_main_course,id_dessert) {
    database.write(tableName, ['name','price','id_appetizer','id_main_course', 'id_dessert'], [name,price,id_appetizer,id_main_course,id_dessert]);
  } 

  /**
   * Equivalent to DELETE FROM TABLE
   * @function
   * @param idCentrale
   * @param {function} callback
   */
  deleteRow(id_menu, callback) {
    database.deleteRow(
      'Menu',
      'id_menu',
      id_menu,
      callback,
    );
  }

  /**
   * Equivalent to UPDATE for table Menu
   */
  static rewrite(id,name,price,id_appetizer,id_main_course,id_dessert) {
    database.rewrite(tableName, ['name','price','id_appetizer','id_main_course', 'id_dessert'], [name,price,id_appetizer,id_main_course,id_dessert], 'id_menu', id);
  }

	/* 
   * Get Menu
   * @param id_menu
   * @param callback
   */
  static findById(id_menu, callback) {
    const sql = `SELECT * FROM ${tableName} WHERE id_menu = ?;`;
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

module.exports = Menu;
