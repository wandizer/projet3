window.$ = window.jQuery = require('../../plugins/jquery/jquery-3.3.1.min.js');

document.addEventListener('DOMContentLoaded', function() {
	var elems = document.querySelectorAll('.sidenav');
	var instances = M.Sidenav.init(elems, {});
});
		
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

const Meal_Reservation = require('../models/restauration/Meal_Reservation.js');

const Main_Course = require('../models/restauration/Main_Course.js');
const Appetizer = require('../models/restauration/Appetizer.js');
const Dessert = require('../models/restauration/Dessert.js');	

const Menu_Main_Course_Item = require('../models/restauration/Menu_MainCourse_Item.js');
const Menu_Appetizer_Item = require('../models/restauration/Menu_Appetizer_Item.js');
const Menu_Dessert_Item = require('../models/restauration/Menu_Dessert_Item.js');

const Food_Item = require('../models/restauration/Food_Item.js');

const Stock = require('../models/restauration/Stock.js');

const $cardStock = $('#stockList');

//MENU ARRAYS
let var_DayMenu;

let var_Couverts;
let var_CouvertsNuit;

let var_MenuNoon;
let var_MenuEvening;

let var_MainCourse;
let var_Appetizer;
let var_Dessert;		

let var_MainCourse_Item;
let var_Appetizer_Item;
let var_Dessert_Item;		

let var_MainCourse_FoodItem_List=[];
let var_Appetizer_FoodItem_List=[];
let var_Dessert_FoodItem_List=[];

let var_FoodItems={};

//START
getDayMenu();
Food_Item.findAll(getFoodItems);

//
//GET DAY MENU
//

function getDayMenu(){
	var currentDay = new Date();
	var day = currentDay.getDate();
	var month = currentDay.getMonth()+1;
	var year = currentDay.getFullYear();
	var currentDay = 	"10/05/2019"; //day + "/" + month + "/" + year;
	//console.log(currentDay);
	Day_Menu.findByDate(currentDay, getMenu);
}

//
//GET MENU
//
function getMenu(result){
	if (Array.isArray(result) && result[0] != undefined) {
		if (result[0].id_menu != null) {
			var_DayMenu = result[0];
			//console.log(var_DayMenu);
			Menu.findById(result[0].id_menu, prepareMenu);
			Meal_Reservation.findCouverts(result[0].id_day_menu, getCouverts);
			Meal_Reservation.findCouverts(result[1].id_day_menu, getCouvertsNuit);
		} else {
			//console.log("Probleme idmenu");
		}
	} else {
		console.log("Menu Inexistant");
		//Bouton Pour créer un nouveau menu
	}
}

function getCouverts(result){
	if (Array.isArray(result) && result != undefined) {
		if (result != null) {
			var_Couverts = result[0]["COUNT(*)"];
			//console.log(result[0]["COUNT(*)"]);
			document.getElementById("couvertsReserves").innerHTML = var_Couverts;
			document.getElementById("couvertsNonReserves").innerHTML = 200-var_Couverts;
		} else {
			//console.log("Probleme idmenu");
		}
	} else {
		console.log("Menu Inexistant");
		//Bouton Pour créer un nouveau menu
	}
}	

function getCouvertsNuit(result){
	if (Array.isArray(result) && result != undefined) {
		if (result != null) {
			var_CouvertsNuit = result[0]["COUNT(*)"];
			//console.log(result[0]["COUNT(*)"]);
			document.getElementById("couvertsReservesNuit").innerHTML = var_CouvertsNuit;
			document.getElementById("couvertsNonReservesNuit").innerHTML = 200-var_CouvertsNuit;
		} else {
			//console.log("Probleme idmenu");
		}
	} else {
		console.log("Menu Inexistant");
		//Bouton Pour créer un nouveau menu
	}
}

//
//GET MENU COMPOSANTS
//

function prepareMenu(result){
	if (Array.isArray(result) && result != null) {
		//MENU DU MIDI
		if (result[0].id_menu != null) {
			var_MenuNoon = result[0];
			//console.log(var_MenuNoon);
			Main_Course.findById(result[0].id_main_course, getMainCourse);
			Appetizer.findById(result[0].id_appetizer, getAppetizer);
			Dessert.findById(result[0].id_dessert, getDessert);
			document.getElementById("menu").innerHTML = var_MenuNoon.name;
			document.getElementById("price").innerHTML = var_MenuNoon.price+"$";
		} else {
			//console.log("Probleme idmenunoon");
		}
		//MENU DU SOIR
/*				if (result[1].id_menu != null) {
			var_MenuEvening = result[1];
			//console.log(var_MenuEvening);
			Main_Course.findById(result[1].id_main_course, getMainCourse);
			Appetizer.findById(result[1].id_appetizer, getAppetizer);
			Dessert.findById(result[1].id_dessert, getDessert);
		} else {
			//console.log("Probleme idmenuevening");
		}*/
	} else {
		console.log("Probleme menué");
	}
	if(var_MenuNoon.name != null){
	}
}


//
// MENU COMPOSANTS
//
function getMainCourse(result){
	if (Array.isArray(result) && result != null) {
		if (result[0].id_main_course != null) {
			var_MainCourse = result[0];
			//console.log(var_MainCourse);
			document.getElementById("maincourse").innerHTML = var_MainCourse.name;
			Menu_Main_Course_Item.findByIdMenu(result[0].id_main_course, getMainCourseItem);
		} else {
			//console.log("Probleme getMainCourseItem");
		}
	} else {
		console.log("Probleme getMainCourse");
	}
}

function getAppetizer(result){
	if (Array.isArray(result) && result != null) {
		if (result[0].id_appetizer != null) {
			var_Appetizer = result[0];
			//console.log(var_Appetizer);
			document.getElementById("appetizer").innerHTML = var_Appetizer.name;
			Menu_Appetizer_Item.findByIdMenu(result[0].id_appetizer, getAppetizerItem);
		} else {
			//console.log("Probleme getAppetizerItem");
		}
	} else {
		console.log("Probleme getAppetizer");
	}
}

function getDessert(result){
	if (Array.isArray(result) && result != null) {
		if (result[0].id_dessert != null) {
			var_Dessert = result[0];
			//console.log(var_Dessert);
			document.getElementById("dessert").innerHTML = var_Dessert.name;
			Menu_Dessert_Item.findByIdMenu(result[0].id_dessert, getDessertItem);
		} else {
			//console.log("Probleme getDessertItem");
		}
	} else {
		console.log("Probleme getDessert");
	}
}		

//
// MENU ITEMS
//

function getMainCourseItem(result){
	if (Array.isArray(result) && result != null) {
		if (result[0].id_food_item != null) {
			console.log(result);
			var_MainCourse_Item = result[0];
			//console.log(var_MainCourse_Item);
			Food_Item.findById(result[0].id_food_item, getMainCourseFoodItem);
		} else {
			//console.log("Probleme getMainCourseItem");
		}
	} else {
		console.log("Probleme getMainCourse");
	}
}

function getAppetizerItem(result){
	if (Array.isArray(result) && result != null) {
		if (result[0].id_food_item != null) {
			var_Appetizer_Item = result[0];
			//console.log(var_Appetizer_Item);
			Food_Item.findById(result[0].id_food_item, getAppetizerFoodItem);
		} else {
			//console.log("Probleme getAppetizerItem");
		}
	} else {
		console.log("Probleme getAppetizer");
	}
}

function getDessertItem(result){
	if (Array.isArray(result) && result != null) {
		if (result[0].id_food_item != null) {
			var_Dessert_Item = result[0];
			//console.log(var_Dessert_Item);
			Food_Item.findById(result[0].id_food_item, getDessertFoodItem);
		} else {
			//console.log("Probleme getDessertItem");
		}
	} else {
		console.log("Probleme getDessert");
	}
}		

//
// ITEMS LIST
//

function getMainCourseFoodItem(result){
	ingredientsMainCourse = "";
	if (Array.isArray(result) && result != null) {
		if (result[0].id_food_item != null) {
			var_MainCourse_FoodItem_List = result;
			//console.log(var_MainCourse_FoodItem_List);
			result.forEach(function(food) {
				//console.log(food.name);
				ingredientsMainCourse += food.name;
			});	
			document.getElementById("ingredientsMaincourse").innerHTML = ingredientsMainCourse;
		} else {
			//console.log("Probleme getMainCourseItem");
		}
	} else {
		console.log("Probleme getMainCourse");
	}
}

function getAppetizerFoodItem(result){
	ingredientsAppetizer = "";
	if (Array.isArray(result) && result != null) {
		if (result[0].id_food_item != null) {
			var_Appetizer_FoodItem_List = result;
			//console.log(var_Appetizer_FoodItem_List);
			result.forEach(function(food) {
				//console.log(food.name);
				ingredientsAppetizer += food.name;
			});			
			document.getElementById("ingredientsAppetizer").innerHTML = ingredientsAppetizer;
		} else {
			//console.log("Probleme getAppetizerItem");
		}
	} else {
		console.log("Probleme getAppetizer");
	}
}

function getDessertFoodItem(result){
	ingredientsDessert = "";
	if (Array.isArray(result) && result != null) {
		if (result[0].id_food_item != null) {
			var_Dessert_FoodItem_List = result;
			//console.log(var_Dessert_FoodItem_List);
			result.forEach(function(food) {
				//console.log(food.name);
				ingredientsDessert += food.name;
			});						
			document.getElementById("ingredientsDessert").innerHTML = ingredientsDessert;
		} else {
			//console.log("Probleme getDessertItem");
		}
	} else {
		console.log("Probleme getDessert");
	}	
}

function getFoodItems(result){
	if (Array.isArray(result) && result[0] != undefined) {
		$cardStock.html('');
		for (var row of result) {
			var_FoodItems[row.id_food_item]=row;
			Stock.findById(row.id_food_item, appendFoodItems);
		}	
				console.log(result);
	} else {
		console.log("Menu Inexistant");
		//Bouton Pour créer un nouveau menu
	}
}

function appendFoodItems(result){
	if (result.length) {
		menus_list=result;
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
			//$(`#buttonReserver${result.id_menu}`).on('click', drawModalReservation);
		});
	} else {
		$cardStock.html(defaultEmptyContent);
	}
}


if(sessionStorage.getItem("role")!= null){
	var role = JSON.parse(sessionStorage.getItem("role"));
	document.getElementById("role").innerHTML = role.name;
	if(role.permission_level > 2){
		document.getElementById("stats").style.display = 'none';
	}
}