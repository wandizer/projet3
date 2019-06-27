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

const Food_Item = require('../models/restauration/Food_Item.js');

const Stock = require('../models/restauration/Stock.js');

const $cardStock = $('#stockList');

const defaultEmptyContent = `
<div class="nothing-found">
	<i class="material-icons">warning</i><p>Rien trouvé</p>
</div>`;


const var_FoodItems = {};

// START
Food_Item.findAll(getFoodItems);


function getFoodItems(result) {
  if (Array.isArray(result) && result[0] != undefined) {
    $cardStock.html('');
    for (const row of result) {
      var_FoodItems[row.id_food_item] = row;
      Stock.findById(row.id_food_item, appendFoodItems);
    }
    console.log(result);
  } else {
    console.log('Menu Inexistant');
    // Bouton Pour créer un nouveau menu
  }
}

function appendFoodItems(result) {
  if (result.length) {
    result.forEach((result) => {
      $cardStock.append(
        `<div class="erpion-rows__row">
					<i class="material-icons">restaurant</i>
					<div class="erpion-rows__row-element">
						<div class="green-dot"></div>
					</div>
					<div class="erpion-rows__row-element">
						<label style="margin-right: 5px">Nº</label>
						<span>${result.id_food_item}</span>
					</div>
					<div class="erpion-rows__row-element">
						<label style="margin-right: 5px">Name:</label>
						<span>${var_FoodItems[result.id_food_item].name}</span>
					</div>
					<div class="erpion-rows__row-element">
						<label style="margin-right: 5px">Date d'arrivé:</label>
						<span class="chambre-type">${result.date_arrival}</span>
					</div>
					<div class="erpion-rows__row-element">
						<label style="margin-right: 5px">Date d'expiration:</label>
						<span class="chambre-type">${result.date_expiration}</span>
					</div>
					<div class="erpion-rows__row-element">
						<label style="margin-right: 5px">Quantité :</label>
						<span class="chambre-details">${result.quantity}</span>
					</div>
					<button type="button" class="btn-small blue" 
					id="buttonReserver${result.id_food_item}" data-id="${result.id_food_item}"
					data-price="${result.id_food_item}">Modifier</button>
					<button type="button" class="btn-small red" 
					id="buttonReserver${result.id_food_item}" data-id="${result.id_food_item}"
					data-price="${result.id_food_item}">
					<i class="material-icons">delete</i>
					</button>
				</div>`,
      );
      // $(`#buttonReserver${result.id_menu}`).on('click', drawModalReservation);
    });
  } else {
    $cardStock.html(defaultEmptyContent);
  }
}
