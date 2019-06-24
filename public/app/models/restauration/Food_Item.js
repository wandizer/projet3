const Database = require('../../../database/DatabaseV2.js');

const tableName = 'Food_Item';
const database = new Database();

/**
 * @class Food_Item
 */
class Food_Item {
  /**
   * @constructor
   * @param id
   * @param name
	 * @param id_type_food
   */
  constructor(id, email, id_type_food) {
    this.id = id;
    this.name = name;
		this.id_type_food = id_type_food;
  }
	
	/**
   * Equivalent to INSERT INTO for table Food_Item
   */
  static write() {
    database.write(tableName, ['name', 'id_type_food'], [this.name, this.id_type_food]);
  }

  /**
   * Equivalent to UPDATE for table Food_Item
   */
  static rewrite() {
    database.rewrite(tableName, ['name', 'id_type_food'], [this.name, this.id_type_food], 'id_food_item', this.id);
  }
	
	/* 
   * Get Main_Course
   * @param id_menu
   * @param callback
   */
  static findById(id_food_item, callback) {
    const sql = `SELECT * FROM ${tableName} WHERE id_food_item = ?;`;
    database.executeQuery(sql, id_food_item, callback);
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

module.exports = Food_Item;
