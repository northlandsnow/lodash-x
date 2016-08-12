/**
 * extend lodash
 */
'use strict';

var _ = require('lodash');
var lodash = _.runInContext();

/**
 * get param type name
 * @param  {[*]} o [param]
 * @return {[string]}   [name: 'function', 'regexp', 'string', 'number', 'object', 'undefined', 'null', 'array', 'error', 'boolean']
 */
lodash.getType = function(o) {
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
        (lodash.getType(o) === 'number' && isNaN(o)) ||
        ((lodash.getType(o) === 'object' || lodash.getType(o) === 'array') && Object.keys(o).length === 0);
}
lodash.isInvalidValue = isInvalidValue;

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
        if (lodash.getType(o[k]) === 'array') {
            oo[k] = o[k].filter(function(i) {
                return !isInvalidValue(i);
            });
        }
        //process string
        if (lodash.getType(o[k]) === 'string' && o[k] !== '') {
            oo[k] = o[k].trim();
        }
        //process nested object
        if (lodash.getType(o[k]) === 'object') {
            oo[k] = compressObject(o[k]);
        }
    });

    return oo;
}
lodash.compressObject = function(o) {
    if (lodash.getType(o) !== 'object') {
        return o;
    }
    return compressObject(o);
};

module.exports = lodash;