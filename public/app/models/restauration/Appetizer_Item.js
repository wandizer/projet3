const Database = require('../../../database/DatabaseV2.js');

const tableName = 'Appetizer_Item';
const database = new Database();

/**
 * @class Appetizer_Item
 */
class Appetizer_Item {
  /**
   * @constructor
   * @param id_food_item
   * @param id_appetizer
   */
  constructor(id_food_item, id_main_course) {
		this.id_food_item = id_food_item;
		this.id_appetizer = id_appetizer;
  }

  /**
   * Equivalent to INSERT INTO for table Appetizers_Item
   */
  static write() {
    database.write(tableName, ['id_food_item','id_appetizer'], [this.id_food_item,this.id_appetizer]);
  }

	/* 
   * Get Stock appetizer
   * @param id_appetizer
   * @param callback
   */
  static findByIdCourse(id_appetizer, callback) {
    const sql = `SELECT * FROM ${tableName} WHERE id_appetizer = ?;`;
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

module.exports = Appetizer_Item;
