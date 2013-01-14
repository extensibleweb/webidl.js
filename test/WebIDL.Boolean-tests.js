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
		QUnit.equal(WebIDL.Boolean.prototype.type, 'Boolean');
	});

	assertion = 'Let x be the result of computing ToBoolean(V).';
	QUnit.test(assertion, function() {
		//falsies
		QUnit.equal(WebIDL.Boolean(), false, 'empty is falsy');
		QUnit.equal(WebIDL.Boolean(null), false, 'null is falsy');
		QUnit.equal(WebIDL.Boolean(undefined), false, 'unefined is falsy');
		QUnit.equal(WebIDL.Boolean(''), false, 'empty string  is falsy');
		QUnit.equal(WebIDL.Boolean(0), false, 'number 0 is falsy');
		QUnit.equal(WebIDL.Boolean(NaN), false, 'NaN is falsy');
		QUnit.equal(WebIDL.Boolean(false), false, 'false is falsy');

		//boxed
		QUnit.equal(new WebIDL.Boolean().value, false, 'value of empty is false');
		QUnit.equal(new WebIDL.Boolean(null).value, false, 'value of null is false');
		QUnit.equal(new WebIDL.Boolean(undefined).value, false, 'value of unefined is false');
		QUnit.equal(new WebIDL.Boolean('').value, false, 'value of empty string  is false');
		QUnit.equal(new WebIDL.Boolean(0).value, false, 'value of Zero is false');
		QUnit.equal(new WebIDL.Boolean(NaN).value, false, 'value of NaN is false');
		QUnit.equal(new WebIDL.Boolean(false).value, false, 'value of false is false');

		//truthies
		QUnit.equal(WebIDL.Boolean(true), true, 'true is truthy');
		QUnit.equal(WebIDL.Boolean({}), true, 'object is truthy');
		QUnit.equal(WebIDL.Boolean(new Boolean(false)), true, 'object is truthy');
		QUnit.equal(WebIDL.Boolean(' '), true, 'single space string is truthy');
		QUnit.equal(WebIDL.Boolean('false'), true, "'false' string is truthy");
		QUnit.equal(WebIDL.Boolean(function() {
			return false;
		}), true, 'functon is truthy');
		QUnit.equal(WebIDL.Boolean([]), true, 'Array is truthy');
		QUnit.equal(WebIDL.Boolean(1), true, '1 is true');
		QUnit.equal(WebIDL.Boolean(1234.5), true, 'Any number is true');
		QUnit.equal(WebIDL.Boolean(-1), true, '-1 number is true');
		QUnit.equal(WebIDL.Boolean(+Infinity), true, '+Infinity is true');
		QUnit.equal(WebIDL.Boolean(-Infinity), true, '-Infinity is true');
		QUnit.equal(WebIDL.Boolean(/false/), true, 'RegExp is true');

		//boxed
		QUnit.equal(new WebIDL.Boolean(true).value, true, 'true is truthy');
		QUnit.equal(new WebIDL.Boolean({}).value, true, 'object is truthy');
		QUnit.equal(new WebIDL.Boolean(new Boolean(false)).value, true, 'object is truthy');
		QUnit.equal(new WebIDL.Boolean(' ').value, true, 'string is truthy');
		QUnit.equal(new WebIDL.Boolean('false').value, true, 'string is truthy');
		QUnit.equal(new WebIDL.Boolean(function() {
			return false;
		}).value, true, 'functon is truthy');
		QUnit.equal(new WebIDL.Boolean([]).value, true, 'string is truthy');
		QUnit.equal(new WebIDL.Boolean(1).value, true, '1 is true');
		QUnit.equal(new WebIDL.Boolean(+Infinity).value, true, '+Infinity is true');
		QUnit.equal(new WebIDL.Boolean(-Infinity).value, true, '-Infinity is true');
		QUnit.equal(new WebIDL.Boolean(/false/).value, true, 'RegExp is true');
	});

	QUnit.test('Converter is exposed', function() {
		QUnit.ok(WebIDL.Boolean.prototype.converter, 'WebIDL Boolean converter is exposed.');
	});
});