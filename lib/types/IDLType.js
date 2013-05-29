/*
Non-standard base type.
*/
define(function() {
    'use strict';

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
