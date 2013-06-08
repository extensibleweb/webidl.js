/**
 * @module WebIDL/Enumeration
 * @exports WebIDL.Enumeration
 */
define(function(require) {
    'use strict';
    var WebIDL = require('WebIDL'),
        IDLType = require('WebIDL/types/IDLType');

    /**
     * An identifier that identifies an enumeration is used to refer to a
     * type whose values are the set of strings (sequences of code units,
     * as with DOMString) that are the enumeration’s values.
     *
     * @class
     * @extends IDLType
     *
     * @param identifier {String} - the name of the emum, serves as the type.
     * @param enums {String[]} - a list of possible values.
     * @param value {String} - optional, a value to check.
     */
    WebIDL.Enumeration = function(identifier, enums, value) {
        if (!(this instanceof WebIDL.Enumeration)) {
            return converterValue(value, enums);
        }
        if (!(enums instanceof Array)) {
            throw new TypeError('enums must be an array');
        }
        //type check each of the enums
        for (var i = enums.length - 1; i >= 0; i--) {
            if (typeof enums[i] !== 'string') {
                throw new TypeError('Enumeration types must be a string');
            }
        }
        IDLType.call(this, identifier, converter, enums);
    };
    WebIDL.Enumeration.prototype = IDLType;

    /**
     * Checks to see if an enum has a value.
     * @param {String} value - the value to check against the enum values.
     */
    WebIDL.Enumeration.prototype.has = function(value) {
        try {
            converterValue(value, this.value);
        } catch (e) {
            return false;
        }
        return true;
    };

    function converter(enums) {
        return enums.slice();
    }

    /**
     * The result of converting an IDL enumeration type value to an ECMAScript
     * value is the String value that represents the same sequence of code units
     * as the enumeration value.
     * @param {any} V - the value to verify.
     * @param {String[]} enumValues - the enum to check against.
     */
    function converterValue(V, enumValues) {
        //Let S be the result of calling ToString(V).
        var S = String(V);
        //If S is not one of E’s enumeration values, then throw a TypeError.
        //Return the enumeration value of type E that is equal to S.
        for (var i = enumValues.length - 1, E; i >= 0; i--) {
            E = enumValues[i];
            if (E === S) {
                return E;
            }
        }
        throw new TypeError();
    }
    return WebIDL.Enumeration;
});