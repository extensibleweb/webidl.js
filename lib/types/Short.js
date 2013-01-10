/**
 * 3.10.5. short
 * The short type is a signed integer type that has values in the range [−32768, 32767].
 * 
 * short constant values in IDL are represented with integer tokens.
 * The type name of the short type is “Short”.
**/

define(function(require) {
	'use strict';
	var IDLType = require("types/IDLType"),
		WebIDL = require("interfaces/WebIDL");

	//An ECMAScript value V is converted to an IDL short value by running the following algorithm:
	function toShort(V, extendedAttr){
		//Initialize x to ToNumber(V).
		var x = Number(V);
		//If the conversion to an IDL value is being performed due to any of the following:
		if(extendedAttr === "EnforceRange"){
			V is being assigned to an attribute annotated with the [EnforceRange] extended attribute,
			V is being passed as an operation argument annotated with the [EnforceRange] extended attribute, or
			V is being used as the value of dictionary member annotated with the [EnforceRange] extended attribute,
			then:
			If x is NaN, +∞, or −∞, then throw a TypeError.
			Set x to sign(x) * floor(abs(x)).
			If x < −215 or x > 215 − 1, then throw a TypeError.
			Return the IDL short value that represents the same numeric value as x.
		}
		if(!isNaN(x) && extendedAttr === "Clamp")
		If x is not NaN and the conversion to an IDL value is being performed due to any of the following:
		V is being assigned to an attribute annotated with the [Clamp] extended attribute,
		V is being passed as an operation argument annotated with the [Clamp] extended attribute, or
		V is being used as the value of dictionary member annotated with the [Clamp] extended attribute,
		then:
		Round x to the nearest integer, choosing the even integer if it lies halfway between two.
		Set x to min(max(x, −215), 215 − 1).
		Return the IDL short value that represents the same numeric value as x.
		If x is NaN, +0, −0, +∞, or −∞, then return the IDL short value that represents 0.
		Set x to sign(x) * floor(abs(x)).
		Set x to x modulo 216.
		If x ≥ 215, return the IDL short value that represents the same numeric value as x − 216. Otherwise, return the IDL short value that represents the same numeric value as x.
	}

	WebIDL.Short.prototype = new IDLType('Short', toShort);
});
