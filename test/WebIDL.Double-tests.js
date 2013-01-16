require(["types/Double"], function() {
	'use strict';

	var assertion, QUnit = window.QUnit;

	function isNegative0(x) {
		if(x !== 0) return false;
		var obj = Object.freeze({
			z: -0
		});
		try {
			Object.defineProperty(obj, 'z', {
				value: x
			});
		} catch(e) {
			return false;
		}
		return true;
	}

	module('WebIDL Double', {
		setup: function() {},
		teardown: function() {}
	});

	assertion = "Let x be ToNumber(V).";
	QUnit.test(assertion, function() {
		QUnit.strictEqual(window.WebIDL.Double(), 0, 'ToNumber of no value is 0');
		QUnit.strictEqual(window.WebIDL.Double(null), 0, 'null is 0');
		QUnit.strictEqual(window.WebIDL.Double(undefined), 0, 'undefined is 0');
		QUnit.strictEqual(window.WebIDL.Double(''), 0, 'empty string  is 0');
		QUnit.strictEqual(window.WebIDL.Double(0), 0, 'number 0 is 0');
		QUnit.strictEqual(window.WebIDL.Double(false), 0, 'false is 0');
		QUnit.strictEqual(window.WebIDL.Double(true), 1, 'true is 1');
		QUnit.strictEqual(window.WebIDL.Double(''), 0, 'empty string  is 0');
		QUnit.strictEqual(window.WebIDL.Double(' \t\n\t '), 0, 'random whitespace is 0');
		QUnit.strictEqual(window.WebIDL.Double('	123  '), 123, 'Whitespace removed is 123');
		QUnit.strictEqual(window.WebIDL.Double('	123,123  '), 0, 'comma cuases NaN, which is 0');
		QUnit.strictEqual(window.WebIDL.Double('	-123.123  '), -123, 'everything after . gets dropped');
	});

	assertion = "If x is NaN, +Infinity or −Infinity, then throw a TypeError.";
	QUnit.test(assertion, function() {
		QUnit.throws(function() {
			window.WebIDL.Double(NaN);
		}, TypeError, 'NaN throws');
		QUnit.throws(function() {
			window.WebIDL.Double(+Infinity);
		}, TypeError, '+Infinity throws');
		QUnit.throws(function() {
			window.WebIDL.Double(-Infinity);
		}, TypeError, '-Infinity throws');
	});
	
	assertion = "Return the IDL double value that has the same numeric value as x.";
	QUnit.test(assertion, function() {
		QUnit.strictEqual(window.WebIDL.Double(42), 42, 'valid input does not throw');
	});
});