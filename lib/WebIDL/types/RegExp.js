/**
 * @module WebIDL/RegExp
 * @exports WebIDL.RegExp
 */
define(function(require) {
    'use strict';
    var IDLType = require('WebIDL/types/IDLType'),
        WebIDL = require('WebIDL');
    /**
     * The RegExp type is a type whose values are references to objects that
     * represent regular expressions. The particular regular expression
     * language and the features it supports is language binding specific.
     * @class
     * @extends IDLType
     * @param {RegExp} value - The value of this object.
     */
    WebIDL.RegExp = function(value) {
        var type = 'RegExp';
        if (!(this instanceof WebIDL.RegExp)) {
            return converter(value);
        }
        IDLType.call(this, type, converter, value);
    };
    WebIDL.RegExp.prototype = IDLType;

    /**
     * The result of converting an IDL RegExp value to an ECMAScript value is the
     * RegExp value that represents a reference to the same object that
     * the IDL RegExp represents.
     * IDL RegExp values are represented by ECMAScript RegExp objects.
     * @param {any} V - the value to convert.
     */
    function converter(V) {
        var nativeBrand = Object.prototype.toString.apply(V),
            regex;

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

        //If Type(V) is not Object, or the value of the internal [[NativeBrand]]
        //property of V is not “RegExp”,
        if (es5Type(V) !== 'Object' || nativeBrand !== '[object RegExp]') {
            //then set V to be a newly created RegExp
            //object created as if by the expression new RegExp(V),
            //where RegExp is the standard built-in constructor with that name.
            V = new RegExp(V);
        }
        //Return the IDL RegExp value that is a reference to the same object as V.
        return V;
    }
    return WebIDL.RegExp;
});
