/**
The any type is the union of all other possible non-union types.
Its type name is “Any”.
The any type is like a discriminated union type, in that each of
its values has a specific non-any type associated with it. 
For example, one value of the any type is the unsigned long 150, 
while another is the long 150. These are distinct values.
The particular type of an any value is known as its specific type.
(Values of union types also have specific types.)
**/

define(function(require) {
    'use strict';
    var IDLType = require('WebIDL/types/IDLType'),
        WebIDL = require('WebIDL/interfaces/WebIDL'),
        UDouble = require('WebIDL/types/UnrestrictedDouble'),
        DOMString = require('WebIDL/types/DOMString');

    WebIDL.Any = function(value) {
        if (!(this instanceof WebIDL.Any)) {
            return toAny(value);
        }
        IDLType.call(this, 'Any', toAny, value);
    };

    //How to convert an ECMAScript value to an IDL any value
    //depends on the type of the ECMAScript value:


    function toAny(V) {
        var type = typeof V;
        //The undefined value
        if (type === "undefined") {
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
        if (type === "boolean") {
            //The IDL value is the boolean value that represents the same truth
            //value.
            return V;
        }

        //A Number value
        if (type === "number") {
            //The IDL value is that which is obtained by following the rules
            //for converting the Number to an IDL unrestricted double value,
            //as described in section 4.2.15, below.
            return WebIDL.UnrestrictedDouble(V);
        }

        //A String value
        if (type === "string") {
            //The IDL value is that which is obtained by following
            //the rules for converting the String to an IDL DOMString
            //value, as described in section 4.2.16, below.
            return WebIDL.DOMString(V);
        }

        //An object value
        if (type === "object" && V !== null) {
            //The IDL value is an object value that references the same object.
            return V;
        }
    }
    WebIDL.Any.prototype = IDLType;
    return WebIDL.Any;
});