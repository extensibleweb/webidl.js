/**
 * 3.10.2. boolean
 * The boolean type has two values: true and false.
 * boolean constant values in IDL are represented with the true and false tokens.
 * The type name of the boolean type is “Boolean”.
 **/
define(function(require) {
    'use strict';
    var IDLType = require('WebIDL/types/IDLType'),
        WebIDL = require('WebIDL');
    WebIDL.Boolean = function(value) {
        if (!(this instanceof WebIDL.Boolean)) {
            return toBoolean(value);
        }
        IDLType.call(this, 'Boolean', toBoolean, value);
    };
    /*
    4.2.3. boolean
    The IDL boolean value true is converted to the ECMAScript true value
    and the IDL boolean value false is converted to the ECMAScript false value.
    http://dev.w3.org/2006/webapi/WebIDL/#es-boolean
    An ECMAScript value V is converted to an IDL boolean value by running the following algorithm:
    */
    function toBoolean(V) {
        //Let x be the result of computing ToBoolean(V).
        var x = window.Boolean(V);
        //Return the IDL boolean value that is the one that represents the same
        //truth value as the ECMAScript Boolean value x.
        return x;
    }

    WebIDL.Boolean.prototype = IDLType;
    return WebIDL.Boolean;
});
