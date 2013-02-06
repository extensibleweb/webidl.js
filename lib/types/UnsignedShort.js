/**
 * 3.10.6. unsigned short
 * The unsigned short type is an unsigned integer type that has values in the range [0, 65535].
 * unsigned short constant values in IDL are represented with integer tokens.
 * The type name of the unsigned short type is “UnsignedShort”.
 **/
define(function(require) {
    'use strict';
    var IDLType = require('WebIDL/types/IDLType'),
        WebIDL = require('WebIDL/interfaces/WebIDL');

    WebIDL.UnsignedShort = function(value, extendedAttr) {
        if (!(this instanceof WebIDL.UnsignedShort)) {
            return toUnsignedShort(value, extendedAttr);
        }
        IDLType.call(this, 'UnsignedShort', toUnsignedShort, value, extendedAttr);
    };

    //The result of converting an IDL unsigned short value to an ECMAScript value is a Number that represents the same numeric value as the IDL unsigned short value. The Number value will be an integer in the range [0, 65535].
    //An ECMAScript value V is converted to an IDL unsigned short value by running the following algorithm:

    function toUnsignedShort(V, extendedAttr) {
        //Initialize x to ToNumber(V).
        var x = Number(V),
            xRounded;
        if (extendedAttr === 'EnforceRange') {
            //If the conversion to an IDL value is being performed due to any of the following:
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
            //If x < 0 or x > 2^16 − 1, then throw a TypeError.
            if (x < 0 || x > (Math.pow(2, 16) - 1)) {
                throw new TypeError();
            }
            //Return the IDL unsigned short value that represents the same numeric value as x.
            return x;
        }
        if (extendedAttr === 'Clamp') {
            //If x is not NaN and the conversion to an IDL value is being performed due to any of the following:
            //V is being assigned to an attribute annotated with the [Clamp] extended attribute,
            //V is being passed as an operation argument annotated with the [Clamp] extended attribute, or
            //V is being used as the value of dictionary member annotated with the [Clamp] extended attribute,
            //then:
            //Set x to min(max(x, 0), 2^16 − 1).
            x = Math.min(Math.max(x, 0), Math.pow(2, 16) - 1);
            //Round x to the nearest integer, choosing the even integer if it lies halfway between two,
            //and choosing +0 rather than −0.
            xRounded = Math.round(x);
            x = Math.abs(x - xRounded) === 0.5 ? (((xRounded % 2) === 0) ? xRounded : Math.floor(x)) : xRounded;
            //Return the IDL unsigned short value that represents the same numeric value as x.
        }
        //Set x to ToUint16(x).
        x = es5toUint16(x);
        //Return the IDL unsigned short value that represents the same numeric value as x.
        return x;
    }

    //9.7 ToUint16: (Unsigned 16 Bit Integer)
    //http://es5.github.com/#x9.7
    function es5toUint16(x) {
        var number, posInt, n, int16bit;
        //Let number be the result of calling ToNumber on the input argument.
        number = Number(x);
        //If number is NaN, +0, −0, +∞, or −∞, return +0.
        if (isNaN(number) || number === 0 || number === Infinity || number === -Infinity) {
            return +0;
        }
        //Let posInt be sign(number) * floor(abs(number)).
        posInt = ((number > 0) ? 1 : -1) * Math.floor(Math.abs(number));
        //Let int16bit be posInt modulo 2^16; that is, a finite integer value k of Number type with
        //positive sign and less than 2^16 in magnitude such that the mathematical difference of
        //posInt and k is mathematically an integer multiple of 2^16.
        n = Math.pow(2, 16);
        int16bit = ((posInt % n) + n) % n;
        //Return int16bit.
        return int16bit;
    }
    WebIDL.UnsignedShort.prototype = IDLType;
    return WebIDL.UnsignedShort;
});