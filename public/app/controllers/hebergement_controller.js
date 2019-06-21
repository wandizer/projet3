window.$ = window.jQuery = require('../../plugins/jquery/jquery-3.3.1.min.js');
require('../../plugins/chart.js/Chart.bundle.min.js');
require('../../plugins/materialize/js/materialize.min.js');
require('../../plugins/air-datepicker/js/datepicker.min.js');
require('../../plugins/air-datepicker/js/i18n/datepicker.fr');
// const FullCalendar = require('../../plugins/fullcalendar.js/core/main.min.js');
const Utils = require('../../utils/Utils.js');
const Hebergement = require('../models/Hebergement');
const Chambre = require('../models/Chambre');

const currentPage = Utils.getViewName(window.location.href);
const today = new Date();

window.addEventListener('load', () => {
  // ############################################################################################# //
  // ####################################    VARIABLES    ######################################## //
  // ############################################################################################# //

  let doughnutChart;
  let lineChart;
  let datepicker;
  let calendar;
  let isRange = false;
  let globalFormattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

  const hebergement = new Hebergement();

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

  /**
   * Retrieves all the reservations after selecting a date or period on air-datepicker
   * @function
   */
  let fetchReservations = () => {
  };
  /**
   * Draws all the free rooms retrieved inside the free rooms container in the page
   * @function
   */
  let drawFreeRooms = () => {
  };
  /**
   * Draws all the occupied rooms retrieved inside the occupied rooms container in the page
   * @function
   */
  let drawOccupiedRooms = () => {
  };
  /**
   * Draws all the charts necessary for the statistics on the dashboard
   * @function
   */
  let drawStatisticsCharts = () => {
  };
  /**
   * Draws the Air-Datepicker for managing the reservations, in order to access all the free and occupied rooms
   * @function
   */
  let drawDatepicker = () => {
  };
  /**
   * Voids the two containers inside the 'Gérer Reservations' page
   * @function
   */
  let clearReservationPage = () => {
  };
  /**
   * Responsible for drawing the FullCalendar for the current room (inside 'Gérer Chambre')
   * @function
   */
  let drawRoomCalendar = () => {
  };
  /**
   * Responsible for drawing the reservation modal
   * @function
   */
  let drawModalReservation = () => {
  };
  /**
   * Permet de reserver une chambre
   * @function
   */
  let reserveRoom = () => {
  };

  // -----------------------------------------------------------------------------------------

  switch (currentPage) {
    case 'dashboard_hebergement': {
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
            title: {
              display: true,
              text: 'Chambres :',
            },
            scales: {
              yAxes: [{
                gridLines: {
                  drawBorder: false,
                  display: false,
                },
                ticks: {
                  display: false,
                  beginAtZero: true,
                },
              }],
            },
          },
        });
        const elLineChart = document.getElementById('lineChart').getContext('2d');
        lineChart = new Chart(elLineChart, {
          type: 'line',
          data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            }],
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true,
                },
              }],
            },
          },
        });
      };
      break;
    }
    case 'gerer_reservations': {
      clearReservationPage = () => {
        $('#currentDate').html('');
        $('#freeRooms').html(defaultEmptyContent);
        $('#amountFreeRooms').html('(0)');
        $('#occupiedRooms').html(defaultEmptyContent);
        $('#amountOccupiedRooms').html('(0)');
      };

      reserveRoom = () => {
        const formData = $('form#formReservation').serializeArray();
        const clientReservationData = [];
        $.each(formData, (i, field) => {
          clientReservationData[field.name] = field.value;
          console.log(field);
        });
        console.log(clientReservationData);
      };

      drawModalReservation = (e) => {
        const id_room = e.target.dataset.id;
        const price = e.target.dataset.price;
        const dateDebut = (isRange) ? globalFormattedDate.split(',')[0] : globalFormattedDate;
        const dateFin = (isRange) ? globalFormattedDate.split(',')[1] : globalFormattedDate;
        console.log(id_room, price);
        console.log(dateDebut, dateFin);

        $('.modal-reservation').html(`
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
            <button type="button" id="modalButtonReserver"
            class="modal-close waves-effect waves-green btn-small green">Réserver</button>
          </div>
        `);
        $('#modalButtonReserver').on('click', reserveRoom);
        $('.modal-reservation').modal('open');
      };

      drawFreeRooms = (rooms) => {
        // console.log('Free Rooms : ', rooms);
        $('#freeRooms').html('');
        $('#amountFreeRooms').html(`(${rooms.length})`);
        if (rooms.length) {
          rooms.forEach((room) => {
            $('#freeRooms').append(
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
          $('#freeRooms').html(defaultEmptyContent);
        }
      };

      drawOccupiedRooms = (rooms) => {
        // console.log('Occupied Rooms : ', rooms);
        $('#occupiedRooms').html('');
        $('#amountOccupiedRooms').html(`(${rooms.length})`);
        if (rooms.length) {
          rooms.forEach((room) => {
            $('#occupiedRooms').append(
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
                <a class="btn-small red" href="./gerer_chambre.html?id=${room.id_room}">Réservé</a>
              </div>`,
            );
          });
        } else {
          $('#occupiedRooms').html(defaultEmptyContent);
        }
      };

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
      drawRoomCalendar = () => {
        const calendarEl = document.getElementById('calendar');
        calendar = new FullCalendar.Calendar(calendarEl, {
          plugins: ['dayGrid'],
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

      $('#buttonReserver').on('click', (e) => {
        console.log(e.target);
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
      drawRoomCalendar();
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
