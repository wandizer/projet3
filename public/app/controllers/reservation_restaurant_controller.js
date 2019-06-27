window.$ = window.jQuery = require('../../plugins/jquery/jquery-3.3.1.min.js');

const Utils = require('../../utils/Utils.js');
const Sidenav = require('../../utils/Sidenav.js');

// Session Storage
const storedRole = Utils.getStoredRole();
const storedEmploye = Utils.getStoredEmploye();
const storedUser = Utils.getStoredUser();
const storedService = Utils.getStoredService();
const viewName = Utils.getViewName(window.location.href);

document.addEventListener('DOMContentLoaded', () => {
  Sidenav.drawSidenav(storedRole.name, viewName, storedEmploye.name, storedEmploye.surname);
  if (storedRole.permission_level > 2) {
    document.getElementById('stats').style.display = 'none';
  }
});

const defaultEmptyContent = `
<div class="nothing-found">
	<i class="material-icons">warning</i><p>Rien trouvé</p>
</div>`;

const Day_Menu = require('../models/restauration/Day_Menu.js');
const Meal_Reservation = require('../models/restauration/Meal_Reservation.js');
const Client = require('../models/Client.js');

const $reservationList = $('#reservationList');
const $reservationAllList = $('#reservationAllList');

const var_DayMenu = {};
const var_DayMenuAll = {};
const var_ReservationMeal = {};
const var_ReservationMealAll = {};

// START
getDayMenu();
Day_Menu.findAll(getAllMealReservation);

function getDayMenu() {
  var currentDay = new Date();
  const day = currentDay.getDate();
  const month = currentDay.getMonth() + 1;
  const year = currentDay.getFullYear();
  var currentDay = 	'10/05/2019'; // day + "/" + month + "/" + year;
  // console.log(currentDay);
  Day_Menu.findByDate(currentDay, getMealReservation);
}

function getMealReservation(result) {
  if (Array.isArray(result) && result[0] != undefined) {
    $reservationList.html('');
    for (const row of result) {
      var_DayMenu[row.id_day_menu] = row;
      Meal_Reservation.findById(row.id_day_menu, getClient);
    }
  } else {
    console.log('Menu Inexistant');
    // Bouton Pour créer un nouveau menu
  }
}

function getClient(result) {
  if (Array.isArray(result) && result[0] != undefined) {
    for (const row of result) {
      var_ReservationMeal[row.id_client] = row;
      Client.findById(row.id_client, appendMealReservation);
    }
  } else {
    console.log('Menu Inexistant');
    // Bouton Pour créer un nouveau menu
  }
}

function appendMealReservation(result) {
  if (result.length) {
    result.forEach((result) => {
      $reservationList.append(
        `<div class="erpion-rows__row">
						<i class="material-icons">restaurant</i>
			
					<div class="erpion-rows__row-element">
						<label style="margin-right: 5px">Nº</label>
						<span>${var_ReservationMeal[result.id_client].id_meal_reservation}</span>
					</div>
					<div class="erpion-rows__row-element">
						<label style="margin-right: 5px">Date:</label>
						<span>${var_DayMenuAll[var_ReservationMeal[result.id_client].id_day_menu].date_arrival}</span>
					</div>
					<div class="erpion-rows__row-element">
						<label style="margin-right: 5px">Prénom:</label>
						<span class="chambre-type">${result.name}</span>
					</div>
					<div class="erpion-rows__row-element">
						<label style="margin-right: 5px">Nom:</label>
						<span class="chambre-type">${result.surname}</span>
					</div>
					<div class="erpion-rows__row-element">
						<button type="button" class="btn-small blue" id="buttonReserver${var_ReservationMeal[result.id_client].id_meal_reservation}" data-id="${var_ReservationMeal[result.id_client].id_meal_reservation}" data-price="${var_ReservationMeal[result.id_client].id_meal_reservation}">
							Modifier
						</button>

						<button type="button" class="btn-small red" id="buttonReserver${var_ReservationMeal[result.id_client].id_meal_reservation}" data-id="${var_ReservationMeal[result.id_client].id_meal_reservation}" data-price="${var_ReservationMeal[result.id_client].id_meal_reservation}">
							<i class="material-icons">delete</i>
						</button>
					</div>
				</div>`,
      );
      // $(`#buttonReserver${result.id_menu}`).on('click', drawModalReservation);
    });
  } else {
    $reservationList.html(defaultEmptyContent);
  }
}

function getAllMealReservation(result) {
  if (Array.isArray(result) && result[0] != undefined) {
    $reservationAllList.html('');
    for (const row of result) {
      var_DayMenuAll[row.id_day_menu] = row;
      Meal_Reservation.findById(row.id_day_menu, getAllClient);
    }
  } else {
    console.log('Menu Inexistant');
    // Bouton Pour créer un nouveau menu
  }
}

function getAllClient(result) {
  if (Array.isArray(result) && result[0] != undefined) {
    for (const row of result) {
      var_ReservationMealAll[row.id_client] = row;
      Client.findById(row.id_client, appendMealReservationAll);
    }
  } else {
    console.log('Menu Inexistant');
    // Bouton Pour créer un nouveau menu
  }
}

function appendMealReservationAll(result) {
  if (result.length) {
    result.forEach((result) => {
      $reservationAllList.append(
        `<div class="erpion-rows__row">
						<i class="material-icons">restaurant</i>

					<div class="erpion-rows__row-element">
						<label style="margin-right: 5px">Nº</label>
						<span>${var_ReservationMealAll[result.id_client].id_meal_reservation}</span>
					</div>
					<div class="erpion-rows__row-element">
						<label style="margin-right: 5px">Date:</label>
						<span>${var_DayMenuAll[var_ReservationMealAll[result.id_client].id_day_menu].date_arrival}</span>
					</div>
					<div class="erpion-rows__row-element">
						<label style="margin-right: 5px">Prénom:</label>
						<span class="chambre-type">${result.name}</span>
					</div>
					<div class="erpion-rows__row-element">
						<label style="margin-right: 5px">Nom:</label>
						<span class="chambre-type">${result.surname}</span>
					</div>
					<div class="erpion-rows__row-element">
						<button type="button" class="btn-small blue" id="buttonReserver${var_ReservationMealAll[result.id_client].id_meal_reservation}" data-id="${var_ReservationMealAll[result.id_client].id_meal_reservation}" data-price="${var_ReservationMealAll[result.id_client].id_meal_reservation}">
							Modifier
						</button>

						<button type="button" class="btn-small red" id="buttonReserver${var_ReservationMealAll[result.id_client].id_meal_reservation}" data-id="${var_ReservationMealAll[result.id_client].id_meal_reservation}" data-price="${var_ReservationMealAll[result.id_client].id_meal_reservation}">
							<i class="material-icons">delete</i>
						</button>
					</div>
				</div>`,
      );
      // $(`#buttonReserver${result.id_menu}`).on('click', drawModalReservation);
    });
  } else {
    $reservationAllList.html(defaultEmptyContent);
  }
}
