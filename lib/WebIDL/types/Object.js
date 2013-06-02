/**
 * @module WebIDL/Object
 * @exports WebIDL.Object
 */
define(function(require) {
    'use strict';
    var IDLType = require('WebIDL/types/IDLType'),
        WebIDL = require('WebIDL');

    /**
     * The object type corresponds to the set of all possible non-null 
     * object references.
     * @class
     * @extends IDLType
     * @param value {any} the value of the object.
     */
    WebIDL.Object = function(value) {
        var type = 'Object';
        if (!(this instanceof WebIDL.Object)) {
            return converter(value);
        }
        IDLType.call(this, type, converter, value);
    };
    WebIDL.Object.prototype = IDLType;
    /**
     * The result of converting an IDL object value to an ECMAScript value is
     * the Object value that represents a reference to the same object that
     * the IDL object represents.
     * IDL object values are represented by ECMAScript Object values.
     * @param {any} V - the value to convert.
     */
    function converter(V) {
        //If Type(V) is not Object, then throw a TypeError.
        //Note: Type(V) is defined here: http://es5.github.com/#Type
        if (V === null || (typeof(V) !== 'object' && typeof(V) !== 'function')) {
            throw new TypeError();
        }
        //Return the IDL object value that is a reference to the same object as V.
        return V;
    }
    return WebIDL.Object;
});
