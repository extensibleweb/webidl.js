require(["types/Boolean"], function() {
	'use strict';
	module("WebIDL Boolean");

	var assertion, 
		QUnit = window.QUnit,
		WebIDL = window.WebIDL;

	QUnit.module('WebIDL Boolean', {
		setup: function() {},
		teardown: function() {}
	});

	assertion = 'WebIDL.Boolean is available';
	QUnit.test(assertion, function() {
		QUnit.ok(window.WebIDL.Boolean, 'WebIDL Boolean is exposed.');
	});

	assertion = 'The type name of the boolean type is “Boolean”.';
	QUnit.test(assertion, function() {
		QUnit.strictEqual(WebIDL.Boolean.prototype.type, 'Boolean');
	});

	assertion = 'Let x be the result of computing ToBoolean(V).';
	QUnit.test(assertion, function() {
		//falsies
		QUnit.strictEqual(WebIDL.Boolean(), false, 'empty is falsy');
		QUnit.strictEqual(WebIDL.Boolean(null), false, 'null is falsy');
		QUnit.strictEqual(WebIDL.Boolean(undefined), false, 'unefined is falsy');
		QUnit.strictEqual(WebIDL.Boolean(''), false, 'empty string  is falsy');
		QUnit.strictEqual(WebIDL.Boolean(0), false, 'number 0 is falsy');
		QUnit.strictEqual(WebIDL.Boolean(NaN), false, 'NaN is falsy');
		QUnit.strictEqual(WebIDL.Boolean(false), false, 'false is falsy');

		//boxed
		QUnit.strictEqual(new WebIDL.Boolean().value, false, 'value of empty is false');
		QUnit.strictEqual(new WebIDL.Boolean(null).value, false, 'value of null is false');
		QUnit.strictEqual(new WebIDL.Boolean(undefined).value, false, 'value of unefined is false');
		QUnit.strictEqual(new WebIDL.Boolean('').value, false, 'value of empty string  is false');
		QUnit.strictEqual(new WebIDL.Boolean(0).value, false, 'value of Zero is false');
		QUnit.strictEqual(new WebIDL.Boolean(NaN).value, false, 'value of NaN is false');
		QUnit.strictEqual(new WebIDL.Boolean(false).value, false, 'value of false is false');

		//truthies
		QUnit.strictEqual(WebIDL.Boolean(true), true, 'true is truthy');
		QUnit.strictEqual(WebIDL.Boolean({}), true, 'object is truthy');
		QUnit.strictEqual(WebIDL.Boolean(new Boolean(false)), true, 'object is truthy');
		QUnit.strictEqual(WebIDL.Boolean(' '), true, 'single space string is truthy');
		QUnit.strictEqual(WebIDL.Boolean('false'), true, "'false' string is truthy");
		QUnit.strictEqual(WebIDL.Boolean(function() {
			return false;
		}), true, 'functon is truthy');
		QUnit.strictEqual(WebIDL.Boolean([]), true, 'Array is truthy');
		QUnit.strictEqual(WebIDL.Boolean(1), true, '1 is true');
		QUnit.strictEqual(WebIDL.Boolean(1234.5), true, 'Any number is true');
		QUnit.strictEqual(WebIDL.Boolean(-1), true, '-1 number is true');
		QUnit.strictEqual(WebIDL.Boolean(+Infinity), true, '+Infinity is true');
		QUnit.strictEqual(WebIDL.Boolean(-Infinity), true, '-Infinity is true');
		QUnit.strictEqual(WebIDL.Boolean(/false/), true, 'RegExp is true');

		//boxed
		QUnit.strictEqual(new WebIDL.Boolean(true).value, true, 'true is truthy');
		QUnit.strictEqual(new WebIDL.Boolean({}).value, true, 'object is truthy');
		QUnit.strictEqual(new WebIDL.Boolean(new Boolean(false)).value, true, 'object is truthy');
		QUnit.strictEqual(new WebIDL.Boolean(' ').value, true, 'string is truthy');
		QUnit.strictEqual(new WebIDL.Boolean('false').value, true, 'string is truthy');
		QUnit.strictEqual(new WebIDL.Boolean(function() {
			return false;
		}).value, true, 'functon is truthy');
		QUnit.strictEqual(new WebIDL.Boolean([]).value, true, 'string is truthy');
		QUnit.strictEqual(new WebIDL.Boolean(1).value, true, '1 is true');
		QUnit.strictEqual(new WebIDL.Boolean(+Infinity).value, true, '+Infinity is true');
		QUnit.strictEqual(new WebIDL.Boolean(-Infinity).value, true, '-Infinity is true');
		QUnit.strictEqual(new WebIDL.Boolean(/false/).value, true, 'RegExp is true');
	});

	QUnit.test('Converter is exposed', function() {
		QUnit.ok(WebIDL.Boolean.prototype.converter, 'WebIDL Boolean converter is exposed.');
	});
});