/**
 * 3.10.5. short
 * The short type is a signed integer type that has values in the range
 * [−32768, 32767].
 *
 * short constant values in IDL are represented with integer tokens.
 * The type name of the short type is “Short”.
 **/
define(function(require) {
    'use strict';
    var IDLType = require('WebIDL/types/IDLType'),
        WebIDL = require('WebIDL');

    WebIDL.Short = function(value, extendedAttr) {
        if (!(this instanceof WebIDL.Short)) {
            return toShort(value, extendedAttr);
        }
        IDLType.call(this, 'Short', toShort, value, extendedAttr);
    };

    //An ECMAScript value V is converted to an IDL short value
    //by running the following algorithm:
    function toShort(V, extendedAttr) {
        //Initialize x to ToNumber(V).
        var x = Number(V),
            n;

        function isNegative0(x) {
            if (x !== 0) return false;
            var obj = Object.freeze({
                z: -0
            });
            try {
                Object.defineProperty(obj, 'z', {
                    value: x
                });
            } catch (e) {
                return false;
            }
            return true;
        }
        //If the conversion to an IDL value is being performed
        //due to any of the following:
        if (extendedAttr === 'EnforceRange') {
            //V is being assigned to an attribute annotated with
            //the [EnforceRange] extended attribute,
            //V is being passed as an operation argument annotated
            //with the [EnforceRange] extended attribute, or
            //V is being used as the value of dictionary member
            //annotated with the [EnforceRange] extended attribute,
            //then:
            //If x is NaN, +∞, or −∞, then throw a TypeError.
            if (isNaN(x) || x === +Infinity || x === -Infinity) {
                throw new TypeError();
            }
            //Set x to sign(x) * floor(abs(x)).
            x = ((x > 0) ? 1 : -1) * Math.floor(Math.abs(x));
            //If x < −215 or x > 215 − 1, then throw a TypeError.
            if (x < Math.pow(2, - 15) || x > (Math.pow(2, 15) - 1)) {
                throw new TypeError();
            }
            //Return the IDL short value that represents
            //the same numeric value as x.
            return x;
        }
        if (!isNaN(x) && extendedAttr === 'Clamp') {
            //If x is not NaN and the conversion to an IDL value is
            //being performed due to any of the following:
            //V is being assigned to an attribute annotated with the
            //[Clamp] extended attribute,
            //V is being passed as an operation argument annotated
            //with the [Clamp] extended attribute, or
            //V is being used as the value of dictionary member annotated
            //with the [Clamp] extended attribute,
            //then:
            //Round x to the nearest integer, choosing the even integer
            //if it lies halfway between two,
            x = Math.abs(x - Math.round(x)) === 0.5 ? (((Math.round(x) % 2) === 0) ? Math.round(x) : Math.floor(x)) : Math.round(x); //and choosing +0 rather than −0
            //and choosing +0 rather than −0.
            x = (x === 0 && isNegative0(x)) ? +0 : x;
            //Set x to min(max(x, −215), 215 − 1).
            x = Math.min(Math.max(x, Math.pow(-2, 15)), Math.pow(2, 15) - 1);
            //Return the IDL short value that represents the same
            //numeric value as x.
            return x;
        }
        //If x is NaN, +0, −0, +∞, or −∞, then return the IDL short
        //value that represents 0.
        if (isNaN(x) || x === +Infinity || x === -Infinity) {
            return 0;
        }
        //Set x to sign(x) * floor(abs(x)).
        x = ((x > 0) ? 1 : -1) * Math.floor(Math.abs(x));
        //Set x to x modulo 216.
        n = Math.pow(2, 16);
        x = ((x % n) + n) % n;
        //If x ≥ 215, return the IDL short value that represents
        //the same numeric value as x − 216.
        if (x >= Math.pow(2, 15)) {
            return x - Math.pow(2, 16);
        }
        //Otherwise, return the IDL short value that represents
        //the same numeric value as x.
        return x;
    }
    WebIDL.Short.prototype = IDLType;
    return WebIDL.Short;
});
