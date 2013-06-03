/**
 * The unsigned short type is an unsigned integer type that has values in the range [0, 65535].
 **/

require(['WebIDL/types/UnsignedShort'], function() {
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

    module('WebIDL UnsignedShort', {
        setup: function() {},
        teardown: function() {}
    });

    requirement = 'Initialize x to ToNumber(V).';
    QUnit.test(requirement, function() {
        QUnit.strictEqual(window.WebIDL.UnsignedShort(), 0, 'ToNumber of no value is 0');
        QUnit.strictEqual(window.WebIDL.UnsignedShort(null), 0, 'null is 0');
        QUnit.strictEqual(window.WebIDL.UnsignedShort(undefined), 0, 'undefined is 0');
        QUnit.strictEqual(window.WebIDL.UnsignedShort(''), 0, 'empty string  is 0');
        QUnit.strictEqual(window.WebIDL.UnsignedShort(0), 0, 'number 0 is 0');
        QUnit.strictEqual(window.WebIDL.UnsignedShort(false), 0, 'false is 0');
        QUnit.strictEqual(window.WebIDL.UnsignedShort(true), 1, 'true is 1');
        QUnit.strictEqual(window.WebIDL.UnsignedShort(''), 0, 'empty string  is 0');
        QUnit.strictEqual(window.WebIDL.UnsignedShort(' \t\n\t '), 0, 'random whitespace is 0');
        QUnit.strictEqual(window.WebIDL.UnsignedShort('	123  '), 123, 'Whitespace removed is 123');
        QUnit.strictEqual(window.WebIDL.UnsignedShort('	123,123  '), 0, 'comma cuases NaN, which is 0');
        QUnit.strictEqual(window.WebIDL.UnsignedShort('	-123.123  '), 65413, 'everything after . gets dropped, modulo applied');
    });

    requirement = '[EnforceRange] If x is NaN, +∞, or −∞, then throw a TypeError.';
    QUnit.test(requirement, function() {
        QUnit.throws(function() {
            window.WebIDL.UnsignedShort(NaN, 'EnforceRange');
        }, TypeError, 'NaN throwns');
        QUnit.throws(function() {
            window.WebIDL.UnsignedShort(+Infinity, 'EnforceRange');
        }, TypeError, '+Infinity throwns');
        QUnit.throws(function() {
            window.WebIDL.UnsignedShort(-Infinity, 'EnforceRange');
        }, TypeError, '-Infinity throwns');
    });

    requirement = '[EnforceRange] If x < 0 or x > 216 − 1, then throw a TypeError.';
    QUnit.test(requirement, function() {
        QUnit.throws(function() {
            window.WebIDL.UnsignedShort(-1, 'EnforceRange');
        }, TypeError, 'Range enforced');
        QUnit.throws(function() {
            window.WebIDL.UnsignedShort(Math.pow(2, 16), 'EnforceRange');
        }, TypeError, 'Range enforced');
    });
    requirement = '[EnforceRange] Return the IDL unsigned short value that represents the same numeric value as x.';
    QUnit.test(requirement, function() {
        QUnit.strictEqual(window.WebIDL.UnsignedShort(42, 'EnforceRange'), 42, 'valid input does not throw');
    });
    requirement = '[Clamp] Set x to min(max(x, 0), 216 − 1).';
    QUnit.test(requirement, function() {
        QUnit.strictEqual(window.WebIDL.UnsignedShort(165535, 'Clamp'), 65535, '165535 Clamped to 65535');
        QUnit.strictEqual(window.WebIDL.UnsignedShort(-165535, 'Clamp'), 0, '-165535 Clamped to 0');
    });
    requirement = '[Clamp] Round x to the nearest integer, choosing the even integer if it lies halfway between two';
    QUnit.test(requirement, function() {
        QUnit.strictEqual(window.WebIDL.UnsignedShort(0.5, 'Clamp'), 0, '0.5 rounds to 0');
        QUnit.strictEqual(window.WebIDL.UnsignedShort(3.5, 'Clamp'), 4, '3.5 rounds to 4');
        QUnit.strictEqual(window.WebIDL.UnsignedShort(4.5, 'Clamp'), 4, '4.5 rounds to 4');
    });
    requirement = '[Clamp] choosing +0 rather than −0.';
    QUnit.test(requirement, function() {
        var value = window.WebIDL.UnsignedShort(-0.5, 'Clamp');
        QUnit.strictEqual(isNegative0(value), false, '-0.5 rounds to +0');
    });
    requirement = '[Clamp] Return the IDL unsigned short value that represents the same numeric value as x.';
    QUnit.test(requirement, function() {
        QUnit.strictEqual(window.WebIDL.UnsignedShort(42, 'Clamp'), 42, 'valid input does not throw');
    });
    requirement = 'Set x to ToUint16(x) -> If number is NaN, +0, −0, +∞, or −∞, return +0.';
    QUnit.test(requirement, function() {
        var zero = window.WebIDL.UnsignedShort(-0);
        QUnit.strictEqual(isNegative0(zero), false, '-0, so 0');
        QUnit.strictEqual(window.WebIDL.UnsignedShort(NaN), 0, 'NaN is NaN, so 0');
        QUnit.strictEqual(window.WebIDL.UnsignedShort(/123/), 0, 'Regex is NaN, which is 0');
        QUnit.strictEqual(window.WebIDL.UnsignedShort([]), 0, 'Empty array is NaN, so 0');
        QUnit.strictEqual(window.WebIDL.UnsignedShort({}), 0, 'Object is NaN, so 0');
        QUnit.strictEqual(window.WebIDL.UnsignedShort(+Infinity), 0, 'Object is NaN, so 0');
        QUnit.strictEqual(window.WebIDL.UnsignedShort(-Infinity), 0, 'Object is NaN, so 0');
    });
    requirement = 'Let int16bit be posInt modulo 216; that is, a finite integer value k of Number type with positive sign and less than 216 in magnitude such that the mathematical difference of int and k is mathematically an integer multiple of 216.';
    QUnit.test(requirement, function() {
        QUnit.strictEqual(window.WebIDL.UnsignedShort(131072), 0, 'modulo of 131072 (65535 x 2) value is 0');
        QUnit.strictEqual(window.WebIDL.UnsignedShort(65536), 0, 'modulo of 65536 value is 0');
        QUnit.strictEqual(window.WebIDL.UnsignedShort(-1), 65535, 'modulo of -1 value is 65535');
        QUnit.strictEqual(window.WebIDL.UnsignedShort(-2), 65534, 'modulo of -1 value is 65534');
    });

    requirement = 'Return the IDL unsigned short value that represents the same numeric value as x.';
    QUnit.test(requirement, function() {
        QUnit.strictEqual(window.WebIDL.UnsignedShort(65533), 65533, 'valid input does not throw');
    });

    requirement = 'The type name of the short type is “UnsignedShort”.';
    QUnit.test(requirement, function() {
        var instance = new window.WebIDL.UnsignedShort(1);
        QUnit.strictEqual(instance.type, 'UnsignedShort', 'The type is “UnsignedShort”.');
    });
});