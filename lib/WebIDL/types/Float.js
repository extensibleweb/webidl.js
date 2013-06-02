/**
 * @module WebIDL/Float
 * @exports WebIDL.Float
 */
define(function(require) {
    'use strict';
    var IDLType = require('WebIDL/types/IDLType'),
        WebIDL = require('WebIDL');

    /**
     * The float type is a floating point numeric type that corresponds to the set of
     * finite single-precision 32 bit IEEE 754 floating point numbers. [IEEE-754] float
     * constant values in IDL are represented with float tokens.
     * @class
     * @extends IDLType
     * @param value {any} the value of the object.
     */
    WebIDL.Float = function(value) {
        var property, storage, type = 'Float';
        if (!(this instanceof WebIDL.Float)) {
            return converter(value);
        }
        IDLType.call(this, type, converter, value);

        //We have slightly more complicated storage requirements than the default
        //IDLType allows for.
        storage = new Float32Array(new ArrayBuffer(4));
        property = Object.getOwnPropertyDescriptor(this, 'value');
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
    WebIDL.Float.prototype = IDLType;

    /**
     * The result of converting an IDL float value to an ECMAScript value is the
     * Number value that represents the same numeric value as the IDL float value.
     */
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

        //1. Let x be ToNumber(V).
        x = Number(V);
        //2. If x is NaN, +Infinity or −Infinity, then throw a TypeError.
        if (isNaN(x) || x === +Infinity || x === -Infinity) {
            throw new TypeError();
        }
        //3. Let S be the set of finite IEEE 754 single-precision floating point
        //values except −0, but with two special values added: 2^128 and −2^128.
        //4. Let y be the number in S that is closest to x, selecting the number
        //with an even significand if there are two equally close values
        //([ECMA-262], section 8.5). (The two special values 2^128 and −2^128 are
        //considered to have even significands for this purpose.)
        y = new Float32Array(new ArrayBuffer(4));
        y[0] = x;
        //5. If y is 2^128 or −2^128, then throw a TypeError.
        if (y[0] === +Infinity || y[0] === -Infinity) {
            throw new TypeError();
        }
        //6. If y is +0 and x is negative, return −0.
        if (y[0] === 0 && !isNegative0(y[0]) && x < 0 || isNegative0(x)) {
            return -0;
        }
        //7. Return y.
        return y[0];
    }
    return WebIDL.Float;
});