/**
 * @module WebIDL/IDLType
 * @exports IDLType
 */
define(function() {
    'use strict';
    /**
     * Non-standard base class for WebIDL types. Provides standardized
     * functionality and ways of accessing various properties. On it's own
     * this class serves no purpose.
     * @class
     * @abstract
     *
     * @property {any} value - Get and set the value for this object.
     * @property {String} type - Get the type of this object.
     * @property {String} extendedAttrs - Get and set a extended attributes.
     * @property {function} converter - Get the converter
     *
     * @param {string} type - the type identifier (e.g., Byte).
     * @param {function} converter - type converter.
     * @param {any} value - the value to be stored/converted.
     * @param {array} extendedAttrs - extended attributes supported by this type.
     */
    function IDLType(type, converter, value, extendedAttrs) {
        var props = {
            value: {
                get: function() {
                    return value;
                },
                set: function(V) {
                    value = converter(V, extendedAttrs);
                    return value;
                },
                configurable: true
            },
            type: {
                get: function() {
                    return type;
                }
            },
            extendedAttrs: {
                get: function() {
                    return extendedAttrs;
                },
                set: function(attrs) {
                    extendedAttrs = String(attrs);
                }
            },
            converter: {
                get: function() {
                    return converter;
                }
            }
        };
        Object.defineProperties(this, props);
        this.value = value;
    }
    return IDLType;
});