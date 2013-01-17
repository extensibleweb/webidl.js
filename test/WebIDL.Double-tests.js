require(["types/Double"], function() {
	'use strict';

	var assertion, QUnit = window.QUnit;

	module('WebIDL Double', {
		setup: function() {},
		teardown: function() {}
	});

	assertion = "Let x be ToNumber(V).";
	QUnit.test(assertion, function() {
		QUnit.strictEqual(window.WebIDL.Double(null), 0, 'null is 0');
		QUnit.strictEqual(window.WebIDL.Double(''), 0, 'empty string  is 0');
		QUnit.strictEqual(window.WebIDL.Double(0), 0, 'number 0 is 0');
		QUnit.strictEqual(window.WebIDL.Double(false), 0, 'false is 0');
		QUnit.strictEqual(window.WebIDL.Double(true), 1, 'true is 1');
		QUnit.strictEqual(window.WebIDL.Double(''), 0, 'empty string  is 0');
		QUnit.strictEqual(window.WebIDL.Double(' \t\n\t '), 0, 'random whitespace is 0');
		QUnit.strictEqual(window.WebIDL.Double('	123  '), 123, 'Whitespace removed is 123');
		QUnit.strictEqual(window.WebIDL.Double('	-123.123  '), -123.123, 'white space stripped');
	});

	assertion = "If x is NaN, +Infinity or −Infinity, then throw a TypeError.";
	QUnit.test(assertion, function() {
		QUnit.throws(function(){
			window.WebIDL.Double();
		}, TypeError, "undefined is NaN");
		QUnit.throws(function(){
			window.WebIDL.Double(undefined);
		}, TypeError, "undefined is NaN");
		QUnit.throws(function() {
			window.WebIDL.Double(NaN);
		}, TypeError, 'NaN throws');
		QUnit.throws(function() {
			window.WebIDL.Double(+Infinity);
		}, TypeError, '+Infinity throws');
		QUnit.throws(function() {
			window.WebIDL.Double(-Infinity);
		}, TypeError, '-Infinity throws'); 
		QUnit.throws(function() {
			window.WebIDL.Double('	123,123  ');
		}, TypeError, 'comma cuases NaN, so throws');
	});
	assertion = "Return the IDL double value that has the same numeric value as x.";
	QUnit.test(assertion, function() {
		QUnit.strictEqual(window.WebIDL.Double(42), 42, 'valid input does not throw');
	});
});