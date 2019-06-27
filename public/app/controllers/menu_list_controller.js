
	window.$ = window.jQuery = require('../../plugins/jquery/jquery-3.3.1.min.js');

	//SET USER INFO
	if(sessionStorage.getItem("employe")!= null){
		var employe = JSON.parse(sessionStorage.getItem("employe"));
		document.getElementById("name").innerHTML = employe.name;
		document.getElementById("surname").innerHTML = employe.surname;
	}
	if(sessionStorage.getItem("role")!= null){
		var role = JSON.parse(sessionStorage.getItem("role"));
		document.getElementById("role").innerHTML = role.name;
		if(role.permission_level > 2){
			document.getElementById("stats").style.display = 'none';
		}
	}

	//SET MENU VARS
	const Day_Menu = require('../models/restauration/Day_Menu.js');
	const Menu = require('../models/restauration/Menu.js');
	const Appetizers = require('../models/restauration/Appetizer.js');
	const Main_Course = require('../models/restauration/Main_Course.js');
	const Dessert = require('../models/restauration/Dessert.js');
	const $cardMenu = $('#menuList');
	const $cardDayMenu = $('#dayMenuList');

	//MENU ARRAYS
	let var_DayMenus;
	let day_menus_list;
	let menus_list;

	let var_AppetizerList = {};
	let var_MainCourseList = {};
	let var_DessertList = {};
	let var_MenusList = {};
	let var_DayMenusList = {};

	Appetizers.findAll(getAppetizers);

	const defaultEmptyContent = `
	<div class="nothing-found">
		<i class="material-icons">warning</i><p>Rien trouvé</p>
	</div>`;

	function getAppetizers(result){
		if (Array.isArray(result) && result[0] != undefined) {
			for (var row of result) {
				var_AppetizerList[row.id_appetizer]=row;
			}	
			Main_Course.findAll(getMainCourse);
			//Bouton Pour créer un nouveau menu
		}
	}

	function getMainCourse(result){
		if (Array.isArray(result) && result[0] != undefined) {
			for (var row of result) {
				var_MainCourseList[row.id_main_course]=row;
			}	
			Dessert.findAll(getDessert);
			//Bouton Pour créer un nouveau menu
		}
	}		

	function getDessert(result){
		if (Array.isArray(result) && result[0] != undefined) {
			for (var row of result) {
				var_DessertList[row.id_dessert]=row;
			}
			Menu.findAll(getMenus);
			//Bouton Pour créer un nouveau menu
		}
	}

	function getMenus(result){
		if (Array.isArray(result) && result[0] != undefined) {
			$cardMenu.html('');
			for (var row of result) {
				var_MenusList[row.id_menu]=row;
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
						<span class="chambre-type">${var_MainCourseList[result.id_appetizer].name}</span>
					</div>

					<div class="erpion-rows__row-element">
						<label style="margin-right: 5px">Dessert:</label>
						<span class="chambre-type">${var_DessertList[result.id_appetizer].name}</span>
					</div>

					<div class="erpion-rows__row-element">
						<label style="margin-right: 5px">Prix:</label>
						<span class="chambre-details">${result.price}€</span>
					</div>

					<div class="erpion-rows__row-element">
						<button type="button" class="btn-small blue" 
						id="buttonReserver${result.id_menu}" data-id="${result.id_menu}"
						data-price="${result.id_menu}">
							<i class="material-icons">create</i>
						</button>

						<button type="button" class="btn-small red" 
						id="buttonReserver${result.id_menu}" data-id="${result.id_menu}"
						data-price="${result.id_menu}">
							<i class="material-icons">delete</i>
						</button>
					</div>
				</div>`,);
				//$(`#buttonReserver${result.id_menu}`).on('click', drawModalReservation);
			});			
		} else {
			$cardMenu.html(defaultEmptyContent);
			console.log("Menu Inexistant");
			//Bouton Pour créer un nouveau menu
		}
	}


	function getDayMenus(result){
		if (Array.isArray(result) && result[0] != undefined) {
			$cardDayMenu.html('');
			for (var row of result) {
				var_DayMenusList[row.id_menu]=row;
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
								id="buttonReserver${result.id_menu}" data-id="${result.id_menu}"
								data-price="${result.id_menu}">
									<i class="material-icons">create</i>
								</button>

								<button type="button" class="btn-small red" 
								id="buttonReserver${result.id_menu}" data-id="${result.id_menu}"
								data-price="${result.id_menu}">
									<i class="material-icons">delete</i>
								</button>
							</div>

						</div>`,
					);
					//$(`#buttonReserver${result.id_menu}`).on('click', drawModalReservation);
				});
		} else {
			$cardDayMenu.html(defaultEmptyContent);
			console.log("Menu Inexistant");
			//Bouton Pour créer un nouveau menu
		}
	}
