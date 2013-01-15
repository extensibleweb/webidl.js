/**
 * Float binding (conversion) is defined here:
 * The Float type represents a 32-bit IEEE-754 floating point number.
 * http://dev.w3.org/2006/webapi/WebIDL/#es-float
 **/
require(['types/Float'], function() {
	'use strict';

	var assertion, QUnit = window.QUnit;

	module('WebIDL Float', {
		setup: function() {},
		teardown: function() {}
	});

	// Taken from http://www.wirfs-brock.com/allen/posts/128
	var isNegative0 = function(x) {
		if (x !== 0) return false;
		var obj = Object.freeze({z: -0});
		try {
			Object.defineProperty(obj, 'z', {value: x});
		} catch (e) {
			return false;
		}
		return true;
	};

	assertion = 'Let x be ToNumber(V).';
	QUnit.test(assertion, function() {
		QUnit.strictEqual(window.WebIDL.Float(null), 0, 'null is 0');
		QUnit.strictEqual(window.WebIDL.Float(''), 0, 'empty string  is 0');
		QUnit.strictEqual(window.WebIDL.Float(0), 0, 'number 0 is 0');
		QUnit.strictEqual(window.WebIDL.Float(false), 0, 'false is 0');
		QUnit.strictEqual(window.WebIDL.Float(true), 1, 'true is 1');
		QUnit.strictEqual(window.WebIDL.Float(''), 0, 'empty string  is 0');
		QUnit.strictEqual(window.WebIDL.Float(' \t\n\t '), 0, 'random whitespace is 0');
		QUnit.strictEqual(window.WebIDL.Float('	123  '), 123, 'Whitespace removed is 123');
		QUnit.strictEqual(window.WebIDL.Float('	-123.123  '), -123.12300109863281, 'Converted to nearest float');
		QUnit.throws(function() {
			window.WebIDL.Float();
		}, TypeError, 'ToNumber() is NaN so throws');
		QUnit.throws(function() {
			window.WebIDL.Float(undefined);
		}, TypeError, 'ToNumber(undefined) is NaN so throws');
	});

	assertion = 'If x is NaN, +Infinity or −Infinity, then throw a TypeError.';
	QUnit.test(assertion, function() {
		QUnit.throws(function() {
			window.WebIDL.Float(NaN);
		}, TypeError, 'NaN throws');
		QUnit.throws(function() {
			window.WebIDL.Float(+Infinity);
		}, TypeError, '+Infinity throws');
		QUnit.throws(function() {
			window.WebIDL.Float(-Infinity);
		}, TypeError, '-Infinity throws');
		QUnit.strictEqual(window.WebIDL.Float(42), 42, 'valid input does not throw');
	});

	// Let S be the set of finite IEEE 754 single-precision floating point values except −0, but with two special values added: 2128 and −2128.
	// Let y be the number in S that is closest to x, selecting the number with an even significand if there are two equally close values
	assertion = 'Let y be the [32-bit IEEE float] that is closest to x, selecting the number with an even significand if there are two equally close values';
	QUnit.test(assertion, function() {
		QUnit.strictEqual(window.WebIDL.Float(0.1), 0.10000000149011612);
		QUnit.strictEqual(window.WebIDL.Float(0.2), 0.20000000298023224);
		QUnit.strictEqual(window.WebIDL.Float(3.141592653589793), 3.1415927410125732);
	});

	assertion = 'If y is 2^128 or −2^128, then throw a TypeError.';
	QUnit.test(assertion, function() {
		QUnit.throws(function() {
			window.WebIDL.Float(Math.pow(2, 128));
		}, TypeError, '2^128 throws');
		QUnit.throws(function() {
			window.WebIDL.Float(340282360000000000000000000000000000000);
		}, TypeError, 'Overflow throws');
		QUnit.strictEqual(window.WebIDL.Float(340282350000000000000000000000000000000), 340282346638528859811704183484516925440, 'Rounds down to largest available');
	});

	assertion = 'If y is +0 and x is negative, return −0.';
	QUnit.test(assertion, function() {
		QUnit.strictEqual(isNegative0(window.WebIDL.Float(-8e-47)), true);
		QUnit.strictEqual(isNegative0(window.WebIDL.Float(8e-47)), false);
	});

	assertion = 'The type name of the Float type is “Float”.';
	QUnit.test(assertion, function() {
		QUnit.strictEqual(window.WebIDL.Float.prototype.type, 'Float', 'The type is “Float”.');
	});
});
