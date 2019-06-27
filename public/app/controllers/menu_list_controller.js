
window.$ = window.jQuery = require('../../plugins/jquery/jquery-3.3.1.min.js');
require('../../plugins/materialize/js/materialize.min.js');

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

// SET MENU VARS
const Day_Menu = require('../models/restauration/Day_Menu.js');
const Menu = require('../models/restauration/Menu.js');
const Appetizers = require('../models/restauration/Appetizer.js');
const Main_Course = require('../models/restauration/Main_Course.js');
const Dessert = require('../models/restauration/Dessert.js');

const $cardMenu = $('#menuList');
const $cardDayMenu = $('#dayMenuList');

// MENU ARRAYS
let var_DayMenus;
let day_menus_list;
let menus_list;

const var_AppetizerList = {};
const var_MainCourseList = {};
const var_DessertList = {};
const var_MenusList = {};
const var_DayMenusList = {};

Appetizers.findAll(getAppetizers);

const defaultEmptyContent = `
	<div class="nothing-found">
		<i class="material-icons">warning</i><p>Rien trouvé</p>
	</div>`;


$('#createModalMenu').on('click', function (e) {
	let $buildModalMenu = $('#buildModalMenu');
	$buildModalMenu.html('');
	$buildModalMenu.append(buildModalMenu());
	$('select').formSelect();
	$(`#buttonCreateMenu`).on('click', function (e) {
		let formData = $('form#formModalMenu').serializeArray();
		console.log(formData);
		Menu.write(formData[0].value, formData[1].value, formData[2].value, formData[3].value, formData[4].value);
		//location.reload();
	});
	$buildModalMenu.modal('open');
});





function getAppetizers(result) {
  if (Array.isArray(result) && result[0] != undefined) {
    for (const row of result) {
      var_AppetizerList[row.id_appetizer] = row;
    }
    Main_Course.findAll(getMainCourse);
    // Bouton Pour créer un nouveau menu
  }
}

function getMainCourse(result) {
  if (Array.isArray(result) && result[0] != undefined) {
    for (const row of result) {
      var_MainCourseList[row.id_main_course] = row;
    }
    Dessert.findAll(getDessert);
    // Bouton Pour créer un nouveau menu
  }
}

function getDessert(result) {
  if (Array.isArray(result) && result[0] != undefined) {
    for (const row of result) {
      var_DessertList[row.id_dessert] = row;
    }
    Menu.findAll(getMenus);
    // Bouton Pour créer un nouveau menu
  }
}

function getMenus(result) {
  if (Array.isArray(result) && result[0] != undefined) {
    $cardMenu.html('');
    for (const row of result) {
      var_MenusList[row.id_menu] = row;
    }
    Day_Menu.findAll(getDayMenus);
    result.forEach((result) => {
      $cardMenu.append(
        `<div class="erpion-rows__row" style="font-size:10pt;">

					<i class="material-icons">restaurant</i>

					<div class="erpion-rows__row-element">
						<label style="margin-right: 5px">Nº</label>
						<span>${result.id_menu}</span>
					</div>

					<div class="erpion-rows__row-element">
						<label style="margin-right: 5px">Name:</label>
						<span>${result.name}</span>
					</div>

					<div class="erpion-rows__row-element">
						<label style="margin-right: 5px">Entrée:</label>
						<span class="chambre-type">${var_AppetizerList[result.id_appetizer].name}</span>
					</div>

					<div class="erpion-rows__row-element">
						<label style="margin-right: 5px">Plat Principal:</label>
						<span class="chambre-type">${var_MainCourseList[result.id_main_course].name}</span>
					</div>

					<div class="erpion-rows__row-element">
						<label style="margin-right: 5px">Dessert:</label>
						<span class="chambre-type">${var_DessertList[result.id_dessert].name}</span>
					</div>

					<div class="erpion-rows__row-element">
						<label style="margin-right: 5px">Prix:</label>
						<span class="chambre-details">${result.price}€</span>
					</div>

					<div class="erpion-rows__row-element">
						<button type="button" class="btn-small blue" 
							id="updateModalMenu${result.id_menu}" 
							data-id="${result.id_menu}"
							data-price="${result.id_menu}">
							<i class="material-icons">create</i>
						</button>

						<button type="button" class="btn-small red" 
							id="deleteModalMenu" 
							data-id="${result.id_menu}"
							data-price="${result.id_menu}">
							<i class="material-icons">delete</i>
						</button>
					</div>
				</div>`
      );
      $(`#updateModalMenu${result.id_menu}`).on('click', function (e) {
				let $buildModalMenu = $('#buildModalMenu');
				$buildModalMenu.html('');
				$buildModalMenu.append(buildModalMenu(result.id_menu,result.name,result.price,var_AppetizerList[result.id_appetizer].name, var_MainCourseList[result.id_main_course].name,  var_DessertList[result.id_dessert].name));
				$('select').formSelect();
				$(`#buttonUpdateMenu${result.id_menu}`).on('click', function (e) {
					let formData = $(`form#formModalMenu${result.id_menu}`).serializeArray();
					console.log(formData);
					Menu.rewrite(result.id_menu, formData[0].value, formData[1].value, formData[2].value, formData[3].value, formData[4].value);
					location.reload();
				});
				$buildModalMenu.modal('open');
			});
			
			$('#deleteModalMenu').on('click', function (e) {
				const id_menu = e.target.dataset.id;
				let $deleteModal = $('#deleteModal');
				$deleteModal.html('');
				$deleteModal.append(deleteModalMenu());
				$(`#buttonDeleteMenu`).on('click', function (e) {
					Menu.deleteRow(id_menu,'');
					//location.reload();
				});
				$deleteModal.modal('open');
			});
			
    });
  } else {
    $cardMenu.html(defaultEmptyContent);
    console.log('Menu Inexistant');
    // Bouton Pour créer un nouveau menu
  }
}


	function deleteModalMenu(id_menu) {
		return `  <div class="modal-content">
            <div class="row"><p>Voulez-vous vraiment supprimer ce menu ?</p></div>
            <div class="row"><label>(Cette action est irreversible!)</label></div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-small modal-close">Annuler</button>
            <button type="button" class="btn-small red" 
            data-id="${id_menu}" id="buttonDeleteMenu">Confirmer</button>
          </div>
		`;
	}


function getDayMenus(result) {
  if (Array.isArray(result) && result[0] != undefined) {
    $cardDayMenu.html('');
    for (const row of result) {
      var_DayMenusList[row.id_menu] = row;
    }
    result.forEach((result) => {
      $cardDayMenu.append(
        `<div class="erpion-rows__row" style="font-size:10pt;">

							<i class="material-icons">restaurant</i>

							<div class="erpion-rows__row-element">
								<label style="margin-right: 5px">Nº</label>
								<span>${result.id_day_menu}</span>
							</div>

							<div class="erpion-rows__row-element">
								<label style="margin-right: 5px">Date:</label>
								<span class="chambre-type">${result.date_arrival}</span>
							</div>

							${(result.evening) ? `
								<div class="erpion-rows__row-element">
									<label style="margin-right: 5px">Midi:</label>
									<div class="red-dot"></div>
								</div>
								<div class="erpion-rows__row-element">
									<label style="margin-right: 5px">Soir:</label>
									<div class="green-dot"></div>
								</div>

							` : `
								<div class="erpion-rows__row-element">
									<label style="margin-right: 5px">Midi:</label>
									<div class="green-dot"></div>
								</div>
								<div class="erpion-rows__row-element">
									<label style="margin-right: 5px">Soir:</label>
									<div class="red-dot"></div>
								</div>
							`}

							<div class="erpion-rows__row-element">
								<label style="margin-right: 5px">Nom Menu:</label>
								<span>${var_MenusList[result.id_menu].name}</span>
							</div>


							<div class="erpion-rows__row-element">
								<button type="button" class="btn-small blue" 
									id="blabla{result.id_menu}" 
									data-id="${result.id_menu}"
									data-price="${result.id_menu}"
								>
									<i class="material-icons">create</i>
								</button>

								<button type="button" class="btn-small red" 
									id="blabla{result.id_menu}" 
									data-id="${result.id_menu}"
									data-price="${result.id_menu}"
								>
									<i class="material-icons">delete</i>
								</button>

							</div>
						</div>`
      );
      // $(`#buttonReserver${result.id_menu}`).on('click', drawModalReservation);
    });
  } else {
    $cardDayMenu.html(defaultEmptyContent);
    // Bouton Pour créer un nouveau menu
  }
}	
	
	$(document).ready(() => $('#buildModalMenu').modal());
	
	/**
	 * Default template for modification or creation of menu of reservation
	 * @function
	 * @param {int} id_menu
	 * @param {string} name
	 * @param {int} price
	 * @param {string} appetizer
	 * @param {string} mainCourse
	 * @param {string} dessert
	 */
	function buildModalMenu(id_menu, name, price, appetizer, mainCourse, dessert) {
		let stringAppetizer ='';
		Object.values(var_AppetizerList).forEach(function (row){
			if(appetizer!=undefined && row.name == appetizer ){
				stringAppetizer += '<option value="'+row.id_appetizer+'" selected >'+row.name+'</option>';	
			}else{
				stringAppetizer += '<option value="'+row.id_appetizer+'">'+row.name+'</option>';
			}
		});
		
		let stringMainCourse ='';
		Object.values(var_MainCourseList).forEach(function (row){
			if(mainCourse!=undefined && row.name == mainCourse ){
				stringMainCourse += '<option value="'+row.id_main_course+'" selected >'+row.name+'</option>';	
			}else{
				stringMainCourse += '<option value="'+row.id_main_course+'">'+row.name+'</option>';
			}
		}); 
		
		let stringDessert ='';
		Object.values(var_DessertList).forEach(function (row){
			if(dessert!=undefined && row.name == dessert ){
				stringDessert += '<option value="'+row.id_dessert+'" selected >'+row.name+'</option>';	
			}else{
				stringDessert += '<option value="'+row.id_dessert+'">'+row.name+'</option>';	 
			}
		}); 
	
		return `<div class="modal-content">
				<h4>Modification Menus ${id_menu || ''}</h4>
				<div class="row">
					<form class="col s12" id="formModalMenu${id_menu || ''}">
						<div class="row">

							<div class="input-field col s6">
								<input id="modalName" name="modalName"
								value="${name || ''}" type="text" class="validate">
								<label for="modalName" class="${(name) ? 'active' : ''}">Nom</label>
							</div>

							<div class="input-field col s6">
								<input id="modalPrice" name="modalPrice"
								value="${price || ''}" type="number" class="validate">
								<label for="modalPrice" class="${(price) ? 'active' : ''}">Prix</label>
							</div>

						</div>
						<div class="row">

							<div class="input-field col s3">
								<select id="modalAppetizer" name="modalAppetizer">
									${stringAppetizer}
								</select>
								<label>Entrée</label>
							</div>
							
							<div class="input-field col s3">
								<select id="modalMainCourse" name="modalMainCourse">
									${stringMainCourse}
								</select>
								<label>Plat Principal</label>
							</div>
							
							<div class="input-field col s3">
								<select id="modalDessert" name="modalDessert">
									${stringDessert}
								</select>
								<label>Dessert</label>
							</div>
						
						</div>
					</form>
				</div>
			</div>

			<div class="modal-footer">
				<button type="button" id="${(id_menu) ? `buttonUpdateMenu${id_menu}`	 : 'buttonCreateMenu'}"
				data-id="{id_menu}" class="waves-effect waves-blue btn-small blue">${(id_menu) ? 'Modifier' : 'Créer'}</button>
			</div>
		`;
	}

