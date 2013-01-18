/**
 * 3.10.13. double §
 * The double type is a floating point numeric type that corresponds to the
 * set of finite double-precision 64 bit IEEE 754 floating point numbers. [IEEE-754]
 * double constant values in IDL are represented with float tokens.
 * The type name of the double type is “Double”.
 **/
define(function(require) {
    'use strict';
    var IDLType = require('types/IDLType'),
        WebIDL = require('interfaces/WebIDL');

    WebIDL.Double = function(value) {
        if (!(this instanceof WebIDL.Double)) {
            return toDouble(value);
        }
        IDLType.call(this,'Double', toDouble, value);
    };
    /*
    4.2.14. double
    The result of converting an IDL double value to an ECMAScript
    value is the Number value that represents the same numeric value as the IDL double value.
    An ECMAScript value V is converted to an IDL double value by running the following algorithm:
    */
    function toDouble(V) {
        //1. Let x be ToNumber(V).
        var x = Number(V);
        //2. If x is NaN, +Infinity or −Infinity, then throw a TypeError.
        if (isNaN(x) || x === +Infinity || x === -Infinity) {
            throw new TypeError();
        }
        //3. Return the IDL double value that has the same numeric value as x.
        return x;
    }
    WebIDL.Double.prototype = IDLType;
    return WebIDL.Double;
});