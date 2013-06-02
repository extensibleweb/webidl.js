/**
 * @module WebIDL/ByteString
 * @exports WebIDL.ByteString
 */
define(function(require) {
    'use strict';
    var IDLType = require('WebIDL/types/IDLType'),
        WebIDL = require('WebIDL');
    /**
     * The ByteString type corresponds to the set of all possible sequences of
     * bytes. Such sequences might be interpreted as UTF-8 encoded strings
     * [RFC3629] or strings in some other 8-bit-per-code-unit encoding,
     * although this is not required.
     * @class
     * @extends IDLType
     * @param value {String} the value of this object.
     */
    WebIDL.ByteString = function(value) {
        var type = 'ByteString';
        if (!(this instanceof WebIDL.ByteString)) {
            return converter(value);
        }
        IDLType.call(this, type, converter, value);
    };
    WebIDL.ByteString.prototype = IDLType;

    /**
     * The result of converting an IDL ByteString value to an ECMAScript value
     * is a String value whose length is the length of the ByteString,
     * and the value of each element of which is the value of the corresponding
     * element of the ByteString.
     * @param V {any} the value to be converted.
     */
    function converter(V) {
        //Let x be ToString(V).
        var x = String(V);
        //If the value of any element of x is greater than 255,
        //then throw a TypeError.
        for (var i = x.length - 1; i >= 0; i--) {
            if (x.charCodeAt(i) > 255) {
                throw new TypeError();
            }
        }
        //Return an IDL ByteString value whose length is the length of x,
        //and where the value of each element is the value of the corresponding element of x.
        return ''.concat(x);
    }
    return WebIDL.ByteString;
});