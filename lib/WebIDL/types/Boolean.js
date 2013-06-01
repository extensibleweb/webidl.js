/**
 * @module WebIDL/Boolean
 * @exports WebIDL.Boolean
 */
define(function(require) {
    'use strict';
    var IDLType = require('WebIDL/types/IDLType'),
        WebIDL = require('WebIDL');
    /**
    * The boolean type has two values: true and false.
    * Boolean constant values in IDL are represented
    * with the true and false tokens.
    * See {@link http://dev.w3.org/2006/webapi/WebIDL/#idl-boolean WebIDL boolean}.
    * @class
    * @extends IDLValue
    * @param {any} value - the value to convert to a boolean.
    */
    WebIDL.Boolean = function(value) {
        var type = 'Boolean';
        if (!(this instanceof WebIDL.Boolean)) {
            return converter(value);
        }
        IDLType.call(this, type, converter, value);
    };
    WebIDL.Boolean.prototype = IDLType;

    /**
    * The IDL boolean value true is converted to the ECMAScript true value
    * and the IDL boolean value false is converted to the ECMAScript false value.
    * @see <a href="http://dev.w3.org/2006/webapi/WebIDL/#es-boolean">Converting to boolean</a>
    * @method
    * @param {any} V - the value to convert to a boolean.
    */
    function converter(V) {
        //Let x be the result of computing ToBoolean(V).
        var x = !!V;
        //Return the IDL boolean value that is the one that represents the same
        //truth value as the ECMAScript Boolean value x.
        return x;
    }
    return WebIDL.Boolean;
});
