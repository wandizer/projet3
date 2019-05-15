const Database = require('../../database/DatabaseV2.js');

const db = new Database();
let tableName = '';

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

function rerenderDataTable() {
  window.location.assign(`./edit_view.html?table=${tableName}`);
}

function registerModifications(e) {
  console.log(e);
  const cellPKColumnName = e.target.dataset.cle;
  const cellPKId = e.target.dataset.id;
  const modalContent = document.body.querySelector('#modal-content-edit');
  const allColumns = [];
  const allNewValues = [];

  modalContent.querySelectorAll('input').forEach(input => {
    allColumns.push(input.dataset.column);
    allNewValues.push(input.value);
  });

  db.rewrite(tableName, allColumns, allNewValues, cellPKColumnName, cellPKId, rerenderDataTable);
}

function openEditModal(e) {
  console.log('Open edit modal', e.target);
  const cellPKColumnName = e.target.dataset.cle;
  const cellPKId = e.target.dataset.id;

  const modalContent = document.body.querySelector('#modal-content-edit');
  modalContent.innerHTML = ''; // we empty the modal-content
  const modalFooter = document.body.querySelector('#modal-footer-edit');
  modalFooter.innerHTML = ''; // we empty the modal-footer
  const selectedRow = document.body.querySelector(`tr[data-id='${cellPKId}']`);
  const thead = document.body.querySelector('thead tr');
  const keys = [];
  const values = [];

  // we retrieve the column names
  console.log(thead.childNodes);
  thead.childNodes.forEach((th) => {
    if (th.className !== 'sorting_disabled') {
      console.log(th.innerHTML);
      const label = document.createElement('label');
      label.innerHTML = th.innerHTML;
      keys.push(th.innerHTML);
    }
  });

  // we retrieve the current data
  selectedRow.childNodes.forEach((td) => {
    if (td.className !== 'edit-cell' && td.className !== 'del-cell') {
      console.log(td.innerHTML);
      const input = document.createElement('input');
      input.type = 'text';
      input.value = td.innerHTML;
      values.push(td.innerHTML);
    }
  });

  // we add all the labels and inputs inside modal-content
  values.forEach((value, index) => {
    const row = document.createElement('div');
    row.className = 'row';
    row.innerHTML = `<div class="row">
        <div class="inline col s12">
          <label>${keys[index]}</label>
          <input placeholder="Enter text here ..."
          data-column="${keys[index]}" 
          type="text" class="validate" value="${value}">
        </div>`;
    modalContent.appendChild(row);
  });

  const buttonAgree = document.createElement('a');
  buttonAgree.href = '#!';
  buttonAgree.className = 'modal-close waves-effect waves-green btn red';
  buttonAgree.innerHTML = 'Modify';
  buttonAgree.dataset.cle = cellPKColumnName;
  buttonAgree.dataset.id = cellPKId;
  buttonAgree.addEventListener('click', registerModifications);
  modalFooter.appendChild(buttonAgree);

  // we open the modal
  $(document).ready(() => {
    $('.modal').modal();
    $('.modal').modal('open');
  });
}

function openDeleteModal(e) {
  console.log('Open delete modal', e.target);
  const cellPKColumnName = e.target.dataset.cle;
  const cellPKId = e.target.dataset.id;
}

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

      // add delete and modify buttons
      const thVideEdit = document.createElement('th');
      theadRow.appendChild(thVideEdit);
      const thVideDel = document.createElement('th');
      theadRow.appendChild(thVideDel);

      // add all the columns headers
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
    tr.dataset.id = Object.values(row)[0];
    // Edit button
    const tdEdit = document.createElement('td');
    tdEdit.innerHTML = `
      <div class="btn" data-id="${Object.values(row)[0]}" 
        data-cle="${Object.keys(row)[0]}">
        <i class="material-icons" 
        data-id="${Object.values(row)[0]}" 
        data-cle="${Object.keys(row)[0]}">edit</i>
      </div>`;
    tdEdit.className = 'edit-cell';
    tdEdit.dataset.id = Object.values(row)[0];
    tdEdit.dataset.cle = Object.keys(row)[0];
    tdEdit.addEventListener('click', openEditModal);
    tr.appendChild(tdEdit);

    // Del button
    const tdDel = document.createElement('td');
    tdDel.innerHTML = `
      <div class="btn red" data-id="${Object.values(row)[0]}" 
        data-cle="${Object.keys(row)[0]}">
        <i class="material-icons" 
        data-id="${Object.values(row)[0]}" 
        data-cle="${Object.keys(row)[0]}">delete</i>
      </div>`;
    tdDel.className = 'del-cell';
    tdDel.dataset.id = Object.values(row)[0];
    tdDel.dataset.cle = Object.keys(row)[0];
    tdDel.addEventListener('click', openDeleteModal);
    tr.appendChild(tdDel);

    // All the values
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
      order: [[2, 'asc']],
      columnDefs: [{
        targets: [0, 1],
        orderable: false,
      }],
      dom: '<"toolbar">frtip',
    });
    $('div.toolbar').html(`<b>Table: ${tableName}</b>`);
  });
}

// ############################################################################################# //
// ####################################    FUNCTIONS    ######################################## //
// ############################################################################################# //

/**
 * Returns the view name
 * @returns {string}
 */
function getViewName() {
  const url = window.location.href;
  const indexStart = url.search('/views/');
  const indexExt = url.search('.html');
  const length = indexExt - indexStart - 7;
  const viewName = url.substr(indexStart + 7, length);
  return viewName;
}

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

// ACTION MANAGER
switch (getViewName()) {
  case 'general_view': {
    db.showAllTables(createTableList);
    break;
  }
  case 'edit_view': {
    fetchData();
    break;
  }
  default: {
    console.log('View not found! No action executed!');
  }
}
