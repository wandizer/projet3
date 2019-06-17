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
  static write() {
    database.write(tableName, ['name','price','id_appetizer','id_main_course', 'id_dessert'], [this.name,this.price,this.id_appetizer,this.id_main_course,this.id_dessert]);
  }

  /**
   * Equivalent to UPDATE for table Menu
   */
  static rewrite() {
    database.rewrite(tableName, ['name','price','id_appetizer','id_main_course', 'id_dessert'], [this.name,this.price,this.id_appetizer,this.id_main_course,this.id_dessert], 'id_menu', this.id);
  }

	/* 
   * Get Stock Menu
   * @param id_menu
   * @param callback
   */
  static findById(id_menu, callback) {
    const sql = `SELECT * FROM ${tableName} WHERE id_menu = ?;`;
    database.executeQuery(sql, id_menu, callback);
  }
	
}

module.exports = Menu;
