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
    const indexStart = url.search('/views/');
    const indexExt = url.search('.html');
    const length = indexExt - indexStart - 7;
    const viewName = url.substr(indexStart + 7, length);
    return viewName;
  },
};

module.exports = Utils;
