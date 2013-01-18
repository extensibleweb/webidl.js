require(['types/Enumeration'], function() {
    'use strict';
    var assertion, QUnit = window.QUnit;

    module('WebIDL Enumeration', {
        setup: function() {},
        teardown: function() {}
    });

    assertion = "Let S be the result of calling ToString(V).";
    QUnit.test(assertion, function() {
        var enums = ["bar", "test", "baz", "1", "true", "false", "Infinity", "-Infinity", "null", "undefined"],
            obj = {
                toString: function() {
                    return "test";
                }
            };
        QUnit.strictEqual(window.WebIDL.Enumeration("TestType", enums, obj), "test", "expected 'test' to be returned");
        QUnit.strictEqual(window.WebIDL.Enumeration("TestType", enums, 1), "1", "expected '1' to be returned");
        QUnit.strictEqual(window.WebIDL.Enumeration("TestType", enums, ["test"]), "test", "expected '1' to be returned");
        QUnit.strictEqual(window.WebIDL.Enumeration("TestType", enums, ["test"]), "test", "expected '1' to be returned");
        QUnit.strictEqual(window.WebIDL.Enumeration("TestType", enums, true), "true", "expected 'true' to be returned");
        QUnit.strictEqual(window.WebIDL.Enumeration("TestType", enums, false), "false", "expected 'false' to be returned");
        QUnit.strictEqual(window.WebIDL.Enumeration("TestType", enums, Infinity), "Infinity", "expected 'Infinity' to be returned");
        QUnit.strictEqual(window.WebIDL.Enumeration("TestType", enums, undefined), "undefined", "expected 'undefined' to be returned");
        QUnit.strictEqual(window.WebIDL.Enumeration("TestType", enums, null), "null", "expected 'null' to be returned");
    });

    assertion = "If S is not one of E’s enumeration values, then throw a TypeError.";
    QUnit.test(assertion, function() {
        QUnit.throws(function() {
            window.WebIDL.Enumeration("TestType", ["a", "c", "f"], "b");
        }, TypeError, "b is not a valid enum value");

    });

    assertion = "Return the enumeration value of type E that is equal to S.";
    QUnit.test(assertion, function() {
        QUnit.strictEqual(window.WebIDL.Enumeration("TestType", ["a", "c", "f"], "a"), "a", "expecte 'a' to be returned");
    });
});