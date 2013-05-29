require(["types/UnsignedLong"], function() {
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

    module('WebIDL UnsignedLong', {
        setup: function() {},
        teardown: function() {}
    });

    requirement = "Initialize x to ToNumber(V).";
    QUnit.test(requirement, function() {
        QUnit.strictEqual(window.WebIDL.UnsignedLong(), 0, 'undefined is 0');
        QUnit.strictEqual(window.WebIDL.UnsignedLong(undefined), 0, 'undefined is 0');
        QUnit.strictEqual(window.WebIDL.UnsignedLong(null), 0, 'null is 0');
        QUnit.strictEqual(window.WebIDL.UnsignedLong(''), 0, 'empty string  is 0');
        QUnit.strictEqual(window.WebIDL.UnsignedLong(0), 0, 'number 0 is 0');
        QUnit.strictEqual(window.WebIDL.UnsignedLong(false), 0, 'false is 0');
        QUnit.strictEqual(window.WebIDL.UnsignedLong(true), 1, 'true is 1');
        QUnit.strictEqual(window.WebIDL.UnsignedLong(''), 0, 'empty string  is 0');
        QUnit.strictEqual(window.WebIDL.UnsignedLong(' \t\n\t '), 0, 'random whitespace is 0');
        QUnit.strictEqual(window.WebIDL.UnsignedLong('	123  '), 123, 'Whitespace removed is 123');
        QUnit.strictEqual(window.WebIDL.UnsignedLong('	123,123  '), 0, 'comma cuases NaN, which is 0');
        QUnit.strictEqual(window.WebIDL.UnsignedLong('	-123.123  '), 4294967173, 'everything after "." gets dropped, modulo applied');
    });

    requirement = "[EnforceRange] If x is NaN, +∞, or −∞, then throw a TypeError.";
    QUnit.test(requirement, function() {
        QUnit.throws(function() {
            window.WebIDL.UnsignedLong(NaN, 'EnforceRange');
        }, TypeError, 'NaN throwns');
        QUnit.throws(function() {
            window.WebIDL.UnsignedLong(+Infinity, 'EnforceRange');
        }, TypeError, '+Infinity throwns');
        QUnit.throws(function() {
            window.WebIDL.UnsignedLong(-Infinity, 'EnforceRange');
        }, TypeError, '-Infinity throwns');
    });

    requirement = "[EnforceRange] If x < 0 or x > 2^32 − 1, then throw a TypeError.";
    QUnit.test(requirement, function() {
        QUnit.throws(function() {
            window.WebIDL.UnsignedLong(-1, 'EnforceRange');
        }, TypeError, 'Range must be enforced');
        QUnit.throws(function() {
            window.WebIDL.UnsignedLong(Math.pow(2, 32), 'EnforceRange');
        }, TypeError, 'Range must be enforced');
    });

    requirement = "[EnforceRange] Return the IDL unsigned long value that represents the same numeric value as x.";
    QUnit.test(requirement, function() {
        QUnit.strictEqual(window.WebIDL.UnsignedLong(42, 'EnforceRange'), 42, 'valid input does not throw');
    });

    requirement = "[Clamp] Set x to min(max(x, 0), 2^32 − 1).";
    QUnit.test(requirement, function() {
        QUnit.strictEqual(window.WebIDL.UnsignedLong(4294967296, 'Clamp'), 4294967295, '4294967296 Clamped to 4294967295');
        QUnit.strictEqual(window.WebIDL.UnsignedLong(-4294967295, 'Clamp'), 0, '-4294967295 Clamped to 0');
    });

    requirement = "[Clamp] Round x to the nearest integer, choosing the even integer if it lies halfway between two";
    QUnit.test(requirement, function() {
        var zero = window.WebIDL.UnsignedLong(-0.5, 'Clamp');
        QUnit.strictEqual(isNegative0(0), false, '-0.5 rounds to +0');
        QUnit.strictEqual(window.WebIDL.UnsignedLong(0.5, 'Clamp'), 0, '0.5 rounds to 0');
        QUnit.strictEqual(window.WebIDL.UnsignedLong(3.5, 'Clamp'), 4, '3.5 rounds to 4');
        QUnit.strictEqual(window.WebIDL.UnsignedLong(4.5, 'Clamp'), 4, '4.5 rounds to 4');
    });

    requirement = "[Clamp] choosing +0 rather than −0.";
    QUnit.test(requirement, function() {
        var value = window.WebIDL.UnsignedLong(-0.5, 'Clamp');
        QUnit.strictEqual(isNegative0(value), false, '-0.5 rounds to +0');
    });

    requirement = "[Clamp] Return the IDL unsigned long value that represents the same numeric value as x.";
    QUnit.test(requirement, function() {
        QUnit.strictEqual(window.WebIDL.UnsignedLong(42, 'Clamp'), 42, 'valid input does not throw');
    });

    requirement = "Set x to ToUint32(x) -> If number is NaN, +0, −0, +∞, or −∞, return +0.";
    QUnit.test(requirement, function() {
        var zero = window.WebIDL.UnsignedLong(-0);
        QUnit.strictEqual(isNegative0(zero), false, '-0, so 0');
        QUnit.strictEqual(window.WebIDL.UnsignedLong(NaN), 0, 'NaN is NaN, so 0');
        QUnit.strictEqual(window.WebIDL.UnsignedLong(/123/), 0, 'Regex is NaN, which is 0');
        QUnit.strictEqual(window.WebIDL.UnsignedLong([]), 0, 'Empty array is NaN, so 0');
        QUnit.strictEqual(window.WebIDL.UnsignedLong({}), 0, 'Object is NaN, so 0');
        QUnit.strictEqual(window.WebIDL.UnsignedLong(+Infinity), 0, 'Object is NaN, so 0');
        QUnit.strictEqual(window.WebIDL.UnsignedLong(-Infinity), 0, 'Object is NaN, so 0');
    });

    requirement = "Let int32bit be posInt modulo 2^32; that is, a finite integer value k of Number type with positive sign and less than 216 in magnitude such that the mathematical difference of int and k is mathematically an integer multiple of 2^32.";
    QUnit.test(requirement, function() {
        QUnit.strictEqual(window.WebIDL.UnsignedLong(Math.pow(2, 32)), 0, 'modulo of 65536 value is 0');
        QUnit.strictEqual(window.WebIDL.UnsignedLong(Math.pow(2, 32) * 2), 0, 'modulo of 8589934592 value is 0');
        QUnit.strictEqual(window.WebIDL.UnsignedLong(-1), 4294967295, 'modulo of -1 value is 4294967295');
        QUnit.strictEqual(window.WebIDL.UnsignedLong(-2), 4294967294, 'modulo of -1 value is 4294967294');
    });

    requirement = "Return the IDL unsigned long value that represents the same numeric value as x.";
    QUnit.test(requirement, function() {
        QUnit.strictEqual(window.WebIDL.UnsignedLong(4294967291), 4294967291, 'valid input does not throw');
    });

    requirement = 'The type name of the long type is “UnsignedLong”.';
    QUnit.test(requirement, function() {
        var instance = new window.WebIDL.UnsignedLong(1);
        QUnit.strictEqual(instance.type, 'UnsignedLong', 'The type is “UnsignedLong”.');
    });
});