require(["types/Object"], function() {
	'use strict';
	var assertion, QUnit = window.QUnit,
		WebIDL = window.WebIDL;

	module("WebIDL Object");

	QUnit.module('WebIDL Object', {
		setup: function() {},
		teardown: function() {}
	});

	QUnit.test('WebIDL Object type is global.', function() {
		QUnit.ok(window.WebIDL.Object, 'WebIDL Object type is exposed.');
	});

	assertion = 'If Type(V) is not Object, then throw a TypeError.';
	QUnit.test(assertion, function() {
		QUnit.throws(function() {
			WebIDL.Object();
		}, TypeError, 'undefined throws TypeError');
		QUnit.throws(function() {
			WebIDL.Object(undefined);
		}, TypeError, 'undefined throws TypeError');
		QUnit.throws(function() {
			WebIDL.Object(null);
		}, TypeError, 'null throws TypeError');
		QUnit.throws(function() {
			WebIDL.Object(123);
		}, TypeError, 'number throws TypeError');
		QUnit.throws(function() {
			WebIDL.Object(-0.123);
		}, TypeError, 'number throws TypeError');
		QUnit.throws(function() {
			WebIDL.Object('');
		}, TypeError, 'string throws TypeError');
		QUnit.throws(function() {
			WebIDL.Object(Infinity);
		}, TypeError, 'Infinity throws TypeError');
		QUnit.throws(function() {
			WebIDL.Object(NaN);
		}, TypeError, 'NaN throws TypeError');
	});

	assertion = 'Return the IDL object value that is a reference to the same object as V.';
	QUnit.test(assertion, function() {
		var obj = {},
			inst = new WebIDL.Object(WebIDL.Object);
		QUnit.equal(inst.value, WebIDL.Object, 'Object in, same object out');
		inst.value = obj;
		QUnit.equal(inst.value, obj, 'Object in, same object out');
	});
});