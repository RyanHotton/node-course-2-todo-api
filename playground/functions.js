/**
 * Pretty Print Function
 * @param {Object} o 
 * @param {Number} d 
 */
const pp = (o, d = 2) => '\n' + JSON.stringify(o, undefined, d);

/**
 * Minify Object (JSON)
 * @param {Object} o 
 */
const ppm = (o) => pp(o, 0);

module.exports = {pp, ppm};