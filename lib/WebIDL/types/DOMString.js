/**
 * @module WebIDL/DOMString
 * @exports WebIDL.DOMString
 **/
define(function(require) {
    'use strict';
    var IDLType = require('WebIDL/types/IDLType'),
        WebIDL = require('WebIDL');

    /**
     * The DOMString type corresponds to the set of allpossible sequences of
     * code units. Such sequences are commonly interpreted as UTF-16 encoded
     * strings [RFC2781] although this is not required.
     * @class
     * @extends IDLType
     */
    WebIDL.DOMString = function(value, extendedAttr) {
        var type = 'String';
        if (!(this instanceof WebIDL.DOMString)) {
            return converter(value, extendedAttr);
        }
        IDLType.call(this, type, converter, value, extendedAttr);
    };
    WebIDL.DOMString.prototype = IDLType;

    /**
     * The result of converting an IDL DOMString value to an ECMAScript value
     * is the String value that represents the same sequence of code units
     * that the IDL DOMString represents.
     */
    function converter(V, operation) {
        var x;
        //If V is null and the conversion to an IDL value is being performed
        //due to any of the following:
        if (V === null && operation === 'TreatNullAs=EmptyString') {
            //V is being passed as an operation argument that
            //is annotated with the [TreatNullAs=EmptyString],
            //V is being assigned to an attribute annotated with [TreatNullAs=EmptyString],
            //V is being returned from a user object implementation of an operation
            //annotated with [TreatNullAs=EmptyString], or
            //V is being returned from a user object implementation of an attribute
            //annotated with [TreatNullAs=EmptyString],
            //then return the DOMString value that represents the empty string.
            return '';
        }
        //If V is undefined and the conversion to an IDL value is being performed
        //due to any of the following:
        if (V === undefined && operation === 'TreatUndefinedAs=EmptyString') {
            //V is being passed as an operation argument that is annotated with the [TreatUndefinedAs=EmptyString],
            //V is being assigned to an attribute annotated with [TreatUndefinedAs=EmptyString],
            //V is being returned from a user object implementation of an operation annotated with [TreatUndefinedAs=EmptyString], or
            //V is being returned from a user object implementation of an attribute annotated with [TreatUndefinedAs=EmptyString],
            //then return the DOMString value that represents the empty string.
            return '';
        }
        //Let x be ToString(V).
        x = String(V);
        //Return the IDL DOMString value that represents the same
        //sequence of code units as the one the ECMAScript String value x represents.
        return x;
    }
    return WebIDL.DOMString;
});
