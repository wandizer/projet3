const Database = require('../../database/DatabaseV2.js');

const db = new Database();
let tableName = '';

// ############################################################################################# //
// ####################################    CALLBACKS    ######################################## //
// ############################################################################################# //

function drawDataTable(result) {
  const table = document.body.querySelector('#edit-table');

  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');
  const tfoot = document.createElement('tfoot');
  let theadDefined = false;

  result.forEach((row) => {
    // THEAD
    if (!theadDefined) {
      const theadRow = document.createElement('tr');
      Object.keys(row).forEach((columnName) => {
        const th = document.createElement('th');
        th.innerHTML = columnName;
        theadRow.appendChild(th);
      });
      thead.appendChild(theadRow);
      theadDefined = true;
    }

    // TBODY
    const tr = document.createElement('tr');
    Object.values(row).forEach((cell) => {
      const td = document.createElement('td');
      td.innerHTML = cell;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  table.appendChild(thead);
  table.appendChild(tbody);
  table.appendChild(tfoot);

  // we draw the datatable
  $(document).ready(() => {
    $('#edit-table').DataTable({
      pageLength: 10,
      bLengthChange: false,
      dom: '<"toolbar">frtip',
    });
    $('div.toolbar').html(`<b>Table: ${tableName}</b>`);
  });
}

// ############################################################################################# //
// ####################################    FUNCTIONS    ######################################## //
// ############################################################################################# //

/**
 * Get the URL parameters
 * source: https://css-tricks.com/snippets/javascript/get-url-variables/
 * @param  {String} url The URL
 * @return {Object}     The URL parameters
 */
function getParams(url) {
  const params = {};
  const parser = document.createElement('a');
  parser.href = url;
  const query = parser.search.substring(1);
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i += 1) {
    const pair = vars[i].split('=');
    params[pair[0]] = decodeURIComponent(pair[1]);
  }
  return params;
}

/**
 * Connects to the database and retrieves all the table's data
 */
function fetchData() {
  const params = getParams(window.location.href);
  tableName = params.table;

  db.executeQuery(
    `SELECT * FROM ${tableName};`,
    {},
    drawDataTable,
  );
}


// ############################################################################################# //
// #################################    EVENT LISTENERS    ##################################### //
// ############################################################################################# //


// ############################################################################################# //
// #######################################    MAIN    ########################################## //
// ############################################################################################# //


fetchData();
