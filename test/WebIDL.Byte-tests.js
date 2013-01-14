/**
 * Byte binding (conversion) is defined here:
 * The byte type is a signed integer type that has values in the range [−128, 127].
 * http://dev.w3.org/2006/webapi/WebIDL/#es-byte
 **/
require(["types/Byte"], function() {
	'use strict';

	var assertion, QUnit = window.QUnit;

	module('WebIDL Byte', {
		setup: function() {},
		teardown: function() {}
	});

	assertion = 'Initialize x to ToNumber(V).';
	QUnit.test(assertion, function() {
		QUnit.equal(window.WebIDL.Byte(), 0, 'ToNumber of no value is 0');
		QUnit.equal(window.WebIDL.Byte(null), 0, 'null is 0');
		QUnit.equal(window.WebIDL.Byte(undefined), 0, 'unefined is 0');
		QUnit.equal(window.WebIDL.Byte(''), 0, 'empty string  is 0');
		QUnit.equal(window.WebIDL.Byte(0), 0, 'number 0 is 0');
		QUnit.equal(window.WebIDL.Byte(false), 0, 'false is 0');
		QUnit.equal(window.WebIDL.Byte(true), 1, 'true is 1');
		QUnit.equal(window.WebIDL.Byte(''), 0, 'empty string  is 0');
		QUnit.equal(window.WebIDL.Byte(' \t\n\t '), 0, 'random whitespace is 0');
		QUnit.equal(window.WebIDL.Byte('	123  '), 123, 'Whitespace removed is 123');
		QUnit.equal(window.WebIDL.Byte('	123,123  '), 0, 'comma cuases NaN, which is 0');
		QUnit.equal(window.WebIDL.Byte('	-123.123  '), -123, 'everything after . gets dropped');
	});

	assertion = 'If x is NaN, +0, −0, +∞, or −∞, then return the IDL byte value that represents 0.';
	QUnit.test(assertion, function() {
		QUnit.equal(window.WebIDL.Byte(NaN), 0, 'NaN is NaN, so 0');
		QUnit.equal(window.WebIDL.Byte(/123/), 0, 'Regex is NaN, which is 0');
		QUnit.equal(window.WebIDL.Byte([]), 0, 'Empty array is NaN, so 0');
		QUnit.equal(window.WebIDL.Byte({}), 0, 'Object is NaN, so 0');
		QUnit.equal(window.WebIDL.Byte(+Infinity), 0, 'Object is NaN, so 0');
		QUnit.equal(window.WebIDL.Byte(-Infinity), 0, 'Object is NaN, so 0');
	});

	assertion = '[EnforceRange] If x is NaN, +∞, or −∞, then throw a TypeError.';
	QUnit.test(assertion, function() {
		QUnit.throws(function() {
			window.WebIDL.Byte(NaN, 'EnforceRange');
		}, TypeError, 'NaN throwns');
		QUnit.throws(function() {
			window.WebIDL.Byte(+Infinity, 'EnforceRange');
		}, TypeError, '+Infinity throwns');
		QUnit.throws(function() {
			window.WebIDL.Byte(-Infinity, 'EnforceRange');
		}, TypeError, '-Infinity throwns');
		QUnit.equal(window.WebIDL.Byte(42, 'EnforceRange'), 42, 'valid input does not throw');
	});

	assertion = '[EnforceRange] If x < −27 or x > 27 − 1, then throw a TypeError.';
	QUnit.test(assertion, function() {
		QUnit.throws(function() {
			window.WebIDL.Byte(Math.pow(-2, 7) - 1, 'EnforceRange');
		}, TypeError, 'Range enforced');
		QUnit.throws(function() {
			window.WebIDL.Byte(Math.pow(2, 7), 'EnforceRange');
		}, TypeError, 'Range enforced');
	});

	assertion = '[Clamp] Set x to min(max(x, −27), 27 − 1).';
	QUnit.test(assertion, function() {
		QUnit.equal(window.WebIDL.Byte(1000, 'Clamp'), 127, '1000 Clamped to 127');
		QUnit.equal(window.WebIDL.Byte(-1000, 'Clamp'), -128, '-1000 Clamped to -128');
	});

	assertion = '[Clamp] Round x to the nearest integer, choosing the even integer if it lies halfway between two, and choosing +0 rather than −0.';
	QUnit.test(assertion, function() {
		QUnit.equal(window.WebIDL.Byte(0.5, 'Clamp'), 0, '0.5 rounds to 0');
		QUnit.equal(window.WebIDL.Byte(3.5, 'Clamp'), 4, '3.5 rounds to 4');
		QUnit.equal(window.WebIDL.Byte(4.5, 'Clamp'), 4, '4.5 rounds to 4');
		//NOTE: Can't represent +0 and -0 in JS.
	});

	assertion = 'If x ≥ 27, return the IDL byte value that represents the same numeric value as x − 28.';
	QUnit.test(assertion, function() {
		QUnit.equal(window.WebIDL.Byte(-128), -128, '-128 is in range');
		QUnit.equal(window.WebIDL.Byte(127), 127, '127 is in range');
		QUnit.equal(window.WebIDL.Byte(128), -128, '128 goes to -128');
		QUnit.equal(window.WebIDL.Byte(129), -127, '129 goes to -127');
		QUnit.equal(window.WebIDL.Byte(-129), 127, '-129 goes to 127');
		QUnit.equal(window.WebIDL.Byte(-130), 126, '-130 goes to 126');
		QUnit.equal(window.WebIDL.Byte(256), 0, '256 goes to 0');
		QUnit.equal(window.WebIDL.Byte(257), 1, '256 goes to 1');
	});

	assertion = 'Otherwise, return the IDL byte value that represents the same numeric value as x.';
	QUnit.test(assertion, function() {
		QUnit.equal(window.WebIDL.Byte(42), 42, 'returned value is 42');
		QUnit.equal(new window.WebIDL.Byte(42).value, 42, 'returned value is 42');
	});

	assertion = 'The type name of the byte type is “Byte”.';
	QUnit.test(assertion, function() {
		QUnit.equal(window.WebIDL.Byte.prototype.type, 'Byte', 'The type is “Byte”.');
	});
});