const Database = require('../../../database/DatabaseV2.js');

const tableName = 'Stock';
const database = new Database();

/**
 * @class Stock
 */
class Stock {
  /**
   * @constructor
   * @param id
   * @param date_arrival
   * @param date_expiration
   * @param quantity
   * @param id_food_item
   */
  constructor(id, date_arrival, date_expiration, quantity) {
    this.id = id;
    this.date_arrival = date_arrival;
		this.date_expiration = date_expiration;
		this.quantity=quantity;
		this.id_food_item = id_food_item;
  }

  /**
   * Equivalent to INSERT INTO for table Stock
   */
  static write() {
    database.write(tableName, ['date_arrival','date_expiration','quantity','id_food_item'], [this.name,this.date_arrival,this.date_expiration,this.quantity,this.id_food_item]);
  }

  /**
   * Equivalent to UPDATE for table Stock
   */
  static rewrite() {
    database.rewrite(tableName, ['date_arrival','date_expiration','quantity','id_food_item'], [this.date_arrival,this.date_expiration,this.quantity,this.id_food_item], 'id_stock', this.id);
  }

	/* 
   * Get Stock food
   * @param id_food_item
   * @param callback
   */
  static findById(id_food_item, callback) {
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

module.exports = Stock;
