const Rating = {
  emptyStar: '<i class="material-icons">star_border</i>',
  fullStar: '<i class="material-icons">star</i>',
  halfStar: '<i class="material-icons">star_half</i>',

  /**
   * Returns an html element with the filled starts according to the value given
   * @function
   * @param rating
   */
  getRatingStars: (rating) => {
    const truncRating = Math.trunc(rating);
    let starsHTML = '';
    let drawedStars = 0;
    for (let i = 0; i < truncRating; i += 1) {
      starsHTML += Rating.fullStar;
      drawedStars += 1;
    }
    if (rating >= truncRating + 0.5) {
      starsHTML += Rating.halfStar;
      drawedStars += 1;
    }
    const starsLeftToDraw = 5 - drawedStars;
    for (let i = 0; i < starsLeftToDraw; i += 1) {
      starsHTML += Rating.emptyStar;
    }
    return starsHTML;
  },
};

module.exports = Rating;
