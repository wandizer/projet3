const Database = require('../../database/DatabaseV2.js');

const tableName = 'Employe';
const database = new Database();

/**
 * @class Employe
 */
class Employe {
  /**
   * @constructor
   * @param id
   * @param name
   * @param surname
   * @param birthday
   * @param salary
   * @param id_role
   */
  constructor(id, name, surname, birthday, salary, id_role) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.birthday = birthday;
    this.salary = salary;
    this.id_role = id_role;
  }

  /**
   * Equivalent to INSERT INTO for table Employe
   */
  static write() {
    database.write(tableName, ['name', 'surname', 'birthday', 'salary', 'id_role'], [this.name, this.surname, this.birthday, this.salary, this.id_role]);
  }

  /**
   * Equivalent to UPDATE for table Employe
   */
  static rewrite() {
    database.rewrite(tableName, ['name', 'surname', 'birthday', 'salary', 'id_role'], [this.name, this.surname, this.birthday, this.salary, this.id_role], 'id_employe', this.id);
  }

  /**
   * Get employe by 'id'
   * @param id
   * @param callback
   */
  static getById(id, callback) {
    const sql = `SELECT * FROM ${tableName} WHERE id_employe = ?;`;
    database.executeQuery(sql, id, callback);
  }
}

module.exports = Employe;
