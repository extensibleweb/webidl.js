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
     * type whose values are the set of strings (sequences of code units, as with DOMString)
     * that are the enumeration’s values.
     *
     * Like DOMString, there is no way to represent a constant enumeration value in IDL,
     * although enumeration-typed dictionary member default values can be specified
     * using a string literal.
     * @class
     * @extends IDLType
     */

    WebIDL.Enumeration = function(identifier, enums, value) {
        if (!(this instanceof WebIDL.Enumeration)) {
            return converter(value, enums);
        }
        //type check each of the enums
        for (var i = enums.length - 1; i >= 0; i--) {
            if (typeof enums[i] !== 'string') {
                throw new TypeError('Enumeration types must be a DOMString');
            }
        }
        IDLType.call(this, identifier, converter, value);
        this.enumValues = enums.slice(0);
    };

    WebIDL.Enumeration.prototype = IDLType;

    WebIDL.Enumeration.prototype.enumerate = function(value) {
        return converter(value, this.enumValues);
    };

    /**
	 * The result of converting an IDL enumeration type value to an ECMAScript
	 * value is the String value that represents the same sequence of code units
	 * as the enumeration value.
	 */
    function converter(V, enumValues) {
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
