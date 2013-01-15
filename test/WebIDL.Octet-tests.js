/**
 * The octet type is an unsigned integer type that has values in the range [0, 255].
 **/
require(['types/Octet'], function() {
	'use strict';

	var assertion, QUnit = window.QUnit;

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

	module('WebIDL Octet', {
		setup: function() {},
		teardown: function() {}
	});


	assertion = 'Initialize x to ToNumber(V).';

	QUnit.test(assertion, function() {
		QUnit.strictEqual(window.WebIDL.Octet(), 0, 'ToNumber of no value is 0');
		QUnit.strictEqual(window.WebIDL.Octet(null), 0, 'null is 0');
		QUnit.strictEqual(window.WebIDL.Octet(undefined), 0, 'undefined is 0');
		QUnit.strictEqual(window.WebIDL.Octet(''), 0, 'empty string  is 0');
		QUnit.strictEqual(window.WebIDL.Octet(0), 0, 'number 0 is 0');
		QUnit.strictEqual(window.WebIDL.Octet(false), 0, 'false is 0');
		QUnit.strictEqual(window.WebIDL.Octet(true), 1, 'true is 1');
		QUnit.strictEqual(window.WebIDL.Octet(''), 0, 'empty string  is 0');
		QUnit.strictEqual(window.WebIDL.Octet(' \t\n\t '), 0, 'random whitespace is 0');
		QUnit.strictEqual(window.WebIDL.Octet('	123  '), 123, 'Whitespace removed is 123');
		QUnit.strictEqual(window.WebIDL.Octet('	123,123  '), 0, 'comma cuases NaN, which is 0');
		QUnit.strictEqual(window.WebIDL.Octet('	-123.123  '), 133, 'everything after . gets dropped, modulo is applied');
	});

	assertion = '[EnforceRange] If x is NaN, +∞, or −∞, then throw a TypeError.';
	QUnit.test(assertion, function() {
		QUnit.throws(function() {
			window.WebIDL.Octet(NaN, 'EnforceRange');
		}, TypeError, 'NaN throwns');
		QUnit.throws(function() {
			window.WebIDL.Octet(+Infinity, 'EnforceRange');
		}, TypeError, '+Infinity throwns');
		QUnit.throws(function() {
			window.WebIDL.Octet(-Infinity, 'EnforceRange');
		}, TypeError, '-Infinity throwns');
		QUnit.strictEqual(window.WebIDL.Octet(42, 'EnforceRange'), 42, 'valid input does not throw');
	});

	assertion = '[EnforceRange] If x < 0 or x > 28 − 1, then throw a TypeError.';
	QUnit.test(assertion, function() {
		QUnit.throws(function() {
			window.WebIDL.Octet(-1, 'EnforceRange');
		}, TypeError, 'Range enforced');
		QUnit.throws(function() {
			window.WebIDL.Octet(Math.pow(2, 8) + 1, 'EnforceRange');
		}, TypeError, 'Range enforced');
	});

	assertion = '[Clamp] Set x to min(max(x, 0), 28 − 1).';
	QUnit.test(assertion, function() {
		QUnit.strictEqual(window.WebIDL.Octet(1000, 'Clamp'), 255, '1000 Clamped to 255');
		QUnit.strictEqual(window.WebIDL.Octet(-1000, 'Clamp'), 0, '-1000 Clamped to 0');
	});

	assertion = '[Clamp] Round x to the nearest integer, choosing the even integer if it lies halfway between two';
	QUnit.test(assertion, function() {
		QUnit.strictEqual(window.WebIDL.Octet(0.5, 'Clamp'), 0, '0.5 rounds to 0');
		QUnit.strictEqual(window.WebIDL.Octet(3.5, 'Clamp'), 4, '3.5 rounds to 4');
		QUnit.strictEqual(window.WebIDL.Octet(4.5, 'Clamp'), 4, '4.5 rounds to 4');
	});

	assertion = '[Clamp] choosing +0 rather than −0.';
	QUnit.test(assertion, function() {
		var value = window.WebIDL.Octet(-0.5, 'Clamp');
		QUnit.strictEqual(isNegative0(value), false, '-0.5 rounds to +0');
	});

	assertion = 'If x is NaN, +0, −0, +∞, or −∞, then return the IDL octet value that represents 0.';
	QUnit.test(assertion, function() {
		var zero = window.WebIDL.Octet(-0);
		QUnit.strictEqual(isNegative0(zero), false, '-0, so 0');
		QUnit.strictEqual(window.WebIDL.Octet(NaN), 0, 'NaN is NaN, so 0');
		QUnit.strictEqual(window.WebIDL.Octet(/123/), 0, 'Regex is NaN, which is 0');
		QUnit.strictEqual(window.WebIDL.Octet([]), 0, 'Empty array is NaN, so 0');
		QUnit.strictEqual(window.WebIDL.Octet({}), 0, 'Object is NaN, so 0');
		QUnit.strictEqual(window.WebIDL.Octet(+Infinity), 0, 'Object is NaN, so 0');
		QUnit.strictEqual(window.WebIDL.Octet(-Infinity), 0, 'Object is NaN, so 0');
	});

	assertion = 'Set x to x modulo 28.';
	QUnit.test(assertion, function() {
		QUnit.strictEqual(window.WebIDL.Octet(256), 0, 'modulo of 256 value is 0');
		QUnit.strictEqual(window.WebIDL.Octet(256), 0, 'modulo of 512 value is 0');
		QUnit.strictEqual(window.WebIDL.Octet(257), 1, 'modulo of 257 value is 1');
		QUnit.strictEqual(window.WebIDL.Octet(-1), 255, 'modulo of -1 value is 255');
		QUnit.strictEqual(window.WebIDL.Octet(-2), 254, 'modulo of -1 value is 254');
	});

	assertion = 'Return the IDL octet value that represents the same numeric value as x.';
	QUnit.test(assertion, function() {
		QUnit.strictEqual(window.WebIDL.Octet(42), 42, 'returned value is 42');
		QUnit.strictEqual(new window.WebIDL.Octet(42).value, 42, 'returned value is 42');
	});

	assertion = 'The type name of the octet type is “Octet”.';
	QUnit.test(assertion, function() {
		QUnit.strictEqual(window.WebIDL.Octet.prototype.type, 'Octet', 'The type is “Octet”.');
	});
});
