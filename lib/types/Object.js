/**
 * IDL object values are represented by ECMAScript Object values.
 *
 * An ECMAScript value V is converted to an IDL object value by running the following algorithm:
 *
 * If Type(V) is not Object, then throw a TypeError.
 * Return the IDL object value that is a reference to the same object as V.
 * The result of converting an IDL object value to an ECMAScript value is the Object value that represents a reference to the same object that the IDL object represents.
 **/
define(function(require) {
    'use strict';
    var IDLType = require('types/IDLType'),
        WebIDL = require('interfaces/WebIDL');

    WebIDL.Object = function(value) {
        if (!(this instanceof WebIDL.Object)) {
            return toObject(value);
        }
        IDLType.call(this,'Object', toObject, value)
    };

    //4.2.18. object
    //The result of converting an IDL object value to an ECMAScript value is
    //the Object value that represents a reference to the same object that the IDL object represents.
    //IDL object values are represented by ECMAScript Object values.
    //An ECMAScript value V is converted to an IDL object value by running the following algorithm:
    function toObject(V) {
        //If Type(V) is not Object, then throw a TypeError.
        //Note: Type(V) is defined here: http://es5.github.com/#Type
        if (V === null || (typeof(V) !== 'object' && typeof(V) !== 'function')) {
            throw new TypeError();
        }
        //Return the IDL object value that is a reference to the same object as V.
        return V;
    }
    WebIDL.Object.prototype = IDLType;
    return WebIDL.Object;
});