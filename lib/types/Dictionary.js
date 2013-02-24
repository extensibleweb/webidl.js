/*
3.10.19. Dictionary types
An identifier that identifies a dictionary is used to refer to a type
that corresponds to the set of all dictionaries that adhere to 
the dictionary definition.

IDL dictionary type values are represented by ECMAScript Object values. 
Properties on the object (or its prototype chain) correspond to 
dictionary members.

There is no way to represent a constant dictionary value in IDL.
*/
define(function(require) {
    'use strict';
    var IDLType = require('WebIDL/types/IDLType'),
        WebIDL = require('WebIDL/interfaces/WebIDL');

    WebIDL.Dictionary = function(value, identifier, inheritanceChain) {
        if (!(this instanceof WebIDL.Dictionary)) {
            return toDictionary(value, inheritanceChain);
        }
        //The type name of a dictionary type is the identifier of 
        //the dictionary.
        IDLType.call(this, indentifier, toDictionary, value);
    };

    //An ECMAScript value V is converted to an IDL dictionary type value by
    //running the following algorithm (where D is the dictionary):
    function toDictionary(V, dictionaries){
        var type, dict; 
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
        //If Type(V) is not Undefined, Null or Object, then throw a TypeError.
        type = es5Type(V); 
        if(["Undefined", "Null", "Object"].indexOf(type) === -1){
            throw new TypeError();
        }

        //If V is a native Date object or a native RegExp object, 
        //then throw a TypeError.
        if(V instanceof Date || V instanceof RegExp ){
            throw new TypeError();
        }
        //Let dict be an empty dictionary value of type D; 
        //every dictionary member is initially considered to be not present.
        dict = {}; 

        //Let dictionaries be a list consisting of D and all of D’s inherited dictionaries, 
        //in order from least to most derived.
        //For each dictionary dictionary in dictionaries, in order:
        dictionaries.forEach(function(dictionary){
            //For each dictionary member member declared on dictionary, in order:
            dictionary.forEach(function(member){
                //Let key be the identifier of member.
                var key = member.identifier,
                //Let present be false if Type(V) is Undefined or Null, or the result of 
                //calling the [[HasProperty]] internal method on V with 
                //property name key otherwise.
                    present = es5Type(["Undefined", "Null"].indexOf(type))|| key in V;
                
                If present is true, then:
                Let value be the result of calling the [[Get]] internal method on V with property name key.
                Let idlValue be the result of converting value to an IDL value whose type is the type member is declared to be of.
                Set the dictionary member on dict with key name key to the value idlValue. This dictionary member is considered to be present.
                Otherwise, if present is false but the dictionary member has a default value, then:
                Let idlValue be the dictionary member’s default value.
                Set the dictionary member on dict with key name key to the value idlValue. This dictionary member is considered to be present.
        
        //Return dict.
        return dict;
        Note
        The order that dictionary members are looked up on the ECMAScript object are not necessarily the same as the object’s property enumeration order.

    An IDL dictionary value V is converted to an ECMAScript Object value by running the following algorithm (where D is the dictionary):

    Let O be a new Object value created as if by the expression ({}).
    Let dictionaries be a list consisting of D and all of D’s inherited dictionaries, in order from least to most derived.
    For each dictionary dictionary in dictionaries, in order:
    For each dictionary member member declared on dictionary, in order:
    Let key be the identifier of member.
    If the dictionary member named key is present on V, then:
    Let idlValue be the value of member on V.
    Let value be the result of converting idlValue to an ECMAScript value.
    Call the [[DefineOwnProperty]] internal method on O with property name key, descriptor { [[Writable]]: true, [[Enumerable]]: true, [[Configurable]]: true, [[Value]]: value } and Boolean flag false.
    Return O.
    
    WebIDL.Boolean.prototype = IDLType;
    return WebIDL.Boolean;
});