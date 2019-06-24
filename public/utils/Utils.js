const Utils = {
  /**
   * Get the URL parameters
   * source: https://css-tricks.com/snippets/javascript/get-url-variables/
   * @param  {String} url The URL
   * @return {Object}     The URL parameters
   */
  getParams: (url) => {
    const params = {};
    const parser = document.createElement('a');
    parser.href = url;
    const query = parser.search.substring(1);
    const vars = query.split('&');
    for (let i = 0; i < vars.length; i += 1) {
      const pair = vars[i].split('=');
      params[pair[0]] = decodeURIComponent(pair[1]);
    }
    return params;
  },

  /**
   * Returns the view name
   * @returns {string}
   */
  getViewName: (url) => {
    const cuttedUrl = url.split('/');
    const viewName = cuttedUrl[cuttedUrl.length - 1].split('.')[0];
    return viewName;
  },

  /**
   * {
   *     id_user: 1,
   *     email: 'myemail@exemple.fr'
   * }
   * @returns {string}
   */
  getStoredUser: () => JSON.parse(window.sessionStorage.getItem('user')),

  /**
   * {
   *     id_employe: 1,
   *     id_role: 1,
   *     name: 'Prenom',
   *     surname: 'Nom',
   *     birthday: 'dd/mm/yyyy',
   *     salary: 3500
   * }
   * @returns {string}
   */
  getStoredEmploye: () => JSON.parse(window.sessionStorage.getItem('employe')),

  /**
   * {
   *     id_service: 1,
   *     name: 'Direction'
   * }
   * @returns {string}
   */
  getStoredService: () => JSON.parse(window.sessionStorage.getItem('service')),

  /**
   * {
   *     id_role: 1m
   *     id_service: 1,
   *     name: 'Directeur Hotel',
   *     permission_level: 1
   * }
   * @returns {string}
   */
  getStoredRole: () => JSON.parse(window.sessionStorage.getItem('role')),
};

module.exports = Utils;
