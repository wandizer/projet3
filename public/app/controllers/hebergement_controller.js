// const $  = require('../../plugins/jquery/jquery-3.3.1.min.js');
// const Datepicker = require('../../plugins/air-datepicker/js/datepicker.min.js');

const Utils = require('../../utils/Utils.js');
const Hebergement = require('../models/Hebergement');
const Chambre = require('../models/Chambre');

// ############################################################################################# //
// ####################################    FUNCTIONS    ######################################## //
// ############################################################################################# //


// ############################################################################################# //
// ####################################    CALLBACKS    ######################################## //
// ############################################################################################# //


// ############################################################################################# //
// #################################    EVENT LISTENERS    ##################################### //
// ############################################################################################# //


// ############################################################################################# //
// #######################################    MAIN    ########################################## //
// ############################################################################################# //

// ACTION MANAGER
switch (Utils.getViewName(window.location.href)) {
  /**
   * @Route /hebergement/dashboard_hebergement
   */
  case 'dashboard_hebergement': {
    console.log('DASHBOARD');
    break;
  }
  /**
   * @Route /hebergement/gerer_reservations
   */
  case 'gerer_reservations': {
    console.log('GERER RESERVATIONS');
    break;
  }
  /**
   * @Route /hebergement/gerer_chambre
   */
  case 'gerer_chambre': {
    console.log('GERER CHAMBRE');
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
