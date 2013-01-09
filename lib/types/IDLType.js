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
                }
            },
            extendedAttrs: {
                get: function() {
                    return extendedAttrs;
                },
                set: function(attrs) {
                    extendedAttrs = String(attrs);
                }
            }
        };
        Object.defineProperties(this, props);
    }
    return IDLType;
});