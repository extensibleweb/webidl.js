/**
 * @module WebIDL/Octet
 * @exports WebIDL.Octet
 */
define(function(require) {
    'use strict';
    var IDLType = require('WebIDL/types/IDLType'),
        WebIDL = require('WebIDL');

    /**
     * The octet type is an unsigned integer type that has values in the
     * range [0, 255].
     * octet constant values in IDL are represented with integer tokens.
     * @class
     * @extends IDLType
     * @param {Number} value - the value of this object.
     * @param {String} extendedAttr - Extended Attribute.
     */
    WebIDL.Octet = function(value, extendedAttr) {
        var type = 'Octet';
        if (!(this instanceof WebIDL.Octet)) {
            return converter(value, extendedAttr);
        }
        IDLType.call(this, type, converter, value, extendedAttr);
    };
    WebIDL.Octet.prototype = IDLType;
    /**
     * The result of converting an IDL octet value to an ECMAScript value
     * is a Number that represents
     * the same numeric value as the IDL octet value. The Number value will
     * be an integer in the range [0, 255].
     * @method
     * @param {any} V - the value to convert to any.
     */
    function converter(V, extendedAttr) {
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

            //If x < 0 or x > 28 − 1, then throw a TypeError.
            if (x < 0 || x > (Math.pow(2, 8) - 1)) {
                throw new TypeError();
            }
            //Return the IDL octet value that represents the same numeric value as x.
            return x;
        }
        //If x is not NaN and the conversion to an IDL value is being performed due to any of the following:
        if (!(isNaN(x)) && extendedAttr === 'Clamp') {
            //V is being assigned to an attribute annotated with the
            //[Clamp] extended attribute,
            //V is being passed as an operation argument annotated
            //with the [Clamp] extended attribute, or
            //V is being used as the value of dictionary member
            //annotated with the [Clamp] extended attribute,
            //then:
            //Set x to min(max(x, 0), 28 − 1).
            x = Math.min(Math.max(x, 0), Math.pow(2, 8) - 1);

            //Round x to the nearest integer, choosing the even integer if it lies halfway between two.
            x = Math.abs(x - Math.round(x)) === 0.5 ? (((Math.round(x) % 2) === 0) ? Math.round(x) : Math.floor(x)) : Math.round(x);
            //and choosing +0 rather than −0.
            x = (x === 0 && isNegative0(x)) ? +0 : x;
            //Return the IDL octet value that represents the same numeric value as x.
            return x;
        }

        //If x is NaN, +0, −0, +∞, or −∞, then return the IDL octet value that represents 0.
        if (isNaN(x) || x === 0 || x === +Infinity || x === -Infinity) {
            return 0;
        }
        //Set x to sign(x) * floor(abs(x)).
        x = ((x > 0) ? 1 : -1) * Math.floor(Math.abs(x));
        //Set x to x modulo 28.
        n = Math.pow(2, 8);
        x = ((x % n) + n) % n; //x % Math.pow(2, 8);
        //Return the IDL octet value that represents the same numeric value as x.
        return x;
    }
    return WebIDL.Octet;
});
