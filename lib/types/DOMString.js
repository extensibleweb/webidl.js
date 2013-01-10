/**
 * 3.10.15. DOMString
 * The DOMString type corresponds to the set of all possible sequences of code units. Such sequences are commonly interpreted as UTF-16 encoded strings
 * [RFC2781] although this is not required. While DOMString is defined to be an OMG IDL boxed sequence<unsigned short> valuetype in DOM Level 3 Core
 * ([DOM3CORE], section 1.2.1), this document defines DOMString to be an intrinsic type so as to avoid special casing that sequence type in various
 * situations where a string is required.
 * 
 * The type name of the DOMString type is “String”.
 * 
 * Note
 * Note also that null is not a value of type DOMString. To allow null, a nullable DOMString, written as DOMString? in IDL, needs to be used.
 **/
define(function (require) {
    'use strict';
    var IDLType = require("types/IDLType"),
        WebIDL = require("interfaces/WebIDL");

    WebIDL.DOMString = function (value, extendedAttr) {
        if (!(this instanceof WebIDL.DOMString)) {
            return toDOMString(value, extendedAttr);
        }
        this.value = value;
        this.extendedAttrs = extendedAttr;
    };
    
    /*
    The result of converting an IDL DOMString value to an ECMAScript value is the String value
    that represents the same sequence of code units that the IDL DOMString represents.
    An ECMAScript value V is converted to an IDL DOMString value by running the following algorithm:
    */
    function toDOMString(V, operation) {
        var x;
        //If V is null and the conversion to an IDL value is being performed due to any of the following:
        if (V === null && operation === "TreatNullAs=EmptyString") {
            //V is being passed as an operation argument that is annotated with the [TreatNullAs=EmptyString],
            //V is being assigned to an attribute annotated with [TreatNullAs=EmptyString],
            //V is being returned from a user object implementation of an operation annotated with [TreatNullAs=EmptyString], or
            //V is being returned from a user object implementation of an attribute annotated with [TreatNullAs=EmptyString],
            //then return the DOMString value that represents the empty string.
            return "";
        }
        //If V is undefined and the conversion to an IDL value is being performed due to any of the following:
        if (V === undefined && operation === "TreatUndefinedAs=EmptyString") {
            //V is being passed as an operation argument that is annotated with the [TreatUndefinedAs=EmptyString],
            //V is being assigned to an attribute annotated with [TreatUndefinedAs=EmptyString],
            //V is being returned from a user object implementation of an operation annotated with [TreatUndefinedAs=EmptyString], or
            //V is being returned from a user object implementation of an attribute annotated with [TreatUndefinedAs=EmptyString],
            //then return the DOMString value that represents the empty string.
            return "";
        }
        //Let x be ToString(V).
        x = String(V);
        //Return the IDL DOMString value that represents the same sequence of code units as the one the ECMAScript String value x represents.
        return x;
    }
    
    WebIDL.DOMString.prototype = new IDLType('String', toDOMString);
});
