/**
 * @module WebIDL/CallbackFunction
 * @exports WebIDL.CallbackFunction
 */
define(function(require) {
    'use strict';
    var IDLType = require('WebIDL/types/IDLType'),
        WebIDL = require('WebIDL');
    /**
     * @class
     * @constructor
     * @param value {Function} - the function to call back.
     * @param identifier {String} - The name callback function.
     */
    WebIDL.CallbackFunction = function(value, identifier) {
        var props;
        if (!identifier) {
            identifier = ('name' in value)? value.name : '';
        }
        if (!(this instanceof WebIDL.CallbackFunction)) {
            return converter(value);
        }
        //The type name of a callback function type is the
        //identifier of the callback function.
        IDLType.call(this, identifier, converter, value);
    };
    WebIDL.CallbackFunction.prototype = IDLType;

    /**
     * The result of converting an IDL callback function type value to an ECMAScript
     * value is a reference to the same object that the IDL callback function type
     * value represents.
     * @param V {function} the value to be converted.
     */
    function converter(V) {
        if (typeof V !== 'function') {
            throw new TypeError();
        }
        return V;
    }
    return WebIDL.CallbackFunction;
});