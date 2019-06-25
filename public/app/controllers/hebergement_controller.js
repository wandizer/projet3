window.$ = window.jQuery = require('../../plugins/jquery/jquery-3.3.1.min.js');
require('../../plugins/chart.js/Chart.bundle.min.js');
require('../../plugins/materialize/js/materialize.min.js');
require('../../plugins/air-datepicker/js/datepicker.min.js');
require('../../plugins/air-datepicker/js/i18n/datepicker.fr');

const Utils = require('../../utils/Utils.js');
const Sidenav = require('../../utils/Sidenav.js');
const Hebergement = require('../models/Hebergement');
const Chambre = require('../models/Chambre');
const Client = require('../models/Client');
const CentralesReservation = require('../models/CentralesReservation');

// Session Storage
const storedRole = Utils.getStoredRole();
const storedEmploye = Utils.getStoredEmploye();
const storedUser = Utils.getStoredUser();
const storedService = Utils.getStoredService();
const viewName = Utils.getViewName(window.location.href);

document.addEventListener('DOMContentLoaded', () => {
  Sidenav.drawSidenav(storedRole.name, viewName, storedEmploye.name, storedEmploye.surname);
});

window.addEventListener('load', () => {
  // ############################################################################################# //
  // ####################################    VARIABLES    ######################################## //
  // ############################################################################################# //

  let doughnutChart;
  let lineChart;
  let datepicker;
  let calendar;
  let isRange = false;
  const today = new Date();
  const todaysMonth = (`${today.getMonth() + 1}`.length === 1) ? `0${today.getMonth() + 1}` : today.getMonth() + 1;
  let globalFormattedDate = `${today.getDate()}/${todaysMonth}/${today.getFullYear()}`;

  const hebergement = new Hebergement();
  const chambre = new Chambre();
  const client = new Client();
  const centralesReservation = new CentralesReservation();

  const defaultEmptyContent = `
    <div class="nothing-found">
      <i class="material-icons">warning</i><p>Rien trouvé</p>
    </div>`;

  // ############################################################################################# //
  // #############################    FUNCTIONS / CALLBACKS    ################################### //
  // ############################################################################################# //

  let fetchReservations = () => {
  };
  let drawFreeRooms = () => {
  };
  let drawOccupiedRooms = () => {
  };
  let drawStatisticsCharts = () => {
  };
  let drawDatepicker = () => {
  };
  let clearReservationPage = () => {
  };
  let fetchRoomDetails = () => {
  };
  let drawRoomDetails = () => {
  };
  let fetchRoomReservations = () => {
  };
  let drawRoomCalendar = () => {
  };
  let drawModalReservation = () => {
  };
  let reserveRoom = () => {
  };
  let drawRoomsList = () => {
  };
  let buildModalCentraleReservation = () => {
  };
  let modifierCentraleReservation = () => {
  };
  let openModalModificationCentrale = () => {
  };
  let deleteCentraleReservation = () => {
  };
  let openModalDeleteCentrale = () => {
  };
  let addCentraleReservation = () => {
  };
  let drawCentralsOfReservation = () => {
  };

  // -----------------------------------------------------------------------------------------

  switch (viewName) {
    case 'dashboard_hebergement': {
      /**
       * Draws all the charts necessary for the statistics on the dashboard
       * @function
       */
      drawStatisticsCharts = () => {
        const elDoughnutChart = document.getElementById('doughnutChart');
        doughnutChart = new Chart(elDoughnutChart, {
          type: 'doughnut',
          data: {
            labels: ['Occupés', 'Libres'],
            datasets: [{
              label: 'Chambres',
              data: [47, 13],
              backgroundColor: [
                'rgb(75,176,167)',
                'rgba(255, 206, 86, 1)',
              ],
              borderWidth: 2,
            }],
          },
          options: {
            title: { display: true, text: 'Chambres :' },
            legend: { display: true, position: 'right' },
            maintainAspectRatio: true,
            spanGaps: false,
            plugins: { filler: { propagate: false } },
            scales: { yAxes: [{ display: false, ticks: { beginAtZero: true } }], xAxes: [{ display: false }] },
          },
        });
        const elLineChart = document.getElementById('lineChart').getContext('2d');
        lineChart = new Chart(elLineChart, {
          type: 'line',
          data: {
            labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
            datasets: [{
              label: 'Nº de clients',
              data: [12, 15, 10, 9, 10, 7, 10],
              backgroundColor: '#26a69a',
              borderColor: '#ffffff',
              borderWidth: 0,
            }],
          },
          options: {
            title: { display: true, text: 'Activité de la semaine :' },
            legend: { display: false },
            maintainAspectRatio: false,
            spanGaps: false,
            elements: { line: { tension: 0.4 }, point: { radius: 2, hitRadius: 8, hoverRadius: 8 } },
            plugins: { filler: { propagate: false } },
            scales: { yAxes: [{ display: false, ticks: { beginAtZero: true } }], xAxes: [{ display: false }] },
          },
        });
      };
      break;
    }
    case 'gerer_reservations': {
      /**
       * Voids the two containers inside the 'Gérer Reservations' page
       * @function
       */
      clearReservationPage = () => {
        $('#currentDate').html('');
        $('#freeRooms').html(defaultEmptyContent);
        $('#amountFreeRooms').html('(0)');
        $('#occupiedRooms').html(defaultEmptyContent);
        $('#amountOccupiedRooms').html('(0)');
      };

      /**
       * Permet de reserver une chambre avec les données du client
       * @function
       */
      reserveRoom = (e) => {
        const $button = $(e.target);
        const id_room = $button.data('id-room');
        const dateDebut = (isRange) ? globalFormattedDate.split(',')[0] : globalFormattedDate;
        const dateFin = (isRange) ? globalFormattedDate.split(',')[1] : globalFormattedDate;
        const formData = $('form#formReservation').serializeArray();
        const clientData = [];
        $.each(formData, (i, field) => {
          clientData[field.name] = field.value;
        });

        if (clientData.clientName !== ''
          && clientData.clientSurname !== ''
          && clientData.clientEmail !== ''
          && clientData.clientPhone !== '') {
          client.checkClientExists(clientData.clientEmail, clientData.clientPhone, (clients) => {
            if (clients.length === 1) {
              if (isRange) {
                hebergement.reserveRoomByPeriod(id_room, clients[0].id_client, dateDebut, dateFin, () => {
                  window.location.replace(`./gerer_chambre.html?id_room=${id_room}`);
                });
              } else {
                hebergement.reserveRoomByDate(id_room, clients[0].id_client, dateDebut, () => {
                  window.location.replace(`./gerer_chambre.html?id_room=${id_room}`);
                });
              }
            } else {
              client.write(
                clientData.clientName, clientData.clientSurname, clientData.clientEmail, clientData.clientPhone,
                () => {
                  client.getClientByEmail(clientData.clientEmail, (client) => {
                    if (isRange) {
                      hebergement.reserveRoomByPeriod(id_room, client[0].id_client, dateDebut, dateFin, () => {
                        window.location.replace(`./gerer_chambre.html?id_room=${id_room}`);
                      });
                    } else {
                      hebergement.reserveRoomByDate(id_room, client[0].id_client, dateDebut, () => {
                        window.location.replace(`./gerer_chambre.html?id_room=${id_room}`);
                      });
                    }
                  });
                },
              );
            }
          });
          // button 'en cours'
          $button.removeClass('green');
          $button.addClass('blue');
          $button.html('En cours...');
        }
      };

      /**
       * Responsible for drawing the reservation modal
       * @function
       * @param e - Event
       */
      drawModalReservation = (e) => {
        const id_room = e.target.dataset.id;
        const price = e.target.dataset.price;
        const $modalReservation = $('.modal-reservation');
        const dateDebut = (isRange) ? globalFormattedDate.split(',')[0] : globalFormattedDate;
        const dateFin = (isRange) ? globalFormattedDate.split(',')[1] : globalFormattedDate;

        $modalReservation.html(`
          <div class="modal-content">
            <h4>Formulaire de réservation</h4>
            <div class="row">
              <form class="col s12" id="formReservation">
                <div class="row">
                  <div class="input-field col s6">
                    <input id="clientName" name="clientName" type="text" class="validate">
                    <label for="clientName">Prénom</label>
                  </div>
                  <div class="input-field col s6">
                    <input id="clientSurname" name="clientSurname" type="text" class="validate">
                    <label for="clientSurname">Nom</label>
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s12">
                    <input id="clientEmail" name="clientEmail" type="email" class="validate">
                    <label for="clientEmail">Email</label>
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s6">
                    <input id="clientPhone" name="clientPhone" type="tel" class="validate">
                    <label for="clientPhone">Téléphone</label>
                  </div>
                  <div class="input-field col s6">
                    <p>
                      <label>
                        <input id="radioCB" name="typePaiement" type="radio" checked />
                        <span for="radioCB">Carte bancaire</span>
                      </label>
                    </p>
                    <p>
                      <label>
                        <input id="radioCheque" name="typePaiement" type="radio" />
                        <span for="radioCheque">Chéques</span>
                      </label>
                    </p>
                    <p>
                      <label>
                        <input id="radioEspeces" name="typePaiement" type="radio" />
                        <span for="radioEspeces">Espèces</span>
                      </label>
                    </p>
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s6">
                    <input disabled value="${dateDebut}" id="reservationDateDebut" type="text" class="validate">
                    <label for="reservationDateDebut" class="active">Date début</label>
                  </div>
                  <div class="input-field col s6">
                    <input disabled value="${dateFin}" id="reservationDatefin" type="text" class="validate">
                    <label for="reservationDatefin" class="active">Date fin</label>
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s12">
                    <input disabled value="${price}" id="roomPrice" name="roomPrice" type="number" class="validate">
                    <label for="roomPrice" class="active">Prix (€)</label>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" id="modalButtonReserver" data-id-room="${id_room}"
            class="waves-effect waves-green btn-small green">Réserver</button>
          </div>
        `);
        $('#modalButtonReserver').on('click', reserveRoom);
        $modalReservation.modal('open');
      };

      /**
       * Draws all the free rooms retrieved inside the free rooms container in the page
       * @function
       * @param rooms
       */
      drawFreeRooms = (rooms) => {
        const $cardFreeRooms = $('#freeRooms');
        // console.log('Free Rooms : ', rooms);
        $cardFreeRooms.html('');
        $('#amountFreeRooms').html(`(${rooms.length})`);
        if (rooms.length) {
          rooms.forEach((room) => {
            $cardFreeRooms.append(
              `<div class="erpion-rows__row">
                <i class="material-icons">hotel</i>
                <div class="erpion-rows__row-element">
                  <div class="green-dot"></div>
                </div>
                <div class="erpion-rows__row-element">
                  <label style="margin-right: 5px">Nº</label>
                  <span>${room.number}</span>
                </div>
                <div class="erpion-rows__row-element">
                  <label style="margin-right: 5px">Etage:</label>
                  <span>${room.floor}</span>
                </div>
                <div class="erpion-rows__row-element">
                  <label style="margin-right: 5px">Type:</label>
                  <span class="chambre-type">${room.type}</span>
                </div>
                <div class="erpion-rows__row-element">
                  <label style="margin-right: 5px">Prix:</label>
                  <span class="chambre-details">${room.price} €</span>
                </div>
                <button type="button" class="btn-small green" 
                id="buttonReserver${room.id_room}" data-id="${room.id_room}"
                data-price="${room.price}">Reserver</button>
              </div>`,
            );
            $(`#buttonReserver${room.id_room}`).on('click', drawModalReservation);
          });
        } else {
          $cardFreeRooms.html(defaultEmptyContent);
        }
      };

      /**
       * Draws all the occupied rooms retrieved inside the occupied rooms container in the page
       * @function
       * @param rooms
       */
      drawOccupiedRooms = (rooms) => {
        const $cardOccupiedRooms = $('#occupiedRooms');
        // console.log('Occupied Rooms : ', rooms);
        $cardOccupiedRooms.html('');
        $('#amountOccupiedRooms').html(`(${rooms.length})`);
        if (rooms.length) {
          rooms.forEach((room) => {
            $cardOccupiedRooms.append(
              `<div class="erpion-rows__row">
                <i class="material-icons">hotel</i>
                <div class="erpion-rows__row-element">
                  <div class="red-dot"></div>
                </div>
                <div class="erpion-rows__row-element">
                  <label style="margin-right: 5px">Nº</label>
                  <span>${room.number}</span>
                </div>
                <div class="erpion-rows__row-element">
                  <label style="margin-right: 5px">Etage:</label>
                  <span>${room.floor}</span>
                </div>
                <div class="erpion-rows__row-element">
                  <label style="margin-right: 5px">Type:</label>
                  <span class="chambre-type">${room.type}</span>
                </div>
                <div class="erpion-rows__row-element">
                  <label style="margin-right: 5px">Periode:</label>
                  <span class="chambre-details">${room.date_arrival} - ${room.date_depart}</span>
                </div>
                <a class="btn-small red" href="./gerer_chambre.html?id_room=${room.id_room}">Réservé</a>
              </div>`,
            );
          });
        } else {
          $cardOccupiedRooms.html(defaultEmptyContent);
        }
      };

      /**
       * Retrieves all the reservations after selecting a date or period on air-datepicker
       * @function
       * @param formattedDate
       * @param date
       * @param picker
       */
      fetchReservations = (formattedDate, date, picker) => {
        // Do nothing if selection was cleared
        if (!date) return;
        // We clear the reservations from the page (to avoid duplications)
        clearReservationPage();
        // we store the formattedDate globally;
        globalFormattedDate = formattedDate;
        // If period or else if day
        if (picker.opts.range) {
          // While period, only act if both were selected
          if (picker.minRange && picker.maxRange && formattedDate.indexOf(',') > 0) {
            const minRangeDate = formattedDate.split(',')[0];
            const maxRangeDate = formattedDate.split(',')[1];
            // We show the Day/period selected on the title
            $('#currentDate').html(`${minRangeDate}<label> jusqu'à </label>${maxRangeDate}`);
            // We retrieve and fill the free and occupied rooms in the page
            hebergement.getAllOccupiedRoomsByPeriod(minRangeDate, maxRangeDate, drawOccupiedRooms);
            hebergement.getAllFreeRoomsByPeriod(minRangeDate, maxRangeDate, drawFreeRooms);
          }
        } else {
          // We show the Day/period selected on the title
          $('#currentDate').html(formattedDate);
          // We retrieve and fill the free and occupied rooms in the page
          // hebergement.getAllOccupiedRoomsByDate(formattedDate, drawOccupiedRooms);
          // hebergement.getAllFreeRoomsByDate(formattedDate, drawFreeRooms);
          hebergement.getAllOccupiedRoomsByDate(formattedDate, drawOccupiedRooms);
          hebergement.getAllFreeRoomsByDate(formattedDate, drawFreeRooms);
        }
      };

      /**
       * Draws the Air-Datepicker for managing the reservations, in order to access all the free and occupied rooms
       * @function
       */
      drawDatepicker = () => {
        datepicker = $('.datepicker-here').datepicker({
          language: 'fr',
          minDate: new Date(), // Now can select only dates, which goes after today
          range: false,
          todayButton: true,
          clearButton: true,
          onSelect: fetchReservations,
        }).data('datepicker');
      };
      break;
    }
    case 'gerer_chambre': {
      /**
       * Retrieves the current room details
       * @function
       * @param idRoom
       */
      fetchRoomDetails = (idRoom) => {
        chambre.getRoomDetails(idRoom, drawRoomDetails);
      };

      /**
       * Inserts the current room details into the page
       * @function
       * @param results
       */
      drawRoomDetails = (results) => {
        $('#room-description-number').html(results[0].number);
        $('#room-description-type').html(results[0].type);
        $('#room-description-floor').html(results[0].floor);
        $('#room-description-price').html(results[0].price);
      };

      /**
       * Retrieves all the reservations for this room in order to draw them into the calendar
       * later
       * @function
       * @param idRoom
       */
      fetchRoomReservations = (idRoom) => {
        chambre.getReservationsByRoom(idRoom, (results) => {
          chambre.reservations = results;
          const events = [];
          results.forEach((row) => {
            events.push({
              title: `Client: ${row.name} ${row.surname}`,
              start: `${row.date_arrival.split('/')[2]}-${row.date_arrival.split('/')[1]}-${row.date_arrival.split('/')[0]}`,
              end: `${row.date_depart.split('/')[2]}-${row.date_depart.split('/')[1]}-${row.date_depart.split('/')[0]}`,
              color: (row.active) ? '#26a69a' : '#8e9ea6',
              editable: false,
              overlap: false,
              allDay: true,
            });
          });
          drawRoomCalendar(events);
        });
      };

      /**
       * Responsible for drawing the FullCalendar for the current room (inside 'Gérer Chambre')
       * @function
       * @param events
       */
      drawRoomCalendar = (events) => {
        const calendarEl = document.getElementById('calendar');
        calendar = new FullCalendar.Calendar(calendarEl, {
          // plugins: [ interactionPlugin, dayGridPlugin, timeGridPlugin ],
          plugins: ['dayGrid', 'timeGrid', 'interaction'],
          selectable: true,
          timeZone: 'local',
          defaultDate: new Date(),
          header: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth',
          },
          events,
          dateClick(info) {
            // alert('clicked ' + info.dateStr);
            console.log(`clicked ${info.dateStr}`);
          },
          select(info) {
            // alert('selected ' + info.startStr + ' to ' + info.endStr);
            console.log(`selected ${info.startStr} to ${info.endStr}`);
          },
        });
        calendar.render();
      };
      break;
    }
    case 'gerer_voyages': {
      break;
    }
    case 'gerer_notoriete': {
      break;
    }
    case 'liste_chambres': {
      /**
       * Responsible for drawing the rooms' list
       * @function
       */
      drawRoomsList = () => {
        const $roomsListElement = $('#roomsList');
        hebergement.getAllFreeRooms((freeRooms) => {
          $roomsListElement.html('');
          freeRooms.forEach((room) => {
            $roomsListElement.append(
              `<div class="erpion-rows__row">
                <i class="material-icons">hotel</i>
                <div class="erpion-rows__row-element">
                  <div class="green-dot"></div>
                </div>
                <div class="erpion-rows__row-element">
                  <label style="margin-right: 5px">Nº</label>
                  <span>${room.number}</span>
                </div>
                <div class="erpion-rows__row-element">
                  <label style="margin-right: 5px">Etage:</label>
                  <span>${room.floor}</span>
                </div>
                <div class="erpion-rows__row-element">
                  <label style="margin-right: 5px">Type:</label>
                  <span class="chambre-type">${room.type}</span>
                </div>
                <div class="erpion-rows__row-element">
                  <label style="margin-right: 5px">Prix:</label>
                  <span class="chambre-details">${room.price} €</span>
                </div>
                <a class="btn-small blue" href="./gerer_chambre.html?id_room=${room.id_room}">
                  Plus de détails</a>
              </div>`,
            );
          });
          hebergement.getAllOccupiedRooms((occupiedRooms) => {
            occupiedRooms.forEach((room) => {
              $roomsListElement.append(
                `<div class="erpion-rows__row">
                  <i class="material-icons">hotel</i>
                  <div class="erpion-rows__row-element">
                    <div class="red-dot"></div>
                  </div>
                  <div class="erpion-rows__row-element">
                    <label style="margin-right: 5px">Nº</label>
                    <span>${room.number}</span>
                  </div>
                  <div class="erpion-rows__row-element">
                    <label style="margin-right: 5px">Etage:</label>
                    <span>${room.floor}</span>
                  </div>
                  <div class="erpion-rows__row-element">
                    <label style="margin-right: 5px">Type:</label>
                    <span class="chambre-type">${room.type}</span>
                  </div>
                  <div class="erpion-rows__row-element">
                    <label style="margin-right: 5px">Prix:</label>
                    <span class="chambre-details">${room.price} €</span>
                  </div>
                  <a class="btn-small blue" href="./gerer_chambre.html?id_room=${room.id_room}">
                    Plus de détails</a>
                </div>`,
              );
            });
          });
        });
      };
      break;
    }
    case 'gerer_centrales_reservation': {

      /**
       * Default template for modification or creation of centrals of reservation
       * @function
       * @param {int} idCentrale
       * @param {string} nomCentrale
       * @param {string} websiteCentrale
       * @param {string} statusCentrale
       * @param {string} logoCentrale
       */
      buildModalCentraleReservation = (idCentrale, nomCentrale, websiteCentrale, statusCentrale, logoCentrale) => `
          <div class="modal-content">
            <h4>${(idCentrale) ? 'Modification' : 'Création'} centrale de réservation</h4>
            <div class="row">
              <form class="col s12" id="formModalCentraleReservation">
                <div class="row">
                  <div class="input-field col s6">
                    <input id="modalNomCentrale" name="modalNomCentrale"
                    value="${nomCentrale || ''}" type="text" class="validate">
                    <label for="modalNomCentrale" class="${(nomCentrale) ? 'active' : ''}">Nom</label>
                  </div>
                  <div class="input-field col s6">
                    <input id="modalWebsiteCentrale" name="modalWebsiteCentrale"
                    value="${websiteCentrale || ''}" type="text" class="validate">
                    <label for="modalWebsiteCentrale" class="${(websiteCentrale) ? 'active' : ''}">Website</label>
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s6">
                    <input id="modalLogoCentrale" name="modalLogoCentrale"
                    value="${logoCentrale || ''}" type="text" class="validate">
                    <label for="modalLogoCentrale" class="${(logoCentrale) ? 'active' : ''}">Logo</label>
                  </div>
                  <div class="input-field col s6">
                    <input id="modalStatusCentrale" name="modalStatusCentrale"
                    value="${statusCentrale || ''}" type="text" class="validate">
                    <label for="modalStatusCentrale" class="${(statusCentrale) ? 'active' : ''}">Status</label>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" id="${(idCentrale) ? `buttonModifyCentrale${idCentrale}` : 'buttonNewCentrale'}"
            data-id="${idCentrale || ''}" class="waves-effect waves-blue btn-small blue">${(idCentrale) ? 'Modifier' : 'Ajouter'}</button>
          </div>
        `;

      /**
       * Responsible for modifying the current central of reservation by reading the modal form
       * @function
       * @param e
       */
      modifierCentraleReservation = (e) => {
        const idCentrale = e.target.dataset.id;
        const $modalCentraleReservation = $('#modalCentraleReservation');
        const formData = $('form#formModalCentraleReservation').serializeArray();
        const centraleData = [];
        $.each(formData, (i, field) => {
          centraleData[field.name] = field.value;
        });
        centralesReservation.rewrite(
          idCentrale,
          centraleData.modalNomCentrale,
          centraleData.modalWebsiteCentrale,
          centraleData.modalStatusCentrale,
          centraleData.modalLogoCentrale,
          () => {
            drawCentralsOfReservation();
            $modalCentraleReservation.modal('close');
          },
        );
      };

      /**
       * Opens the modal with modification form inside of it
       * @function
       * @param e - Event
       */
      openModalModificationCentrale = (e) => {
        const idCentrale = e.target.dataset.id;
        const $modalCentraleReservation = $('#modalCentraleReservation');
        centralesReservation.getCentraleReservationById(idCentrale, (centrale) => {
          const modalHTML = buildModalCentraleReservation(
            centrale[0].id_centrales_reservation,
            centrale[0].nom,
            centrale[0].website,
            centrale[0].status,
            centrale[0].logo,
          );
          $modalCentraleReservation.html('');
          $modalCentraleReservation.append(modalHTML);
          $(`#buttonModifyCentrale${idCentrale}`).on('click', modifierCentraleReservation);
          $modalCentraleReservation.modal('open');
        });
      };

      /**
       * Responsible for deleting the central of reservation after confirmation
       * @function
       * @param e - Event
       */
      deleteCentraleReservation = (e) => {
        const idCentrale = e.target.dataset.id;
        const $modalCentraleReservation = $('#modalCentraleReservation');
        centralesReservation.deleteRow(idCentrale, () => {
          drawCentralsOfReservation();
          $modalCentraleReservation.modal('close');
        });
      };

      /**
       * Opens the modal with delete content inside
       * @function
       * @param e - Event
       */
      openModalDeleteCentrale = (e) => {
        const idCentrale = e.target.dataset.id;
        const $modalCentraleReservation = $('#modalCentraleReservation');
        $modalCentraleReservation.html(`
          <div class="modal-content">
            <div class="row"><p>Voulez-vous vraiment supprimer cette centrale de réservation ?</p></div>
            <div class="row"><label>(Cette action est irreversible!)</label></div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-small modal-close">Annuler</button>
            <button type="button" class="btn-small red" 
            data-id="${idCentrale}" id="buttonConfirmDeleteCentral${idCentrale}">Confirmer</button>
          </div>
        `);
        $(`#buttonConfirmDeleteCentral${idCentrale}`).on('click', deleteCentraleReservation);
        $modalCentraleReservation.modal('open');
      };

      /**
       * Adds a new central of reservation
       * @function
       */
      addCentraleReservation = () => {
        const formData = $('form#formAjouter').serializeArray();
        const centraleData = [];
        $.each(formData, (i, field) => {
          centraleData[field.name] = field.value;
        });
        console.log(centraleData);
        centralesReservation.write(
          centraleData.newNomCentral,
          centraleData.newWebsiteCentral,
          centraleData.newStatusCentral,
          centraleData.newLogoCentral,
          () => {
            drawCentralsOfReservation();
          },
        );
      };

      /**
       * Draws the list of all centrals of Reservation
       * @function
       */
      drawCentralsOfReservation = () => {
        centralesReservation.getAllCentralesReservation((centrales) => {
          const $listeCentralesElement = $('#listCentralesReservation');
          $listeCentralesElement.html('');
          centrales.forEach((centrale) => {
            $listeCentralesElement.append(`
            <div class="erpion-rows__row">
              <div class="erpion-rows__row-element">
                <img src="../../../assets/img/centrales_reservation/${centrale.logo}"
                     alt="${centrale.logo}" class="logo-centrale-reservation">
              </div>
              <div class="erpion-rows__row-element">
                <label style="margin-right: 5px">Nom:</label>
                <span>${centrale.nom}</span>
              </div>
              <div class="erpion-rows__row-element">
                <label style="margin-right: 5px">Site:</label>
                <span>${centrale.website}</span>
              </div>
              <div class="erpion-rows__row-element">
                <label style="margin-right: 5px">Status:</label>
                <span class="${(centrale.status === 'Disponible') ? 'green-text' : 'red-text'}">${centrale.status}</span>
              </div>
              <div class="erpion-rows__row-element">
                <button type="button" class="btn-small blue"
                          id="buttonModifierCentrale${centrale.id_centrales_reservation}" 
                          data-id="${centrale.id_centrales_reservation}"
                          style="margin-right: 10px">Modifier</button>
                <button type="button" class="btn-small red"
                        id="buttonSupprimerCentrale${centrale.id_centrales_reservation}"
                        data-id="${centrale.id_centrales_reservation}">Supprimer</button>
              </div>
            </div>
            `);
            $(`#buttonModifierCentrale${centrale.id_centrales_reservation}`).on('click', openModalModificationCentrale);
            $(`#buttonSupprimerCentrale${centrale.id_centrales_reservation}`).on('click', openModalDeleteCentrale);
          });
        });
      };
      break;
    }
    default: {
      break;
    }
  }

  // ############################################################################################# //
  // #################################    EVENT LISTENERS    ##################################### //
  // ############################################################################################# //

  switch (viewName) {
    case 'dashboard_hebergement': {
      break;
    }
    case 'gerer_reservations': {
      $('#optionOneDay').on('click', () => {
        datepicker.clear();
        datepicker.update('range', false);
        isRange = false;
      });
      $('#optionOnePeriod').on('click', () => {
        datepicker.clear();
        datepicker.update('range', true);
        isRange = true;
      });
      break;
    }
    case 'gerer_chambre': {
      break;
    }
    case 'gerer_voyages': {
      break;
    }
    case 'gerer_notoriete': {
      break;
    }
    case 'liste_chambres': {
      break;
    }
    case 'gerer_centrales_reservation': {
      $('#boutonAjouterCentrale').on('click', () => {
        addCentraleReservation();
      });
      break;
    }
    default: {
      break;
    }
  }


  // ############################################################################################# //
  // #######################################    MAIN    ########################################## //
  // ############################################################################################# //

  console.log(`@ROUTE : /hebergement/${viewName}.html`);
  // ACTION MANAGER
  switch (viewName) {
    case 'dashboard_hebergement': {
      drawStatisticsCharts();
      break;
    }
    case 'gerer_reservations': {
      drawDatepicker();
      hebergement.getAllOccupiedRoomsByDate(globalFormattedDate, drawOccupiedRooms);
      hebergement.getAllFreeRoomsByDate(globalFormattedDate, drawFreeRooms);
      $(document).ready(() => $('.modal-reservation').modal());
      break;
    }
    case 'gerer_chambre': {
      const params = Utils.getParams(window.location.href);
      fetchRoomDetails(params.id_room);
      fetchRoomReservations(params.id_room);
      break;
    }
    case 'gerer_voyages': {
      break;
    }
    case 'gerer_notoriete': {
      break;
    }
    case 'liste_chambres': {
      drawRoomsList();
      break;
    }
    case 'gerer_centrales_reservation': {
      drawCentralsOfReservation();
      $(document).ready(() => $('#modalCentraleReservation').modal());
      break;
    }
    default: {
      console.log('View not found! No action executed!');
    }
  }
});
