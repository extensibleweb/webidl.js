require(['types/Any'], function() {
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

	module('WebIDL Any', {
		setup: function() {},
		teardown: function() {}
	});


	assertion = "The undefined value. The IDL value is an object reference to a special object that represents the ECMAScript undefined value.";
	QUnit.test(assertion, function() {
		QUnit.strictEqual(window.WebIDL.Any(), undefined, "undefined was returned.");
		QUnit.strictEqual(window.WebIDL.Any(undefined), undefined, "undefined was returned.");
	});
	assertion = "The null value. The IDL value is the null object? reference.";
	QUnit.test(assertion, function() {
		QUnit.strictEqual(window.WebIDL.Any(null), null);
	});
	assertion = "A Boolean value. The IDL value is the boolean value that represents the same truth value.";
	QUnit.test(assertion, function() {
		QUnit.strictEqual(window.WebIDL.Any(true), true);
		QUnit.strictEqual(window.WebIDL.Any(false), false);
	});
	assertion = "A Number value. The IDL value is that which is obtained by following the rules for converting the Number to an IDL unrestricted double value, as described in section 4.2.15, below.";
	QUnit.test(assertion, function() {
		var neg0 = window.WebIDL.Any(-0);
		QUnit.strictEqual(neg0, isNegative0(neg0), "negative 0 needs to remain negative");
		QUnit.strictEqual(window.WebIDL.Any(1), 1);
		QUnit.strictEqual(window.WebIDL.Any(-1), -1);
		QUnit.strictEqual(window.WebIDL.Any(Math.pow(2,128)), +Infinity);
		QUnit.strictEqual(window.WebIDL.Any(-Math.pow(2,128)), -Infinity);
	});

	assertion = "A String value. The IDL value is that which is obtained by following the rules for converting the String to an IDL DOMString value, as described in section 4.2.16, below.";
	QUnit.test(assertion, function() {
		QUnit.strictEqual(window.WebIDL.Any(""), "");
		QUnit.strictEqual(window.WebIDL.Any("test"), "test");
	});
	assertion = "An object value. The IDL value is an object value that references the same object.";
	QUnit.test(assertion, function() {
		var obj = {};
		QUnit.strictEqual(window.WebIDL.Any(this), this);
		QUnit.strictEqual(window.WebIDL.Any(obj), obj);
	});

	assertion = 'The type name of the any type is “Any”.';
	QUnit.test(assertion, function() {
		QUnit.strictEqual(window.WebIDL.Any.prototype.type, 'Any', 'The type is “Any”.');
	});
});