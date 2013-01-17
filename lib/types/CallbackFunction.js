/*
An identifier that identifies a callback function is used to refer to a type whose values are references to objects that are functions with the given signature.
There is no way to represent a constant callback function value in IDL.
*/

define(function(require) {
    'use strict';
    var IDLType = require('types/IDLType'),
        WebIDL = require('interfaces/WebIDL');

    WebIDL.CallbackFunction = function(value, type) {
        var props;
        if (!(this instanceof WebIDL.CallbackFunction)) {
            return toCallbackFunction(value);
        }

        //The type name of a callback function type is the identifier of the callback function.
        props = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this), 'type');
        props.get = function() {
            return type;
        };
        props.set = function(value) {
            var msg; 
            if((typeof value) !== "string"){
                msg = "type of CallbackFunction has to be a string";
                throw new TypeError(); 
            }
            return type;
        };
        Object.defineProperty(this, 'type', props);
        this.type = type;
        this.value = value;
    };

    /*
    The result of converting an IDL callback function type value to an ECMAScript 
    value is a reference to the same object that the IDL callback function type 
    value represents.
    An ECMAScript value V is converted to an IDL callback function type value by
    running the following algorithm:
    */

    function toCallbackFunction(V){
         //If the result of calling IsCallable(V) is false, then then throw a TypeError.
         if (typeof V !== 'function') {
            throw new TypeError();
         }
         //Return the IDL callback function type value that represents a 
         //reference to that Function object.
         return V;
    }

    WebIDL.CallbackFunction.prototype = new IDLType(undefined, toCallbackFunction);
});