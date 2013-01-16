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
        this.value = value;
    };

    //4.2.18. object
    //The result of converting an IDL object value to an ECMAScript value is
    //the Object value that represents a reference to the same object that the IDL object represents.
    //IDL object values are represented by ECMAScript Object values.
    //An ECMAScript value V is converted to an IDL object value by running the following algorithm:
    function toObject(V) {
        //http://es5.github.com/#Type
        function es5Type(x) {
            //correct for null being returned as "Object"
            var type = (x === null) ? 'null' : typeof x;
            if (type === 'function') {
                //correct for function being an Object
                type = 'Object';
            } else {
                //uppercase first letter
                type = type.charAt(0).toUpperCase() + type.slice(1);
            }
            return type;
        }
        //If Type(V) is not Object, then throw a TypeError.
        if (es5Type(V) !== 'Object') {
            throw new TypeError();
        }
        //Return the IDL object value that is a reference to the same object as V.
        return V;
    }
    WebIDL.Object.prototype = new IDLType('Object', toObject);

});