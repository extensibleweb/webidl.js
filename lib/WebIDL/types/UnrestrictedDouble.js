/**
 * @module WebIDL/UnrestrictedDouble
 * @exports WebIDL.UnrestrictedDouble
 */
define(function(require) {
    'use strict';
    var IDLType = require('WebIDL/types/IDLType'),
        WebIDL = require('WebIDL');
    /**
     * The unrestricted double type is a floating point numeric type that corresponds
     * to the set of all possible double-precision 64 bit IEEE 754 floating point
     * numbers, finite and non-finite. [IEEE-754]
     * unrestricted double constant values in IDL are represented with float tokens.
     * @class
     */
    WebIDL.UnrestrictedDouble = function(value) {
        var type = 'UnrestrictedDouble';
        if (!(this instanceof WebIDL.UnrestrictedDouble)) {
            return converter(value);
        }
        IDLType.call(this, type, converter, value);
    };
    WebIDL.UnrestrictedDouble.prototype = IDLType;

    /**
     * The result of converting an IDL unrestricted double value to an ECMAScript value is a Number:
     * If the IDL unrestricted double value is a NaN, then the Number value is NaN.
     * Otherwise, the Number value is the one that represents the same numeric value as
     * the IDL unrestricted double value.
     * @param {any} V - the value to convert.
     */
    function converter(V) {
        //Let x be ToNumber(V).
        var x = Number(V);
        //If x is NaN, then return the IDL unrestricted double value that
        //represents the IEEE 754 NaN value with the bit pattern
        //0x7ff8000000000000 [IEEE-754].
        if (isNaN(x)) {
            return 0x7ff8000000000000;
        }
        return x;
    }
    return WebIDL.UnrestrictedDouble;
});
