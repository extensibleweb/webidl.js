define(function(){
    'use strict';
    function IDLType (type, converter) {
        var value,
            props = {
                value:{
                    get: function() {
                        return value;
                    },
                    set: function(V) {
                        value = converter(V);
                        return value;
                    }
                },
                type: {
                    get: function() {
                        return type;
                    }
                }
            };
        Object.defineProperties(this, props);
    }
    return IDLType;
});