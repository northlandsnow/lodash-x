/**
 * extend lodash
 */
'use strict';

var _ = require('lodash');

/**
 * get param type name
 * @param  {[*]} o [param]
 * @return {[string]}   [name: 'function', 'regexp', 'string', 'number', 'object', 'undefined', 'null', 'array', 'error', 'boolean']
 */
_.getType = function(o) {
    return Object.prototype.toString.call(o).slice(8, -1).toLowerCase();
};

/**
 * 
 * @param  {*}  o param
 * @return {Boolean}   result
 */
function isInvalidValue(o) {
    return o === null ||
        o === undefined ||
        o === '' ||
        (_.getType(o) === 'number' && isNaN(o)) ||
        ((_.getType(o) === 'object' || _.getType(o) === 'array') && Object.keys(o).length === 0);
}
_.isInvalidValue = isInvalidValue;

/**
 * [compress object]
 * @param  {[object]} o object
 * @return {[object]}   new object
 */
function compressObject(o) {
    var oo = {};

    Object.keys(o).forEach(function(k) {
        //pre filter values
        if (!isInvalidValue(o[k])) {
            oo[k] = o[k];
        }
        //process array
        if (_.getType(o[k]) === 'array') {
            oo[k] = o[k].filter(function(i) {
                return !isInvalidValue(i);
            });
        }
        //process string
        if (_.getType(o[k]) === 'string' && o[k] !== '') {
            oo[k] = o[k].trim();
        }
        //process nested object
        if (_.getType(o[k]) === 'object') {
            oo[k] = compressObject(o[k]);
        }
    });

    return oo;
}
_.compressObject = function(o) {
    if (_.getType(o) !== 'object') {
        return o;
    }
    return compressObject(o);
};

module.exports = _;