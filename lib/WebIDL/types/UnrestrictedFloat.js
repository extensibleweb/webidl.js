/**
 * @module WebIDL/UnrestrictedFloat
 **/
define(function(require) {
    'use strict';
    var IDLType = require('WebIDL/types/IDLType'),
        WebIDL = require('WebIDL'),
        type = 'UnrestrictedFloat';
    /**
     * The unrestricted float type is a floating point numeric type that
     * corresponds to the set of all possible single-precision 32 bit
     * IEEE 754 floating point numbers, finite and non-finite. [IEEE-754]
     * unrestricted float constant values in IDL are represented with float
     * tokens.
     */
    WebIDL.UnrestrictedFloat = function(value) {
        var storage, property;
        if (!(this instanceof WebIDL.UnrestrictedFloat)) {
            return converter(value);
        }
        IDLType.call(this, type, converter, value);
        storage = new Float32Array(new ArrayBuffer(4));

        //We have slightly more complicated storage requirements than
        //the default IDLType allows for.
        property = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this), 'value');
        property.get = function() {
            return storage[0];
        };
        property.set = function(V) {
            storage[0] = converter(V);
            return storage[0];
        };
        Object.defineProperty(this, 'value', property);
        this.value = value;
    };
    WebIDL.UnrestrictedFloat.prototype = IDLType;

    function converter(V) {
        var x, y;

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
        //Let x be ToNumber(V).
        x = Number(V);
        //If x is NaN, then return the IDL unrestricted float value that
        //represents the IEEE 754 NaN value with the bit pattern
        //0x7fc00000 [IEEE-754].
        if (isNaN(x)) {
            return 0x7fc00000;
        }
        //Let S be the set of finite IEEE 754 single-precision
        //floating point values except −0, but with two
        //special values added: 2^128 and −2^128.
        //Let y be the number in S that is closest to x, selecting
        //the number with an even significand if there are two equally
        //close values ([ECMA-262], section 8.5).
        //(The two special values 2128 and −2128 are considered
        //to have even significands for this purpose.)
        y = new Float32Array(new ArrayBuffer(4));
        y[0] = x;
        //If y is 2^128, return +∞.
        if (y[0] === +Infinity) {
            return +Infinity;
        }
        //If y is −2^128, return −∞.
        if (y[0] === -Infinity) {
            return -Infinity;
        }
        //If y is +0 and x is negative, return −0.
        if (y[0] === 0 && !isNegative0(y[0]) && x < 0 || isNegative0(x)) {
            return -0;
        }
        //Return y.
        return y[0];
    }
    return WebIDL.UnrestrictedFloat;
});
