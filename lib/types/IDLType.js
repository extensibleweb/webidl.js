define(function() {
    'use strict';

    function IDLType(type, converter, extendedAttrs) {
        var value, props = {
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
                },
                set: function(V) {
                    type = String(V);
                    return type;
                },
                configurable: true
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
    }
    return IDLType;
});