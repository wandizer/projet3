window.$ = window.jQuery = require('../../plugins/jquery/jquery-3.3.1.min.js');
require('../../plugins/chart.js/Chart.bundle.min.js');
require('../../plugins/air-datepicker/js/datepicker.min.js');
require('../../plugins/air-datepicker/js/i18n/datepicker.fr');
// const FullCalendar = require('../../plugins/fullcalendar.js/core/main.min.js');
const Utils = require('../../utils/Utils.js');
const Hebergement = require('../models/Hebergement');
const Chambre = require('../models/Chambre');

const currentPage = Utils.getViewName(window.location.href);
const today = new Date();
const todayFormatted = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

window.addEventListener('load', () => {
  // ############################################################################################# //
  // ####################################    VARIABLES    ######################################## //
  // ############################################################################################# //

  let doughnutChart;
  let lineChart;
  let datepicker;
  let calendar;

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
  let drawRoomCalendar = () => {
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
        $('#occupiedRooms').html(defaultEmptyContent);
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
              <a class="btn-small green" href="./gerer_chambre.html?id=${room.id_room}">Reserver</a>
            </div>`,
            );
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
                <div class="btn-small red">Réservé</div>
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
      });

      $('#optionOnePeriod').on('click', () => {
        datepicker.clear();
        datepicker.update('range', true);
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
      hebergement.getAllOccupiedRoomsByDate(todayFormatted, drawOccupiedRooms);
      hebergement.getAllFreeRoomsByDate(todayFormatted, drawFreeRooms);
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
