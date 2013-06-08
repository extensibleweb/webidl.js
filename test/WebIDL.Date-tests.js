require(['WebIDL/types/Date'], function() {
    'use strict';
    var requirement, QUnit = window.QUnit;
    module('WebIDL Date', {
        setup: function() {},
        teardown: function() {}
    });
    requirement = 'If V is not an ECMAScript Date object, then throw a TypeError.';
    QUnit.test(requirement, function() {
        QUnit.throws(function() {
            window.WebIDL.Date();
        }, TypeError, 'undefined throws TypeError');
        QUnit.throws(function() {
            window.WebIDL.Date(undefined);
        }, TypeError, 'undefined throws TypeError');
        QUnit.throws(function() {
            window.WebIDL.Date(null);
        }, TypeError, 'null throws TypeError');
        QUnit.throws(function() {
            window.WebIDL.Date(1358537498904);
        }, TypeError, 'number throws TypeError');
        QUnit.throws(function() {
            window.WebIDL.Date(-0.123);
        }, TypeError, 'number throws TypeError');
        QUnit.throws(function() {
            window.WebIDL.Date('');
        }, TypeError, 'string throws TypeError');
        QUnit.throws(function() {
            window.WebIDL.Date(Infinity);
        }, TypeError, 'Infinity throws TypeError');
        QUnit.throws(function() {
            window.WebIDL.Date(NaN);
        }, TypeError, 'NaN throws TypeError');
        QUnit.throws(function() {
            window.WebIDL.Date({});
        }, TypeError, 'Object throws TypeError');
        QUnit.throws(function() {
            window.WebIDL.Date(window.WebIDL);
        }, TypeError, 'WebIDL object throws TypeError');
        QUnit.throws(function() {
            window.WebIDL.Date(function Date() {});
        }, TypeError, 'function throws TypeError');
        QUnit.throws(function() {
            var Date = function Date() {};
            window.WebIDL.Date(new Date());
        }, TypeError, 'fake Date throws TypeError');
    });

    requirement = 'If the time value of V is NaN, then return the undefined IDL Date value.';
    QUnit.test(requirement, function() {
        QUnit.strictEqual(window.WebIDL.Date(new Date(NaN)), undefined, 'NaN must return undefined.');
    });

    requirement = 'Return the IDL Date value that represents the same time value as V.';
    QUnit.test(requirement, function() {
        var date = new Date(),
            presetDate = 1358537498904;
        QUnit.notStrictEqual(window.WebIDL.Date(date), date, 'The returned date must not be the same date');
        QUnit.strictEqual(window.WebIDL.Date(new Date(presetDate)), presetDate, 'Conversion must return the same time');
    });

    requirement = 'If V is the undefined Date value, then return a newly constructed ECMAScript Date object whose time value is NaN.';
    QUnit.test(requirement, function() {
        var presetDate = new Date(NaN),
            instance = new window.WebIDL.Date(presetDate);
        QUnit.notStrictEqual(instance.value, presetDate, 'Conversion must return a different date object');
        QUnit.strictEqual(isNaN(instance.value.getTime()), true, 'Return time must be NaN');
    });

    requirement = 'Otherwise, return a newly constructed ECMAScript Date object that represents the same millisecond as V.';
    QUnit.test(requirement, function() {
        var presetDate = 1358537498904,
            instance = new window.WebIDL.Date(new Date(presetDate)),
            time = instance.value.getTime();
        QUnit.notStrictEqual(instance.value, presetDate, 'Conversion must return a different date object');
        QUnit.strictEqual(time, 1358537498904, 'Return time must be the same as the original time');
    });
});