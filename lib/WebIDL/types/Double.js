/**
 * @module WebIDL/Double
 * @exports WebIDL.Double
 */
define(function(require) {
    'use strict';
    var IDLType = require('WebIDL/types/IDLType'),
        WebIDL = require('WebIDL');

    /**
     * The double type is a floating point numeric type that corresponds to the
     * set of finite double-precision 64 bit IEEE 754 floating point numbers. [IEEE-754]
     * double constant values in IDL are represented with float tokens.
     * @class
     * @extends IDLType
     * @param {Number} value - the value of this object.
     */
    WebIDL.Double = function(value) {
        var type = 'Double';
        if (!(this instanceof WebIDL.Double)) {
            return converter(value);
        }
        IDLType.call(this, type, converter, value);
    };
    WebIDL.Double.prototype = IDLType;

    /**
     * @param {any} V - the value to convert.
     */
    function converter(V) {
        //Let x be ToNumber(V).
        var x = Number(V);
        //If x is NaN, +Infinity or −Infinity, then throw a TypeError.
        if (isNaN(x) || x === +Infinity || x === -Infinity) {
            throw new TypeError();
        }
        //Return the IDL double value that has the same numeric value as x.
        return x;
    }
    return WebIDL.Double;
});
