/**
 * 3.10.7. long
 * The long type is a signed integer type that has values in the range [−2147483648, 2147483647].
 * long constant values in IDL are represented with integer tokens.
 * The type name of the long type is “Long”.
 **/

define(function(require) {
    'use strict';
    var IDLType = require('WebIDL/types/IDLType'),
        WebIDL = require('WebIDL');

    WebIDL.Long = function(value, extendedAttr) {
        if (!(this instanceof WebIDL.Long)) {
            return toLong(value, extendedAttr);
        }
        IDLType.call(this, 'Long', toLong, value, extendedAttr);
    };

    //The result of converting an IDL long value to an ECMAScript value is a
    //Number that represents the same numeric value as the IDL long value.
    //The Number value will be an integer in the range [−2147483648, 2147483647].

    //An ECMAScript value V is converted to an IDL long value by running the following algorithm:
    function toLong(V, extendedAttr) {
        var x;
        /*
        http://es5.github.com/#x9.5
        9.5 ToInt32: (Signed 32 Bit Integer) # Ⓣ
        The abstract operation ToInt32 converts its argument to one of 232 integer values in the range −231 through 231−1, inclusive. This abstract operation functions as follows:
        */
        function esToInt32(x) {
            //Let number be the result of calling ToNumber on the input argument.
            var number = Number(x),
                posInt, n, int32bit;
            //If number is NaN, +0, −0, +∞, or −∞, return +0.
            if (isNaN(number) || number === 0 || number === Infinity || number === -Infinity) {
                return +0;
            }
            //Let posInt be sign(number) * floor(abs(number)).
            posInt = ((number > 0) ? 1 : -1) * Math.floor(Math.abs(number));
            //Let int32bit be posInt modulo 232; that is, a finite integer value k of
            //Number type with positive sign and less than
            //232 in magnitude such that the mathematical difference of
            //posInt and k is mathematically an integer multiple of 232.
            n = Math.pow(2, 32);
            int32bit = ((posInt % n) + n) % n;
            //If int32bit is greater than or equal to 231,
            if (int32bit >= Math.pow(2, 31)) {
                //return int32bit − 2^32,
                return int32bit - Math.pow(2, 32);
            }
            //otherwise return int32bit.
            return int32bit;
        }
        //Initialize x to ToNumber(V).
        x = Number(V);


        //If the conversion to an IDL value is being performed due to any of the following:
        if (extendedAttr === 'EnforceRange') {
            //V is being assigned to an attribute annotated with the [EnforceRange] extended attribute,
            //V is being passed as an operation argument annotated with the [EnforceRange] extended attribute, or
            //V is being used as the value of dictionary member annotated with the [EnforceRange] extended attribute,
            //then:
            //If x is NaN, +∞, or −∞, then throw a TypeError.
            if (isNaN(x) || x === +Infinity || x === -Infinity) {
                throw new TypeError();
            }

            //Set x to sign(x) * floor(abs(x)).
            x = ((x > 0) ? 1 : -1) * Math.floor(Math.abs(x));

            //If x < −2^31 or x > 2^31 − 1, then throw a TypeError.
            if (x < Math.pow(-2, 31) || x > (Math.pow(2, 31) - 1)) {
                throw new TypeError();
            }
            //Return the IDL long value that represents the same numeric value as x.
            return x;
        }
        if (extendedAttr === 'Clamp') {
            //If x is not NaN and the conversion to an IDL value is being performed due to any of the following:
            //V is being assigned to an attribute annotated with the [Clamp] extended attribute,
            //V is being passed as an operation argument annotated with the [Clamp] extended attribute, or
            //V is being used as the value of dictionary member annotated with the [Clamp] extended attribute,
            //then:
            //Set x to min(max(x, −2^31), 2^31 − 1).
            x = Math.min(Math.max(x, Math.pow(-2, 31)), Math.pow(2, 31) - 1);
            //Round x to the nearest integer, choosing the even integer if it lies halfway between two, and choosing +0 rather than −0.
            x = Math.abs(x - Math.round(x)) === 0.5 ? (((Math.round(x) % 2) === 0) ? Math.round(x) : Math.floor(x)) : Math.round(x);
            //Return the IDL long value that represents the same numeric value as x.
            return x;
        }
        //Set x to ToInt32(x).
        x = esToInt32(x);
        //Return the IDL long value that represents the same numeric value as x.
        return x;
    }

    WebIDL.Long.prototype = IDLType;
    return WebIDL.Long;
});
