require(['WebIDL/types/RegExp'], function() {
    'use strict';

    var requirement, QUnit = window.QUnit;

    module('WebIDL Regexp', {
        setup: function() {},
        teardown: function() {}
    });

    requirement = 'If Type(V) is not Object, or [[NativeBrand]] V is not “RegExp”, then set V to be a newly created RegExp object';
    QUnit.test(requirement, function() {
        QUnit.strictEqual(window.WebIDL.RegExp().toString(), '/(?:)/', 'must return default regex');
        QUnit.strictEqual(window.WebIDL.RegExp(undefined).toString(), '/(?:)/', '/(?:)/ must return default regex');
        QUnit.strictEqual(window.WebIDL.RegExp(null).toString(), '/null/', 'must return /null/');
        QUnit.strictEqual(window.WebIDL.RegExp(123).toString(), '/123/', 'must return /123/');
        QUnit.strictEqual(window.WebIDL.RegExp('test').toString(), '/test/', 'must return /test/');
        QUnit.strictEqual(window.WebIDL.RegExp(true).toString(), '/true/', 'must return /true/');
        QUnit.strictEqual(window.WebIDL.RegExp(false).toString(), '/false/', 'must return /fals/');
        QUnit.strictEqual(window.WebIDL.RegExp(Infinity).toString(), '/Infinity/', 'must return /Infinity/');
        QUnit.strictEqual(window.WebIDL.RegExp(NaN).toString(), '/NaN/', 'must return /NaN/');
        QUnit.strictEqual(window.WebIDL.RegExp({}).toString(), '/[object Object]/', 'must return /[object Object]/');
        QUnit.strictEqual(window.WebIDL.RegExp({
            toString: function() {
                return 'test';
            }
        }).toString(), '/test/', 'must return /test/');

        QUnit.throws(function() {
            window.WebIDL.RegExp('?', 'EnforceRange');
        }, SyntaxError, 'syntax error must throw');

        QUnit.throws(function() {
            window.WebIDL.RegExp('?', 'EnforceRange');
        }, SyntaxError, 'syntax error must throw');
    });

    requirement = 'Return the IDL RegExp value that is a reference to the same object as V.';
    QUnit.test(requirement, function() {
        var regex = new RegExp(),
            instance = new window.WebIDL.RegExp(regex);
        QUnit.strictEqual(window.WebIDL.RegExp(regex), regex, 'must be reference to same object');
        QUnit.strictEqual(instance.value, regex, 'must be reference to same object');
    });
});