/**
 * @module WebIDL/Any
 * @exports WebIDL.Any
 */
define(function(require) {
    'use strict';
    var WebIDL = require('WebIDL'),
        IDLType = require('WebIDL/types/IDLType'),
        UDouble = require('WebIDL/types/UnrestrictedDouble'),
        DOMString = require('WebIDL/types/DOMString');
    /**
     * The any type is the union of all other possible non-union types.
     * The any type is like a discriminated union type, in that each of
     * its values has a specific non-any type associated with it.
     * The particular type of an any value is known as its specific type.
     * (Values of union types also have specific types.)
     * @class
     * @extends IDLType
     * @param {any} value - the value to convert to WebID Any.
     * @return WebIDL.Any.
     */
    WebIDL.Any = function(value) {
        var type = 'Any';
        if (!(this instanceof WebIDL[type])) {
            return converter(value);
        }
        IDLType.call(this, type, converter, value);
    };
    WebIDL.Any.prototype = IDLType;

    /**
     * How to convert an ECMAScript value to an IDL any value
     * and the IDL boolean value false is converted to the ECMAScript false value.
     * [Converting to any](@link http://dev.w3.org/2006/webapi/WebIDL/#es-any)
     * @param {any} V - the value to convert to any.
     */
    function converter(V) {
        var type = typeof V;
        //The undefined value
        if (type === 'undefined') {
            //The IDL value is an object reference to a special object
            //that represents the ECMAScript undefined value.
            return undefined;
        }

        //The null value
        if (V === null) {
            //The IDL value is the null object? reference.
            return null;
        }

        //A Boolean value
        if (type === 'boolean') {
            //The IDL value is the boolean value that represents the same truth
            //value.
            return V;
        }

        //A Number value
        if (type === 'number') {
            //The IDL value is that which is obtained by following the rules
            //for converting the Number to an IDL unrestricted double value,
            //as described in section 4.2.15, below.
            return WebIDL.UnrestrictedDouble(V);
        }

        //A String value
        if (type === 'string') {
            //The IDL value is that which is obtained by following
            //the rules for converting the String to an IDL DOMString
            //value, as described in section 4.2.16, below.
            return WebIDL.DOMString(V);
        }

        //An object value
        if (type === 'object' && V !== null) {
            //The IDL value is an object value that references the same object.
            return V;
        }
    }
    return WebIDL.Any;
});
