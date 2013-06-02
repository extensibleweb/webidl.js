/**
 * The short type is a signed integer type that has values in the range [−32768, 32767].
 **/
require(['WebIDL/types/Short'], function() {
    'use strict';

    var requirement, QUnit = window.QUnit;

    function isNegative0(x) {
        if (x !== 0) return false;
        var obj = Object.freeze({
            z: -0
        });
        try {
            Object.defineProperty(obj, 'z', {
                value: x
            });
        } catch (e) {
            return false;
        }
        return true;
    }

    module('WebIDL Short', {
        setup: function() {},
        teardown: function() {}
    });

    requirement = 'Initialize x to ToNumber(V).';
    QUnit.test(requirement, function() {
        QUnit.strictEqual(window.WebIDL.Short(), 0, 'ToNumber of no value is 0');
        QUnit.strictEqual(window.WebIDL.Short(null), 0, 'null is 0');
        QUnit.strictEqual(window.WebIDL.Short(undefined), 0, 'undefined is 0');
        QUnit.strictEqual(window.WebIDL.Short(''), 0, 'empty string  is 0');
        QUnit.strictEqual(window.WebIDL.Short(0), 0, 'number 0 is 0');
        QUnit.strictEqual(window.WebIDL.Short(false), 0, 'false is 0');
        QUnit.strictEqual(window.WebIDL.Short(true), 1, 'true is 1');
        QUnit.strictEqual(window.WebIDL.Short(''), 0, 'empty string  is 0');
        QUnit.strictEqual(window.WebIDL.Short(' \t\n\t '), 0, 'random whitespace is 0');
        QUnit.strictEqual(window.WebIDL.Short('	123  '), 123, 'Whitespace removed is 123');
        QUnit.strictEqual(window.WebIDL.Short('	123,123  '), 0, 'comma cuases NaN, which is 0');
        QUnit.strictEqual(window.WebIDL.Short('	-123.123  '), - 123, 'everything after . gets dropped');
    });

    requirement = '[EnforceRange] If x is NaN, +∞, or −∞, then throw a TypeError.';
    QUnit.test(requirement, function() {
        QUnit.throws(function() {
            window.WebIDL.Short(NaN, 'EnforceRange');
        }, TypeError, 'NaN throws');
        QUnit.throws(function() {
            window.WebIDL.Short(+Infinity, 'EnforceRange');
        }, TypeError, '+Infinity throws');
        QUnit.throws(function() {
            window.WebIDL.Short(-Infinity, 'EnforceRange');
        }, TypeError, '-Infinity throws');
    });

    requirement = '[EnforceRange] If x < −215 or x > 215 − 1, then throw a TypeError.';
    QUnit.test(requirement, function() {
        QUnit.throws(function() {
            window.WebIDL.Short(Math.pow(-2, 15) - 1, 'EnforceRange');
        }, TypeError, 'Range enforced');
        QUnit.throws(function() {
            window.WebIDL.Short(Math.pow(2, 15), 'EnforceRange');
        }, TypeError, 'Range enforced');
    });

    requirement = '[EnforceRange] Return the IDL short value that represents the same numeric value as x.';
    QUnit.test(requirement, function() {
        QUnit.strictEqual(window.WebIDL.Short(42, 'EnforceRange'), 42, 'valid input does not throw');
    });

    requirement = '[Clamp] Set x to min(max(x, −215), 215 − 1).';
    QUnit.test(requirement, function() {
        QUnit.strictEqual(window.WebIDL.Short(42767, 'Clamp'), 32767, '42767 Clamped to 32767');
        QUnit.strictEqual(window.WebIDL.Short(-42768, 'Clamp'), - 32768, '−42768 Clamped to -32768');
    });

    requirement = '[Clamp] Round x to the nearest integer, choosing the even integer if it lies halfway between two';
    QUnit.test(requirement, function() {
        QUnit.strictEqual(window.WebIDL.Short(0.5, 'Clamp'), 0, '0.5 rounds to 0');
        QUnit.strictEqual(window.WebIDL.Short(3.5, 'Clamp'), 4, '3.5 rounds to 4');
        QUnit.strictEqual(window.WebIDL.Short(4.5, 'Clamp'), 4, '4.5 rounds to 4');
    });

    requirement = '[Clamp] choosing +0 rather than −0.';
    QUnit.test(requirement, function() {
        var value = window.WebIDL.Short(-0.5, 'Clamp');
        QUnit.strictEqual(isNegative0(value), false, '-0.5 rounds to +0');
    });

    requirement = '[Clamp] Return the IDL short value that represents the same numeric value as x.';
    QUnit.test(requirement, function() {
        QUnit.strictEqual(window.WebIDL.Short(42, 'Clamp'), 42, 'valid input just returns');
    });

    requirement = 'If x is NaN, +0, −0, +∞, or −∞, then return the IDL short value that represents 0.';
    QUnit.test(requirement, function() {
        var zero = window.WebIDL.Short(-0);
        QUnit.strictEqual(isNegative0(zero), false, '-0, so 0');
        QUnit.strictEqual(window.WebIDL.Short(NaN), 0, 'NaN is NaN, so 0');
        QUnit.strictEqual(window.WebIDL.Short(/123/), 0, 'Regex is NaN, which is 0');
        QUnit.strictEqual(window.WebIDL.Short([]), 0, 'Empty array is NaN, so 0');
        QUnit.strictEqual(window.WebIDL.Short({}), 0, 'Object is NaN, so 0');
        QUnit.strictEqual(window.WebIDL.Short(+Infinity), 0, 'Object is NaN, so 0');
        QUnit.strictEqual(window.WebIDL.Short(-Infinity), 0, 'Object is NaN, so 0');
    });

    requirement = 'If x ≥ 215, return the IDL short value that represents the same numeric value as x − 216.';
    QUnit.test(requirement, function() {
        QUnit.strictEqual(window.WebIDL.Short(-32768), - 32768, '-32768 is in range');
        QUnit.strictEqual(window.WebIDL.Short(32767), 32767, '32767 is in range');
        QUnit.strictEqual(window.WebIDL.Short(32768), - 32768, '32768 goes to -32768');
        QUnit.strictEqual(window.WebIDL.Short(32769), - 32767, '32769 goes to -32767');
        QUnit.strictEqual(window.WebIDL.Short(-32769), 32767, '-129 goes to 127');
        QUnit.strictEqual(window.WebIDL.Short(-32770), 32766, '-130 goes to 126');
        QUnit.strictEqual(window.WebIDL.Short(65536), 0, '65536 goes to 0');
        QUnit.strictEqual(window.WebIDL.Short(131073), 1, '131072 goes to 1');
    });

    requirement = 'Otherwise, return the IDL short value that represents the same numeric value as x.';
    QUnit.test(requirement, function() {
        QUnit.strictEqual(window.WebIDL.Short(42), 42, 'valid input just returns');
    });

    requirement = 'The type name of the short type is “Short”.';
    QUnit.test(requirement, function() {
        var instance = new window.WebIDL.Short(0);
        QUnit.strictEqual(instance.type, 'Short', 'The type is “Short”.');
    });
});
