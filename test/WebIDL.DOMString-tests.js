/**
 * The DOMString type corresponds to the set of all possible sequences of code units.
 **/
require(['types/DOMString'], function() {
	'use strict';

	var requirement, QUnit = window.QUnit;

	module('WebIDL DOMString', {
		setup: function() {},
		teardown: function() {}
	});

	requirement = "[TreatNullAs=EmptyString] If V is null ... return the DOMString value that represents the empty string.";
	QUnit.test(requirement, function() {
		QUnit.strictEqual(window.WebIDL.DOMString(null, "TreatNullAs=EmptyString"), "", 'null was treated as empty string');
		QUnit.strictEqual(window.WebIDL.DOMString("test", "TreatNullAs=EmptyString"), "test", 'test value was treated as test string');
	});
	requirement = "[TreatUndefinedAs=EmptyString] If V is undefined ... return the DOMString value that represents the empty string.";
	QUnit.test(requirement, function() {
		QUnit.strictEqual(window.WebIDL.DOMString(undefined, "TreatUndefinedAs=EmptyString"), "", 'undefined was treated as empty string');
		QUnit.strictEqual(window.WebIDL.DOMString("test", "TreatUndefinedAs=EmptyString"), "test", 'test value was treated as test string');
	});
	requirement = "Let x be ToString(V).";
	QUnit.test(requirement, function() {
		QUnit.strictEqual(window.WebIDL.DOMString(), "undefined", 'missing argument results in undefined');
		QUnit.strictEqual(window.WebIDL.DOMString(null), "null", 'null is "null"');
		QUnit.strictEqual(window.WebIDL.DOMString(undefined), "undefined", 'undefined is "undefined"');
		QUnit.strictEqual(window.WebIDL.DOMString(''), '', 'empty string  is empty string');
		QUnit.strictEqual(window.WebIDL.DOMString(1234), "1234", 'number 1234 is string "1234"');
		QUnit.strictEqual(window.WebIDL.DOMString(1234), "1234", 'number 1234 is string "1234"');
		QUnit.strictEqual(window.WebIDL.DOMString(0xff), "255", 'number 0xff is string "255"');
		QUnit.strictEqual(window.WebIDL.DOMString(false), "false", 'false is "false"');
		QUnit.strictEqual(window.WebIDL.DOMString(true), "true", 'true is "true"');
		QUnit.strictEqual(window.WebIDL.DOMString(' \t\n\t '), " \t\n\t ", 'random whitespace preserved');
	});

	requirement = "Return the IDL DOMString value that represents the same sequence of code units as the one the ECMAScript String value x represents.";
	QUnit.test(requirement, function() {
		QUnit.strictEqual(window.WebIDL.DOMString("test"), "test", 'test value was treated as test string');
	});

	requirement = 'The type name of the string type is “String”.';
	QUnit.test(requirement, function() {
		var instance = new window.WebIDL.DOMString("");
		QUnit.strictEqual(instance.type, 'String', 'The type is “String”.');
	});
});
