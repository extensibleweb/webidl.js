/**
 * 3.10.14. unrestricted double
 * The unrestricted double type is a floating point numeric type that corresponds to the set of all possible double-precision 64 bit IEEE 754 floating point numbers, finite and non-finite. [IEEE-754]
 * unrestricted double constant values in IDL are represented with float tokens.
 * The type name of the unrestricted double type is “UnrestrictedDouble”.
 **/
define(function(require) {
    'use strict';
    var IDLType = require('types/IDLType'),
        WebIDL = require('interfaces/WebIDL');

    WebIDL.UnrestrictedDouble = function(value) {
        if (!(this instanceof WebIDL.UnrestrictedDouble)) {
            return toUnrestrictedDouble(value);
        }
        IDLType.call(this,'UnrestrictedDouble', toUnrestrictedDouble, value);
    };

    //The result of converting an IDL unrestricted double value to an ECMAScript value is a Number:
    // o If the IDL unrestricted double value is a NaN, then the Number value is NaN.
    // o Otherwise, the Number value is the one that represents the same numeric value as
    //   the IDL unrestricted double value.
    function toUnrestrictedDouble(V) {
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
    WebIDL.UnrestrictedDouble.prototype = IDLType; 
    return WebIDL.UnrestrictedDouble;
});