window.$ = window.jQuery = require('../../plugins/jquery/jquery-3.3.1.min.js');
require('../../plugins/chart.js/Chart.bundle.min.js');
require('../../plugins/datatables/datatables.min.js')(window, $);
require('../../plugins/materialize/js/materialize.min.js');
require('../../plugins/air-datepicker/js/datepicker.min.js');
require('../../plugins/air-datepicker/js/i18n/datepicker.fr');
require('../../plugins/rater.js/rater.min.js');


const Database = require('../../database/DatabaseV2.js');
const Constants = require('../../constants/constants.js');
const Utils = require('../../utils/Utils.js');
const Sidenav = require('../../utils/Sidenav.js');
const Rating = require('../../utils/Rating.js');
const Hebergement = require('../models/Hebergement');
const Chambre = require('../models/Chambre');
const Client = require('../models/Client');
const CentralesReservation = require('../models/CentralesReservation');
const Voyages = require('../models/Voyage');
const Transactions = require('../models/Transactions');
const Notoriete = require('../models/Notoriete');
const Cleaning = require('../models/Cleaning');
const Maintenance = require('../models/Maintenance');

// Session Storage
const storedRole = Utils.getStoredRole();
const storedEmploye = Utils.getStoredEmploye();
const storedUser = Utils.getStoredUser();
const storedService = Utils.getStoredService();
const viewName = Utils.getViewName(window.location.href);
const db = new Database();

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
  const voyages = new Voyages();
  const transactions = new Transactions();
  const notoriete = new Notoriete();
  const cleaning = new Cleaning();
  const maintenance = new Maintenance();

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
  let drawLineChart = () => {
  };
  let drawDoughnutChart = () => {
  };
  let fetchAmountAvailableRooms = () => {
  };
  let fetchReservationsLastSevenDays = () => {
  };
  let fetchWeeklyValues = () => {
  };
  let fetchAmountOfRoomTypeFilled = () => {
  };
  let registerNewMaintenanceDemand = () => {
  };
  let registerNewNettoyageDemand = () => {
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
  let saveNotoriete = () => {
  };
  let reloadCurrentPage = () => {
  };
  let updateLine = () => {
  };
  let deleteLine = () => {
  };
  let createLine = () => {
  };
  let openEditModal = () => {
  };
  let openDeleteModal = () => {
  };
  let drawDataTable = () => {
  };
  let fetchALlTransactions = () => {
  };

  // -----------------------------------------------------------------------------------------

  switch (viewName) {
    case 'dashboard_reception': {
      /**
       * Draws a line chart with the data given
       * @function
       * @param {string} title
       * @param labels - ['', '', '', ...]
       * @param data - [1, 2, 3, ...]
       * @param {string} tooltipLabel
       */
      drawLineChart = (title, labels, data, tooltipLabel) => {
        const elLineChart = document.getElementById('lineChart').getContext('2d');
        lineChart = new Chart(elLineChart, {
          type: 'line',
          data: {
            labels,
            datasets: [{
              label: tooltipLabel,
              data,
              backgroundColor: '#26a69a',
              borderColor: '#ffffff',
              borderWidth: 0,
            }],
          },
          options: {
            title: {display: true, text: title},
            legend: {display: false},
            maintainAspectRatio: false,
            spanGaps: false,
            elements: {line: {tension: 0.4}, point: {radius: 2, hitRadius: 8, hoverRadius: 8}},
            plugins: {filler: {propagate: false}},
            scales: {yAxes: [{display: false, ticks: {beginAtZero: true}}], xAxes: [{display: false}]},
          },
        });
      };

      /**
       * Draws a doughnut chart with the data given
       * @function
       * @param {string} title
       * @param labels - ['', '', '', ...]
       * @param data - [1, 2, 3, ...]
       * @param {string} tooltipLabel
       */
      drawDoughnutChart = (title, labels, data, tooltipLabel) => {
        const elDoughnutChart = document.getElementById('doughnutChart');
        doughnutChart = new Chart(elDoughnutChart, {
          type: 'doughnut',
          data: {
            labels,
            datasets: [{
              label: tooltipLabel, data, backgroundColor: ['rgb(75,176,167)', 'rgba(255, 206, 86, 1)'], borderWidth: 2,
            }],
          },
          options: {
            title: {display: true, text: title},
            legend: {display: true, position: 'right'},
            maintainAspectRatio: true,
            spanGaps: false,
            plugins: {filler: {propagate: false}},
            scales: {yAxes: [{display: false, ticks: {beginAtZero: true}}], xAxes: [{display: false}]},
          },
        });
      };

      /**
       * Retrieves the amount of reservations for the last seven days
       * @function
       */
      fetchReservationsLastSevenDays = () => {
        // We create an object with the last seven dates and initialized at 0
        const objectLastSevenDays = [];
        let lastSenveDays = hebergement.getFormattedPeriod(new Date(), 7);
        lastSenveDays = lastSenveDays.split('\'').join('');
        lastSenveDays = lastSenveDays.split(',');
        for (let i = 0; i < lastSenveDays.length; i += 1) {
          objectLastSevenDays.push({label: lastSenveDays[i], data: 0});
        }
        // We retrieve the number of reservations from the last 7 days
        hebergement.getLastSevenDaysReservations((results) => {
          const labels = [];
          const data = [];
          results.forEach(row => {
            const index = objectLastSevenDays.map(e => e.label).indexOf(row.label);
            objectLastSevenDays[index] = row;
          });
          for (let line of objectLastSevenDays) {
            labels.push(line.label);
            data.push(line.data);
          }
          drawLineChart('Nb réservations derniers 7 jours', labels, data, 'reservations');
        });
      };

      /**
       * Retrieves the amount of available rooms in the hotel
       * @function
       */
      fetchAmountAvailableRooms = () => {
        hebergement.getCountOccupiedRooms((result) => {
          const qtyOccupiedRooms = result[0].nbOccupiedRooms;
          const qtyFreeRooms = Constants.totalRooms - result[0].nbOccupiedRooms;
          drawDoughnutChart('Disponibilité chambres', ['Occupés', 'Libres'], [qtyOccupiedRooms, qtyFreeRooms], 'chambres');
        });
      };

      /**
       * Retrieves the values (income, turnover)
       * @function
       */
      fetchWeeklyValues = () => {
        transactions.getLastWeekIncome('Room_Reservation', (lastWeekIncome) => {
          transactions.getWeekIncome('Room_Reservation', (weekIncome) => {
            const turnover = weekIncome[0].income;
            const profit = turnover - lastWeekIncome[0].income;
            const $profit = $('#profit');
            $('#chiffresAffaires').html(turnover);
            $profit.html(profit);
            if (profit > 0) {
              $profit.html(`+ ${profit}`);
              $profit.attr('class', 'trending-up');
              $('#curveIncome').html('<i class="material-icons trending-up">trending_up</i>');
            } else {
              $profit.html(`- ${profit}`);
              $profit.attr('class', 'trending-down');
              $('#curveIncome').html('<i class="material-icons trending-down">trending_down</i>');
            }
            hebergement.getCountOccupiedRooms((qtyOccupiedRooms) => {
              const percentageOccupiedRooms = (qtyOccupiedRooms[0].nbOccupiedRooms * 100) / Constants.totalRooms;
              $('#occupiedRoomsPercent').html(percentageOccupiedRooms);
              $('#totalAmountRooms').html(Constants.totalRooms);
            });
          });
        });
      };

      /**
       * Retrieves the filled values of each room type and the amount of room type in the hotel
       * @function
       */
      fetchAmountOfRoomTypeFilled = () => {
        hebergement.getCountTotalRoomsByType('simple', (totalSimple) => {
          $('#totalSimple').html(totalSimple[0].nbRooms);
          hebergement.getCountSimpleOccupiedRooms((occupiedSimple) => {
            $('#occupiedSimple').html(occupiedSimple[0].nbOccupiedSimpleRooms);
          });
        });
        hebergement.getCountTotalRoomsByType('double', (totalDouble) => {
          $('#totalDouble').html(totalDouble[0].nbRooms);
          hebergement.getCountDoubleOccupiedRooms((occupiedDouble) => {
            $('#occupiedDouble').html(occupiedDouble[0].nbOccupiedDoubleRooms);
          });
        });
        hebergement.getCountTotalRoomsByType('suite', (totalSuite) => {
          $('#totalSuite').html(totalSuite[0].nbRooms);
          hebergement.getCountSuiteOccupiedRooms((occupiedSuite) => {
            $('#occupiedSuite').html(occupiedSuite[0].nbOccupiedSuiteRooms);
          });
        });
      };

      registerNewMaintenanceDemand = () => {
        const formData = $('form#formDemandeMaintenance').serializeArray();
        const demandData = [];
        $.each(formData, (i, field) => {
          demandData[field.name] = field.value;
        });
        maintenance.write(
          demandData.titreDemandeMaintenance,
          demandData.descDemandeMaintenance,
          demandData.prioDemandeMaintenance,
          demandData.deadlineDemandeMaintenance,
          false,
          () => {},
        );
      };

      registerNewNettoyageDemand = () => {
        const formData = $('form#formDemandeNettoyage').serializeArray();
        const demandData = [];
        $.each(formData, (i, field) => {
          demandData[field.name] = field.value;
        });
        cleaning.write(
          demandData.titreDemandeNettoyage,
          demandData.descDemandeNettoyage,
          demandData.prioDemandeNettoyage,
          demandData.deadlineDemandeNettoyage,
          false,
          () => {},
        );
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
        const price = $button.data('price');
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
                hebergement.reserveRoomByPeriod(id_room, clients[0].id_client, dateDebut, dateFin, price, () => {
                  window.location.replace(`./gerer_chambre.html?id_room=${id_room}`);
                });
              } else {
                hebergement.reserveRoomByDate(id_room, clients[0].id_client, dateDebut, price, () => {
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
            data-price="${price}" class="waves-effect waves-green btn-small green">Réserver</button>
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
    case 'gerer_notoriete': {
      /**
       * Saves the comments from the client
       * @function
       */
      saveNotoriete = () => {
        const formData = $('form#formNotoriete').serializeArray();
        const notorieteData = [];
        $.each(formData, (i, field) => {
          notorieteData[field.name] = field.value;
        });
        console.log(notorieteData);
        notoriete.getClientIdByEmailOrPhone(notorieteData.email, notorieteData.number, (result) => {
          console.log(result[0].id_client);
          notoriete.write(
            notoriete.rating_room,
            notoriete.rating_services,
            notoriete.rating_restaurant,
            notoriete.rating_events,
            notorieteData.comments,
            result[0].id_client,
            (lastID) => {
              console.log(lastID);
            },
          );
        });
      };
      break;
    }
    case 'encaisser_client': {
      break;
    }
    case 'gerer_facturation': {
      /**
       * Reload the current page
       * @callback
       */
      reloadCurrentPage = () => {
        window.location.assign('./gerer_facturation.html');
      };

      /**
       * Updates the current line and reloads the current page
       * @callback
       * @param e - Calling element
       */
      updateLine = (e) => {
        const cellPKColumnName = e.target.dataset.cle;
        const cellPKId = e.target.dataset.id;
        const modalContent = document.body.querySelector('#modal-content-edit');
        const allColumns = [];
        const allNewValues = [];
        modalContent.querySelectorAll('input').forEach(input => {
          allColumns.push(input.dataset.column);
          allNewValues.push(input.value);
        });
        db.rewrite('Transactions', allColumns, allNewValues, cellPKColumnName, cellPKId, reloadCurrentPage);
      };

      /**
       * Deletes the current line and reloads the current page
       * @callback
       * @param e - Calling element
       */
      deleteLine = (e) => {
        const cellPKColumnName = e.target.dataset.cle;
        const cellPKId = e.target.dataset.id;
        db.deleteRow('Transactions', cellPKColumnName, cellPKId, reloadCurrentPage);
      };

      /**
       * Creates a new line in database and reloads the current page
       * @callback
       */
      createLine = () => {
        const rowWithNewValues = document.body.querySelector('.dataTables_scrollFoot tfoot tr');
        const columnNames = [];
        const newValues = [];
        rowWithNewValues.querySelectorAll('input').forEach((input) => {
          columnNames.push(input.dataset.column);
          newValues.push(input.dataset.value);
        });
        db.write('Transactions', columnNames, newValues, reloadCurrentPage);
      };

      /**
       * Toggles the Edit Modal
       * @callback
       * @param e
       */
      openEditModal = (e) => {
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
        thead.childNodes.forEach((th) => {
          if (th.className !== 'sorting_disabled') {
            const label = document.createElement('label');
            label.innerHTML = th.innerHTML;
            keys.push(th.innerHTML);
          }
        });

        // we retrieve the current data
        selectedRow.childNodes.forEach((td) => {
          if (td.className !== 'edit-cell' && td.className !== 'del-cell') {
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
        buttonAgree.addEventListener('click', updateLine);
        modalFooter.appendChild(buttonAgree);

        // we open the modal
        $(document).ready(() => {
          $('.modal').modal();
          $('.modal').modal('open');
        });
      };

      /**
       * Toggles the Delete Modal
       * @callback
       * @param e
       */
      openDeleteModal = (e) => {
        const cellPKColumnName = e.target.dataset.cle;
        const cellPKId = e.target.dataset.id;

        const modalContent = document.body.querySelector('#modal-content-edit');
        modalContent.innerHTML = 'You sure you want to delete this line ?'; // we empty the modal-content

        const modalFooter = document.body.querySelector('#modal-footer-edit');
        modalFooter.innerHTML = ''; // we empty the modal-footer

        const buttonAgree = document.createElement('a');
        buttonAgree.href = '#!';
        buttonAgree.className = 'modal-close waves-effect waves-green btn red';
        buttonAgree.innerHTML = 'Delete';
        buttonAgree.dataset.cle = cellPKColumnName;
        buttonAgree.dataset.id = cellPKId;
        buttonAgree.addEventListener('click', deleteLine);
        modalFooter.appendChild(buttonAgree);

        // we open the modal
        $(document).ready(() => {
          $('.modal').modal();
          $('.modal').modal('open');
        });
      };

      /**
       * Draws the dataTable with the data fetched form the database
       * @callback
       * @param result
       */
      drawDataTable = (result) => {
        const table = document.body.querySelector('#edit-table');

        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');
        const tfoot = document.createElement('tfoot');
        let theadDefined = false;

        result.forEach((row) => {
          // THEAD
          if (!theadDefined) {
            const theadRow = document.createElement('tr');
            const tfootRow = document.createElement('tr');

            // add delete and modify buttons
            const thVideEdit = document.createElement('th');
            theadRow.appendChild(thVideEdit);
            const thVideDel = document.createElement('th');
            theadRow.appendChild(thVideDel);

            const thVide = document.createElement('th');
            tfootRow.appendChild(thVide);
            const thNew = document.createElement('th');
            thNew.innerHTML = `
              <div class="btn green">
                <i class="material-icons">add</i>
              </div>`;
            thNew.addEventListener('click', createLine);
            tfootRow.appendChild(thNew);

            // add all the columns headers
            Object.keys(row).forEach((columnName) => {
              const th = document.createElement('th');
              th.innerHTML = columnName;
              theadRow.appendChild(th);

              const td2 = document.createElement('td');
              td2.innerHTML = `<input type="text" 
                placeholder="${columnName}"
                data-column="${columnName}"
                onkeyup="this.dataset.value = this.value"
                class="validate">`;
              tfootRow.appendChild(td2);
            });

            thead.appendChild(theadRow);
            tfoot.appendChild(tfootRow);
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
            stateSave: true,
            scrollX: true,
            order: [[2, 'asc']],
            columnDefs: [{
              targets: [0, 1],
              orderable: false,
            }],
            dom: '<"toolbar">frtip',
            initComplete: () => {},
          });
          $('div.toolbar').html(`<b>Table: ${'Transactions'}</b>`);
        });
      };

      /**
       * Returns all the transactions
       * @function
       */
      fetchALlTransactions = () => {
        transactions.getAllTransactions(drawDataTable);
      };
      break;
    }
    case 'gerer_services_divers': {
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
    case 'dashboard_reception': {
      $('#boutonReserverChambre').on('click', () => {
        window.location.replace('../hebergement/gerer_reservations.html');
      });
      $('#boutonEncaisserClient').on('click', () => {
        window.location.replace('../reception/encaisser_client.html');
      });
      $('#boutonGestionFacturation').on('click', () => {
        window.location.replace('../reception/gerer_facturation.html');
      });
      $('#boutonNewDemandeMaintenance').on('click', registerNewMaintenanceDemand);
      $('#boutonNewDemandeNettoyage').on('click', registerNewNettoyageDemand);
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
    case 'gerer_notoriete': {
      $('.rating').on('change', (ev, data) => {
        const column = ev.target.dataset.column;
        if (column === 'room') {
          notoriete.rating_room = data.to;
        } else if (column === 'services') {
          notoriete.rating_services = data.to;
        } else if (column === 'restaurant') {
          notoriete.rating_restaurant = data.to;
        } else if (column === 'events') {
          notoriete.rating_events = data.to;
        }
      });
      $('#boutonSaveCommentaire').on('click', saveNotoriete);
      break;
    }
    case 'encaisser_client': {
      break;
    }
    case 'gerer_facturation': {
      break;
    }
    case 'gerer_services_divers': {
      break;
    }
    default: {
      break;
    }
  }


  // ############################################################################################# //
  // #######################################    MAIN    ########################################## //
  // ############################################################################################# //

  console.log(`@ROUTE : /reception/${viewName}.html`);
  // ACTION MANAGER
  switch (viewName) {
    case 'dashboard_reception': {
      fetchReservationsLastSevenDays();
      fetchAmountAvailableRooms();
      fetchWeeklyValues();
      fetchAmountOfRoomTypeFilled();
      $(document).ready(() => $('select').formSelect());
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
    case 'gerer_notoriete': {
      $('.rating').rate({
        max_value: 5,
        step_size: 0.5,
        initial_value: 0,
      });
      break;
    }
    case 'encaisser_client': {
      break;
    }
    case 'gerer_facturation': {
      fetchALlTransactions();
      break;
    }
    case 'gerer_services_divers': {
      break;
    }
    default: {
      console.log('View not found! No action executed!');
    }
  }
});
