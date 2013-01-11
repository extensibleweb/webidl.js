/**
 * 3.10.3. byte
 * The byte type is a signed integer type that has values in the range [−128, 127].
 * byte constant values in IDL are represented with integer tokens.
 * The type name of the byte type is “Byte”.
 **/
define(function(require) {
	'use strict';
	var IDLType = require('types/IDLType'),
		WebIDL = require('interfaces/WebIDL');

	WebIDL.Byte = function(value, extendedAttr) {
		if (!(this instanceof WebIDL.Byte)) {
			return toByte(value, extendedAttr);
		}
		this.extendedAttrs = extendedAttr;
		this.value = value;
	};

	//4.2.4. byte
	//The result of converting an IDL byte value to an ECMAScript value is a
	//Number that represents the same numeric value as the IDL byte value.
	//The Number value will be an integer in the range [−128, 127].
	//An ECMAScript value V is converted to an IDL byte value by running the following algorithm:


	function toByte(V, extendedAttr) {
		//Initialize x to ToNumber(V).
		var x = Number(V);
		//If the conversion to an IDL value is being performed due to any of the following:
		if (extendedAttr === 'EnforceRange') {
			//V is being assigned to an attribute annotated with the [EnforceRange] extended attribute,
			//V is being passed as an operation argument annotated with the [EnforceRange] extended attribute, or
			//V is being used as the value of dictionary member annotated with the [EnforceRange] extended attribute,
			//then:
			//If x is NaN, +∞, or −∞, then throw a TypeError.
			if (isNaN(x) || x === +Infinity || x === -Infinity) {
				throw new TypeError();
			}
			//Set x to sign(x) * floor(abs(x)).
			x = ((x > 0) ? 1 : -1) * Math.floor(Math.abs(x));

			//If x < −27 or x > 27 − 1, then throw a TypeError.
			if (x < Math.pow(-2, 7) || x > (Math.pow(2, 7) - 1)) {
				throw new TypeError();
			}
			//Return the IDL byte value that represents the same numeric value as x.
			return x;
		}

		//If x is not NaN and the conversion to an IDL value is being performed due to any of the following:
		if (extendedAttr === 'Clamp') {
			//V is being assigned to an attribute annotated with the [Clamp] extended attribute,
			//V is being passed as an operation argument annotated with the [Clamp] extended attribute, or
			//V is being used as the value of dictionary member annotated with the [Clamp] extended attribute,
			//then:
			//Set x to min(max(x, −27), 27 − 1).
			x = Math.min(Math.max(x, Math.pow(-2, 7)), Math.pow(2, 7) - 1);
			//Round x to the nearest integer, choosing the even integer if it lies halfway between two, and choosing +0 rather than −0.
			x = Math.abs(x - Math.round(x)) === 0.5 ? (((Math.round(x) % 2) === 0) ? Math.round(x) : Math.floor(x)) : Math.round(x);

			//Return the IDL byte value that represents the same numeric value as x.
			return x;
		}

		//If x is NaN, +0, −0, +∞, or−∞, then
		if (isNaN(x) || x === 0 || x === +Infinity || x === -Infinity) {
			//return the IDL byte value that represents 0.
            return 0;
        }

		//Set x to sign(x) * floor(abs(x)).
		x = ((x > 0) ? 1 : -1) * Math.floor(Math.abs(x));

		//Set x to x modulo 28.
		x = x % Math.pow(2, 8);
		//If x≥27,
		if (x >= Math.pow(2, 7)) {
			//return the IDL byte value that represents the same numeric value as x−28.Otherwise,
			return x - Math.pow(2, 8);
		}
		//return the IDL byte value that represents the same numeric value as x.
		return x;
	}
	WebIDL.Byte.prototype = new IDLType('Octet', toByte);
});
