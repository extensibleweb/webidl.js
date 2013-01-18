require(['types/CallbackFunction'], function() {
    'use strict';
    var assertion, QUnit = window.QUnit;

    module('WebIDL CallbackFunction', {
        setup: function() {},
        teardown: function() {}
    });

    assertion = "If the result of calling IsCallable(V) is false, then then throw a TypeError.";
    QUnit.test(assertion, function() {
    });
});
