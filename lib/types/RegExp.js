/**
 * 3.10.27. RegExp
 * The RegExp type is a type whose values are references to objects that represent regular expressions. The particular regular expression language and the features it supports is language binding specific.
 * There is no way to represent a constant RegExp value in IDL.
 * The type name of the RegExp type is “RegExp”.
 **/

define(function(require) {
    'use strict';
    var IDLType = require('WebIDL/types/IDLType'),
        WebIDL = require('WebIDL');

    WebIDL.RegExp = function(value) {
        if (!(this instanceof WebIDL.RegExp)) {
            return toRegex(value);
        }
        IDLType.call(this, 'RegExp', toRegex, value);
    };

    //4.2.28. RegExp
    //The result of converting an IDL RegExp value to an ECMAScript value is the
    //RegExp value that represents a reference to the same object that the IDL RegExp represents.
    //IDL RegExp values are represented by ECMAScript RegExp objects.
    //An ECMAScript value V is converted to an IDL RegExp value by running the following algorithm:

    function toRegex(V) {
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

    WebIDL.RegExp.prototype = IDLType;
    return WebIDL.RegExp;
});
