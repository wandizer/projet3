const Database = require('../../../database/DatabaseV2.js');

const tableName = 'Meal_Reservation';
const database = new Database();

/**
 * @class Meal_Reservation
 */
class Meal_Reservation {
  /**
   * @constructor
   * @param id
   * @param name
   */
  constructor(id, id_client, id_day_menu) {
    this.id = id;
    this.id_client = id_client;
		this.id_day_menu = id_day_menu;
  }

  /**
   * Equivalent to INSERT INTO for table Meal_Reservation
   */
  static write() {
    database.write(tableName, ['id_client','id_day_menu'], [this.id_client,this.id_day_menu]);
  }

  /**
   * Equivalent to UPDATE for table Meal_Reservation
   */
  static rewrite() {
    database.rewrite(tableName, ['id_client','id_day_menu'], [this.id_client,this.id_day_menu], 'id_meal_reservation', this.id);
  }

	/* 
   * Get couverts
   * @param date
   * @param callback
   */
  static findCouverts(date, callback) {
    const sql = `SELECT COUNT(*) FROM ${tableName} WHERE id_day_menu = ?;`;
    database.executeQuery(sql, date, callback);
  }
	
		/* 
   * Get reservation
   * @param id_menu
   * @param callback
   */
  static findById(id_day_menu, callback) {
    const sql = `SELECT * FROM ${tableName} WHERE id_day_menu = ?;`;
    database.executeQuery(sql, id_day_menu, callback);
  }
	
}

module.exports = Meal_Reservation;
