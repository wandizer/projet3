const Database = require('../../../database/DatabaseV2.js');

const tableName = 'Day_Menu';
const database = new Database();

/**
 * @class Day_Menu
 */
class Day_Menu {
  /**
   * @constructor
   * @param id
   * @param name
   */
  constructor(id, date, evening, noon, id_menu) {
    this.id = id;
    this.date = date;
		this.evening = evening;
		this.noon = noon;
		this.id_menu = id_menu;
  }

  /**
   * Equivalent to INSERT INTO for table Day_Menu
   */
  static write() {
    database.write(tableName, ['date_arrival','evening','noon','id_menu'], [this.date,this.evening,this.noon,this.id_menu]);
  }

  /**
   * Equivalent to UPDATE for table Day_Menu
   */
  static rewrite() {
    database.rewrite(tableName, ['date_arrival','evening','noon','id_menu'], [this.date,this.evening,this.noon,this.id_menu], 'id_day_menu', this.id);
  }

	/* 
   * Get type
   * @param date
   * @param callback
   */
  static findByDate(date, callback) {
    const sql = `SELECT * FROM ${tableName} WHERE date_arrival = ?;`;
    database.executeQuery(sql, date, callback);
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

module.exports = Day_Menu;
