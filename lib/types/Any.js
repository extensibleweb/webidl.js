define(function(require) {
    'use strict';
    var IDLType = require('types/IDLType'),
        WebIDL = require('interfaces/WebIDL');

    WebIDL.Object = function(value) {
        if (!(this instanceof WebIDL.Object)) {
            return toAny(value);
        }
        this.value = value;
    };

    function toAny(){

    }

    WebIDL.Object.prototype = new IDLType('Any', toAny);
});