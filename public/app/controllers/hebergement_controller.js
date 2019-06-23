window.$ = window.jQuery = require('../../plugins/jquery/jquery-3.3.1.min.js');
require('../../plugins/chart.js/Chart.bundle.min.js');
require('../../plugins/materialize/js/materialize.min.js');
require('../../plugins/air-datepicker/js/datepicker.min.js');
require('../../plugins/air-datepicker/js/i18n/datepicker.fr');

const Utils = require('../../utils/Utils.js');
const Hebergement = require('../models/Hebergement');
const Chambre = require('../models/Chambre');
const Client = require('../models/Client');

const currentPage = Utils.getViewName(window.location.href);
const today = new Date();
const todaysMonth = (`${today.getMonth() + 1}`.length === 1) ? `0${today.getMonth() + 1}`  : today.getMonth() + 1;

window.addEventListener('load', () => {
  // ############################################################################################# //
  // ####################################    VARIABLES    ######################################## //
  // ############################################################################################# //

  let doughnutChart;
  let lineChart;
  let datepicker;
  let calendar;
  let isRange = false;
  let globalFormattedDate = `${today.getDate()}/${todaysMonth}/${today.getFullYear()}`;

  const hebergement = new Hebergement();
  const chambre = new Chambre();
  const client = new Client();

  const defaultEmptyContent = `
    <div class="nothing-found">
      <i class="material-icons">warning</i><p>Rien trouvé</p>
    </div>`;

  const defaultFreeRoomLine = `
    <div class="erpion-rows__row">
      <i class="material-icons">hotel</i>
      <div class="erpion-rows__row-element">
        <div class="green-dot"></div>
      </div>
      <div class="erpion-rows__row-element">
        <label style="margin-right: 5px">Nº</label>
        <span>{{ number }}</span>
      </div>
      <div class="erpion-rows__row-element">
        <label style="margin-right: 5px">Etage:</label>
        <span>{{ floor }}</span>
      </div>
      <div class="erpion-rows__row-element">
        <label style="margin-right: 5px">Type:</label>
        <span class="chambre-type">{{ type }}</span>
      </div>
      <div class="erpion-rows__row-element">
        <label style="margin-right: 5px">Prix:</label>
        <span class="chambre-details">{{ price }} €</span>
      </div>
      <a class="btn-small green" href="./gerer_chambre.html?id={{ id }}">Reserver</a>
    </div>`;

  const defaultOccupiedRoomLine = `
    <div class="erpion-rows__row">
      <i class="material-icons">hotel</i>
      <div class="erpion-rows__row-element">
        <div class="red-dot"></div>
      </div>
      <div class="erpion-rows__row-element">
        <label style="margin-right: 5px">Nº</label>
        <span>{{number}}</span>
      </div>
      <div class="erpion-rows__row-element">
        <label style="margin-right: 5px">Etage:</label>
        <span>{{floor}}</span>
      </div>
      <div class="erpion-rows__row-element">
        <label style="margin-right: 5px">Type:</label>
        <span class="chambre-type">{{type}}</span>
      </div>
      <div class="erpion-rows__row-element">
        <label style="margin-right: 5px">Periode:</label>
        <span class="chambre-details">{{date_arrival}} - {{date_depart}}</span>
      </div>
      <div class="btn-small red">Réservé</div>
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

  // -----------------------------------------------------------------------------------------

  switch (currentPage) {
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
            plugins:{ filler: { propagate: false }},
            scales: { yAxes: [{ display: false, ticks: { beginAtZero: true }}], xAxes: [{ display: false }] },
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
            elements:{ line:{ tension: 0.4 }, point: { radius: 2, hitRadius: 8, hoverRadius: 8 } },
            plugins:{ filler: { propagate: false }},
            scales: { yAxes: [{ display: false, ticks: { beginAtZero: true }}], xAxes: [{ display: false }] },
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
          && clientData.clientPhone !== '')
        {
          client.checkClientExists(clientData.clientEmail, clientData.clientPhone, (result) => {
            if (result.length === 1) {
              if (isRange) {
                hebergement.reserveRoomByPeriod(id_room, result[0].id_client, dateDebut, dateFin, () => {
                  window.location.replace(`./gerer_chambre.html?id_room=${id_room}`);
                });
              } else {
                hebergement.reserveRoomByDate(id_room, result[0].id_client, dateDebut, () => {
                  window.location.replace(`./gerer_chambre.html?id_room=${id_room}`);
                });
              }
            } else {
              client.write(
                clientData.clientName, clientData.clientSurname, clientData.clientEmail, clientData.clientPhone,
                () => {
                  client.getClientByEmail(clientData.clientEmail, (result) => {
                    if (isRange) {
                      hebergement.reserveRoomByPeriod(id_room, result[0].id_client, dateDebut, dateFin, () => {
                        window.location.replace(`./gerer_chambre.html?id_room=${id_room}`);
                      });
                    } else {
                      hebergement.reserveRoomByDate(id_room, result[0].id_client, dateDebut, () => {
                        window.location.replace(`./gerer_chambre.html?id_room=${id_room}`);
                      });
                    }
                  });
                }
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
              color: (row.active) ? `#26a69a` : `#8e9ea6`,
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
            right: 'dayGridMonth'
          },
          events: events,
          dateClick: function(info) {
            // alert('clicked ' + info.dateStr);
            console.log('clicked ' + info.dateStr);
          },
          select: function(info) {
            // alert('selected ' + info.startStr + ' to ' + info.endStr);
            console.log('selected ' + info.startStr + ' to ' + info.endStr)
          }
        });
        calendar.render();

        const event = calendar.getEventById('a');
      };
      break;
    }
    case 'gerer_voyages': {
      break;
    }
    case 'gerer_notoriete': {
      break;
    }
    default: {
      break;
    }
  }

  // ############################################################################################# //
  // #################################    EVENT LISTENERS    ##################################### //
  // ############################################################################################# //

  switch (currentPage) {
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
    default: {
      break;
    }
  }


  // ############################################################################################# //
  // #######################################    MAIN    ########################################## //
  // ############################################################################################# //

  // ACTION MANAGER
  switch (currentPage) {
    /**
     * @Route /hebergement/dashboard_hebergement
     */
    case 'dashboard_hebergement': {
      console.log('DASHBOARD');
      drawStatisticsCharts();
      break;
    }
    /**
     * @Route /hebergement/gerer_reservations
     */
    case 'gerer_reservations': {
      console.log('GERER RESERVATIONS');
      drawDatepicker();
      hebergement.getAllOccupiedRoomsByDate(globalFormattedDate, drawOccupiedRooms);
      hebergement.getAllFreeRoomsByDate(globalFormattedDate, drawFreeRooms);
      $(document).ready(() => {
        $('.modal-reservation').modal();
      });
      break;
    }
    /**
     * @Route /hebergement/gerer_chambre
     */
    case 'gerer_chambre': {
      console.log('GERER CHAMBRE');
      const params = Utils.getParams(window.location.href);
      fetchRoomDetails(params.id_room);
      fetchRoomReservations(params.id_room);
      break;
    }
    /**
     * @Route /hebergement/gerer_voyages
     */
    case 'gerer_voyages': {
      console.log('GERER VOYAGES');
      break;
    }
    /**
     * @Route /hebergement/gerer_notoriete
     */
    case 'gerer_notoriete': {
      console.log('GERER NOTORIETE');
      break;
    }
    /**
     * @Route /
     */
    default: {
      console.log('View not found! No action executed!');
    }
  }
});
