/**
 * 3.10.9. long long
 * The long long type is a signed integer type that has values
 * in the range [−9223372036854775808, 9223372036854775807].
 * long long constant values in IDL are represented with integer tokens.
 *
 * The type name of the long long type is “LongLong”.
 **/
define(function(require) {
	'use strict';
	var IDLType = require('types/IDLType'),
		WebIDL = require('interfaces/WebIDL');

	WebIDL.LongLong = function(value, extendedAttr) {
		if(!(this instanceof WebIDL.LongLong)) {
			return toLongLong(value, extendedAttr);
		}
		this.extendedAttrs = extendedAttr;
		this.value = value;
	};

	//The result of converting an IDL long long value to an ECMAScript value is a
	//Number value that represents the closest numeric value to the long long,
	//choosing the numeric value with an even significand if there are two equally
	//close values ([ECMA-262], section 8.5). 
	//If the long long is in the range (−(253 − 1), 253 − 1), then the Number will 
	//be able to represent exactly the same value as the long long.
	//An ECMAScript value V is converted to an IDL long long value by running the following algorithm:
	
	function toLongLong(V, extendedAttr) {
		//Initialize x to ToNumber(V).
		var x = Number(x);
		if(extendedAttr === "EnforceRange") {
			//If the conversion to an IDL value is being performed due to any of the following:
			//V is being assigned to an attribute annotated with the [EnforceRange] extended attribute,
			//V is being passed as an operation argument annotated with the [EnforceRange] extended attribute, or
			//V is being used as the value of dictionary member annotated with the [EnforceRange] extended attribute,
			//then:
			//If x is NaN, +∞, or −∞, then throw a TypeError.
			if(isNaN(x) || x === +Infinity || x === -Infinity) {
				throw new TypeError();
			}
			//Set x to sign(x) * floor(abs(x)).
			x = ((x > 0) ? 1 : -1) * Math.floor(Math.abs(x));

			//If x < −(253 − 1) or x > 253 − 1, then throw a TypeError.
			if(x < -(Math.pow(2, 53) - 1) || x > (Math.pow(2, 53) - 1)) {
				throw new TypeError();
			}
			//Return the IDL long long value that represents the same numeric value as x.
			return x;
		}
		if(extendedAttr === "Clamp") {
			//If x is not NaN and the conversion to an IDL value is being performed due to any of the following:
			//V is being assigned to an attribute annotated with the [Clamp] extended attribute,
			//V is being passed as an operation argument annotated with the [Clamp] extended attribute, or
			//V is being used as the value of dictionary member annotated with the [Clamp] extended attribute,
			//then:
			//Set x to min(max(x, −(253 − 1)), 253 − 1).
			x = Math.min(Math.max(x, -(Math.pow(-2, 53) - 1)), Math.pow(2, 53) - 1);
			//Round x to the nearest integer, choosing the even integer if it lies halfway between two, and choosing +0 rather than −0.
			x = Math.abs(x - Math.round(x)) === 0.5 ? (((Math.round(x) % 2) === 0) ? Math.round(x) : Math.floor(x)) : Math.round(x);
			//Return the IDL long long value that represents the same numeric value as x.
			return x;
		}
		//If x is NaN, +0, −0, +∞, or −∞, then return the IDL long long value that represents 0.
		if(isNaN(x) || x === 0 || x === Infinity || x === -Infinity) {
			return 0;
		}
		//Set x to sign(x) * floor(abs(x)).
		x = ((x > 0) ? 1 : -1) * Math.floor(Math.abs(x));
		//Set x to x modulo 264.
		x = x % Math.pow(2, 64);
		//If x is greater than or equal to 263, then set x to x − 264.
		if(x >= Math.floor(2, 63)) {
			x = x - Math.floor(2, 64);
		}
		//Return the IDL long long value that represents the same numeric value as x.
		return x;
	}
	WebIDL.LongLong.prototype = new IDLType('LongLong', toLongLong);
});