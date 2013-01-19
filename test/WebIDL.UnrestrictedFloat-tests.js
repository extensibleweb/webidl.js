require(['types/UnrestrictedFloat'], function() {
	'use strict';

	var requirement, QUnit = window.QUnit;

	module('WebIDL UnrestrictedFloat', {
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

	requirement = 'Let x be ToNumber(V).';
	QUnit.test(requirement, function() {
		QUnit.strictEqual(window.WebIDL.UnrestrictedFloat(null), 0, 'null is 0');
		QUnit.strictEqual(window.WebIDL.UnrestrictedFloat(''), 0, 'empty string  is 0');
		QUnit.strictEqual(window.WebIDL.UnrestrictedFloat(0), 0, 'number 0 is 0');
		QUnit.strictEqual(window.WebIDL.UnrestrictedFloat(false), 0, 'false is 0');
		QUnit.strictEqual(window.WebIDL.UnrestrictedFloat(true), 1, 'true is 1');
		QUnit.strictEqual(window.WebIDL.UnrestrictedFloat(''), 0, 'empty string  is 0');
		QUnit.strictEqual(window.WebIDL.UnrestrictedFloat(' \t\n\t '), 0, 'random whitespace is 0');
		QUnit.strictEqual(window.WebIDL.UnrestrictedFloat('	123  '), 123, 'Whitespace removed is 123');
		QUnit.strictEqual(window.WebIDL.UnrestrictedFloat('	-123.123  '), -123.12300109863281, 'Converted to nearest float');
	});
	requirement = "If x is NaN, then return the IDL unrestricted float value that represents the IEEE 754 NaN value with the bit pattern 0x7fc00000 [IEEE-754].";
	QUnit.test(requirement, function() {
		QUnit.strictEqual(window.WebIDL.UnrestrictedFloat(),0x7fc00000, 'ToNumber() is NaN so 0x7fc00000');
		QUnit.strictEqual(window.WebIDL.UnrestrictedFloat(undefined),0x7fc00000, 'ToNumber(undefined) is NaN so 0x7fc00000');
		QUnit.strictEqual(window.WebIDL.UnrestrictedFloat(NaN),0x7fc00000, 'NaN 0x7fc00000');
	});
	requirement = 'Let y be the [32-bit IEEE float] that is closest to x, selecting the number with an even significand if there are two equally close values';
	QUnit.test(requirement, function() {
		QUnit.strictEqual(window.WebIDL.UnrestrictedFloat(0.1), 0.10000000149011612);
		QUnit.strictEqual(window.WebIDL.UnrestrictedFloat(0.2), 0.20000000298023224);
		QUnit.strictEqual(window.WebIDL.UnrestrictedFloat(3.141592653589793), 3.1415927410125732);
	});
	requirement = "If y is 2^128, return +∞.";
	QUnit.test(requirement, function() {
		QUnit.strictEqual(window.WebIDL.UnrestrictedFloat(Math.pow(2,128)),+Infinity, '2^128 is +Infinity');
	});
	requirement = "If y is −2^128, return −∞.";
	QUnit.test(requirement, function(){
		QUnit.strictEqual(window.WebIDL.UnrestrictedFloat(-Math.pow(2,128)),-Infinity, '-2^128 is -Infinity');
	});
	requirement = "If y is +0 and x is negative, return −0.";
	QUnit.test(requirement, function() {
		QUnit.strictEqual(isNegative0(window.WebIDL.UnrestrictedFloat(-8e-47)), true);
		QUnit.strictEqual(isNegative0(window.WebIDL.UnrestrictedFloat(8e-47)), false);
		QUnit.strictEqual(isNegative0(window.WebIDL.UnrestrictedFloat(-0.0)), true);
		QUnit.strictEqual(isNegative0(window.WebIDL.UnrestrictedFloat(0.0)), false);
	});
	requirement = "Return y.";
	QUnit.test(requirement,function(){
		QUnit.strictEqual(window.WebIDL.UnrestrictedFloat(42), 42, 'valid input does not throw');
	})
});