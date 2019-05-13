const Database = require('../../database/DatabaseV2.js');

// ############################################################################################# //
// ####################################    FUNCTIONS    ######################################## //
// ############################################################################################# //


// ############################################################################################# //
// ####################################    CALLBACKS    ######################################## //
// ############################################################################################# //

/**
 * Inserts all the table cards in the table list
 * @param result - List of table names
 */
function createTableList(result) {
  const element = document.body.querySelector('#list-of-tables');
  // we check if the element exists in the DOM
  if (typeof element !== 'undefined' && element !== null) {
    result.forEach((table) => {
      if (table.name !== 'sqlite_sequence') {
        const tableCard = document.createElement('div');
        tableCard.className = 'col s12 m6';
        tableCard.innerHTML = `
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <span class="card-title">
              <span class="green-text">Table name: </span> ${table.name}
            </span>
          </div>
          <div class="card-action">
            <a href="edit_view.html?table=${table.name}">Show</a>
            <a href="delete_view.html?table=${table.name}">Delete</a>
          </div>
        </div>`;
        element.appendChild(tableCard);
      }
    });
  }
}

// ############################################################################################# //
// #################################    EVENT LISTENERS    ##################################### //
// ############################################################################################# //


// ############################################################################################# //
// #######################################    MAIN    ########################################## //
// ############################################################################################# //
const db = new Database();

db.showAllTables(createTableList);
