require(['types/CallbackFunction'], function() {
	'use strict';
	var assertion, QUnit = window.QUnit;

	module('WebIDL CallbackFunction', {
		setup: function() {},
		teardown: function() {}
	});

	assertion = "If the result of calling IsCallable(V) is false, then then throw a TypeError.";
	QUnit.test(assertion, function() {
		QUnit.throws(function() {
			window.WebIDL.CallbackFunction();
		}, TypeError, "Undefined needs to throw");
		QUnit.throws(function() {
			window.WebIDL.CallbackFunction(undefined);
		}, TypeError, "Undefined needs to throw");
		QUnit.throws(function() {
			window.WebIDL.CallbackFunction(null);
		}, TypeError, "Null needs to throw");
		QUnit.throws(function() {
			window.WebIDL.CallbackFunction(true);
		}, TypeError, "Boolean needs to throw");
		QUnit.throws(function() {
			window.WebIDL.CallbackFunction(false);
		}, TypeError, "Boolean needs to throw");
		QUnit.throws(function() {
			window.WebIDL.CallbackFunction(0x0);
		}, TypeError, "Number needs to throw");
		QUnit.throws(function() {
			window.WebIDL.CallbackFunction(NaN);
		}, TypeError, "Number needs to throw");
		QUnit.throws(function() {
			window.WebIDL.CallbackFunction(+Infinity);
		}, TypeError, "Number needs to throw");
		QUnit.throws(function() {
			window.WebIDL.CallbackFunction("");
		}, TypeError, "String needs to throw");
		QUnit.throws(function() {
			window.WebIDL.CallbackFunction({});
		}, TypeError, "not callable object needs to throw");
		QUnit.throws(function() {
			window.WebIDL.CallbackFunction({
				call: null
			});
		}, TypeError, "not callable object needs to throw");

	});

	assertion = "Return the IDL callback function type value that represents a reference to that Function object.";
	QUnit.test(assertion, function() {
		var func = function() {};
		QUnit.strictEqual(window.WebIDL.CallbackFunction(func), func, "func was returned.");
		QUnit.strictEqual(window.WebIDL.CallbackFunction(window.WebIDL.CallbackFunction), window.WebIDL.CallbackFunction, "callable was returned.");
	});

	assertion = 'The type name of a callback function type is the identifier of the callback function.';
	QUnit.test(assertion, function() {
		var testInstance = new window.WebIDL.CallbackFunction(function(){},"Test");
		QUnit.strictEqual(testInstance.type, "Test", 'The type is "Test".');
	});
});