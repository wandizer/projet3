const Database = require('../../database/DatabaseV2.js');

const db = new Database();
let tableName = '';

// ############################################################################################# //
// ####################################    CALLBACKS    ######################################## //
// ############################################################################################# //

function openEditModal(e) {
  console.log('Open edit modal', e.target);
  const cellPKColumnName = e.target.dataset.cle;
  const cellPKId = e.target.dataset.id;

  const modalContent = document.body.querySelector('#modal-content-edit');
  modalContent.innerHTML = ''; // we empty the modal-content
  const selectedRow = document.body.querySelector(`tr[data-id='${cellPKId}']`);
  const thead = document.body.querySelector('thead tr');

  const allLabels = document.createElement('div');
  allLabels.className = 'col s6';
  const allInputs = document.createElement('div');
  allInputs.className = 'col s6';

  console.log(selectedRow);
  console.log(thead);

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
      // allLabels.appendChild(label);
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
      // allInputs.appendChild(input);
    }
  });

  console.log(keys, values);

  // const template = `<div class="row">
  //       <div class="input-field col s6">
  //         <input placeholder="Placeholder" id="first_name" type="text" class="validate">
  //         <label for="first_name">First Name</label>
  //       </div>`;

  // we add all the labels and inputs inside modal-content
  values.forEach((value, index) => {
    const row = document.createElement('div');
    row.className = 'row';
    row.innerHTML = `<div class="row">
        <div class="inline col s12">
          <label>${keys[index]}</label>
          <input placeholder="Enter text here ..." type="text" class="validate" value="${value}">
        </div>`;
    modalContent.appendChild(row);
  });

  // const row = document.createElement('div');
  // row.className = 'row';
  // row.appendChild(allLabels);
  // row.appendChild(allInputs);
  // modalContent.appendChild(row);

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
