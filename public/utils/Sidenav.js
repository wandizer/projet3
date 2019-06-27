const Sidenav = {
  onglets: [
    {
      role: 'Directeur de l\'hotel',
      items: [
        { label: 'Mon dashboard', url: '../direction/dashboard_direction.html', viewName: 'dashboard_direction' },
        { label: 'Gérer réservations', url: '../hebergement/gerer_reservations.html', viewName: 'gerer_reservations' },
        { label: 'Gérer personnel', url: '../direction/gerer_personnel.html', viewName: 'gerer_personnel' },
        { label: 'Dashboard D.R', url: '../restauration/restauration_view.html', viewName: 'restauration_view' },
        { label: 'Dashboard D.H', url: '../hebergement/dashboard_hebergement.html', viewName: 'dashboard_hebergement' },
        { label: 'Dashboard C.R', url: '../reception/dashboard_reception.html', viewName: 'dashboard_reception' },
        { label: 'Dashboard G.G', url: '../nettoyage/dashboard_gouvernante.html', viewName: 'dashboard_gouvernante' },
        { label: 'Dashboard C.M', url: '../maintenance/dashboard_maintenance.html', viewName: 'dashboard_maintenance' },
        { label: 'Dashboard S.M', url: '../spa/dashboard_spa.html', viewName: 'dashboard_spa' },
      ],
    },
    {
      role: 'Directeur du restaurant',
      items: [
        { label: 'Mon dashboard', url: '../restauration/restauration_view.html', viewName: 'restauration_view' },
        { label: 'Gérer les menus', url: '../restauration/menu_list_view.html', viewName: 'menu_list_view' },
        { label: 'Gérer le stock', url: '../restauration/stock_list_view.html', viewName: 'stock_list_view' },
        { label: 'Gérer les commandes', url: '../restauration/reservation_restaurant_view.html', viewName: 'reservation_restaurant_view' },
      ],
    },
    {
      role: 'Directeur d\'hebergement',
      items: [
        { label: 'Mon dashboard', url: '../hebergement/dashboard_hebergement.html', viewName: 'dashboard_hebergement' },
        { label: 'Gérer réservations', url: '../hebergement/gerer_reservations.html', viewName: 'gerer_reservations' },
        { label: 'Gérer centrales de réservation', url: '../hebergement/gerer_centrales_reservation.html', viewName: 'gerer_centrales_reservation' },
        { label: 'Liste des chambres', url: '../hebergement/liste_chambres.html', viewName: 'liste_chambres' },
        { label: 'Gérer voyages', url: '../hebergement/gerer_voyages.html', viewName: 'gerer_voyages' },
        { label: 'Gérer notoriété', url: '../hebergement/gerer_notoriete.html', viewName: 'gerer_notoriete' },
      ],
    },
    {
      role: 'Chef de reception',
      items: [
        { label: 'Mon dashboard', url: '../reception/dashboard_reception.html', viewName: 'dashboard_reception' },
        { label: 'Gérer réservations', url: '../hebergement/gerer_reservations.html', viewName: 'gerer_reservations' },
        { label: 'Gérer notoriété', url: '../hebergement/gerer_notoriete.html', viewName: 'gerer_notoriete' },
        { label: 'Encaisser client', url: '../reception/encaisser_client.html', viewName: 'encaisser_client' },
        { label: 'Gérer facturation', url: '../reception/gerer_facturation.html', viewName: 'gerer_facturation' },
        { label: 'Gérer services divers', url: '../reception/gerer_services_divers.html', viewName: 'gerer_services_divers' },
      ],
    },
    {
      role: 'Gouvernante generale',
      items: [
        { label: '', url: '..//.html', viewName: '' },
      ],
    },
    {
      role: 'Chef de maintenance',
      items: [
        { label: '', url: '..//.html', viewName: '' },
      ],
    },
    {
      role: 'Spa manager',
      items: [
        { label: '', url: '..//.html', viewName: '' },
      ],
    },
    {
      role: '',
      items: [
        { label: '', url: '..//.html', viewName: '' },
      ],
    },
  ],

  /**
   * Responsible for creating the sidenav on each page
   * @function
   * @param {string} roleName
   * @param {string} viewName
   * @param {string} employeName
   * @param {string} employeSurname
   */
  drawSidenav: (roleName, viewName, employeName, employeSurname) => {
    const elementSidenav = document.getElementsByClassName('erpion-sidenav')[0];
    const index = Sidenav.onglets.map(e => e.role).indexOf(roleName);
    const roleOnglets = Sidenav.onglets[index].items;
    let ongletsHtml = ``;
    // console.log(roleOnglets);
    roleOnglets.forEach((onglet) => {
      if (onglet.viewName === viewName) {
        ongletsHtml += `<a class="erpion-sidenav__onglets-onglet--active" href="#"> <i class="material-icons">play_arrow</i>${onglet.label}</a>`;
      } else {
        ongletsHtml += `<a class="erpion-sidenav__onglets-onglet" href="${onglet.url}">${onglet.label}</a>`;
      }
    });
    let htmlSidenav = `
      <div class="erpion-sidenav__menu">
        <i class="material-icons">menu</i>
      </div>
      <div class="erpion-sidenav__profile">
        <div class="erpion-sidenav__profile-fond">
          <img src="../../../assets/img/user_background.jpg">
        </div>
        <div class="erpion-sidenav__profile-avatar">
          <img src="../../../assets/img/user_logo1.png">
        </div>
        <div class="erpion-sidenav__profile-info">
          <div class="erpion-sidenav__profile-info-nom">${employeSurname}</div>
          <div class="erpion-sidenav__profile-info-prenom">${employeName}</div>
          <div class="erpion-sidenav__profile-info-role">${roleName}</div>
          <a class="btn" href="../../views/connexion/login_view.html">Déconnexion</a>
        </div>
      </div>
      <div class="erpion-sidenav__divider"></div>
      <div class="erpion-sidenav__onglets">
        ${ongletsHtml}
      </div>
      <div class="erpion-sidenav__logo">
        <img src="../../../assets/img/erpion_logo.png">
      </div>`;
    elementSidenav.innerHTML = htmlSidenav;
  }
};

module.exports = Sidenav;
