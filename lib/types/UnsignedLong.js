/*
3.10.8. unsigned long
The unsigned long type is an unsigned integer type that has
values in the range [0, 4294967295].
unsigned long constant values in IDL are represented with
integer tokens.
*/
define(function(require) {
    'use strict';
    var IDLType = require('types/IDLType'),
        WebIDL = require('interfaces/WebIDL');

    WebIDL.UnsignedLong = function(value, extendedAttr) {
        if (!(this instanceof WebIDL.UnsignedLong)) {
            return toUnsignedLong(value, extendedAttr);
        }
        //The type name of the unsigned long type is “UnsignedLong”.
        IDLType.call(this, 'UnsignedLong', toUnsignedLong, value, extendedAttr);
    };

    /*
	The result of converting an IDL unsigned long value to an ECMAScript
	value is a Number that represents the same numeric value as the
	IDL unsigned long value. The Number value will be an integer in 
	the range [0, 4294967295].

	An ECMAScript value V is converted to an IDL unsigned long value 
	by running the following algorithm:
    */

    function toUnsignedLong(V, extendedAttr){
    	//Initialize x to ToNumber(V).
    	var x = Number(V);
		//@see http://people.mozilla.org/~jorendorff/es6-draft.html#sec-9.1.6
		function esToUint32(x) {
			var number, posInt, n, int32bit;
	        //Let number be the result of calling ToNumber on
	        //the input argument.
	        number = Number(x);
	        //If number is NaN, +0, −0, +∞, or −∞, return +0.
	        if (isNaN(x) || number === 0 || number === Infinity || number === -Infinity) {
	            return +0;
	        }
	        //Let posInt be sign(number) * floor(abs(number)).
	        posInt = ((number > 0) ? 1 : -1) * Math.floor(Math.abs(number));
	        //Let int32bit be posInt modulo 2^32; that is, a finite 
	        //integer value k of Number type with
	        //positive sign and less than 2^32 in magnitude such
	        //that the mathematical difference of
	        //posInt and k is mathematically an integer multiple 
	        //of 2^32.
	        n = Math.pow(2, 32);
	        int32bit = ((posInt % n) + n) % n;
	        //Return int32bit.
	        return int32bit;
	    }

		//If the conversion to an IDL value is being performed due 
		//to any of the following:
		if(extendedAttr === "EnforceRange"){
			//V is being assigned to an attribute annotated with
			//the [EnforceRange] extended attribute,
			//V is being passed as an operation argument annotated 
			//with the [EnforceRange] extended attribute, or
			//V is being used as the value of dictionary member 
			//annotated with the [EnforceRange] extended attribute,
			//then:
			//If x is NaN, +∞, or −∞, then throw a TypeError.
			if (isNaN(x) || x === +Infinity || x === -Infinity) {
                throw new TypeError();
            }
			//Set x to sign(x) * floor(abs(x)).
			x = ((x > 0) ? 1 : -1) * Math.floor(Math.abs(x));

			//If x < 0 or x > 2^32 − 1, then throw a TypeError.
			if (x < 0  || x > (Math.pow(2, 32) - 1)) {
                throw new TypeError();
            }
			//Return the IDL unsigned long value that represents 
			//the same numeric value as x.
			return x;
		}

		//If x is not NaN and the conversion to an IDL value is being performed due to any of the following:
		if(extendedAttr === "Clamp"){
			//V is being assigned to an attribute annotated with the
			//[Clamp] extended attribute,
			//V is being passed as an operation argument annotated with
			//the [Clamp] extended attribute, or
			//V is being used as the value of dictionary member 
			//annotated with the [Clamp] extended attribute,
			//then:
			//Set x to min(max(x, 0), 2^32 − 1).
			x = Math.min(Math.max(x, 0), Math.pow(2, 32) - 1);
			//Round x to the nearest integer, choosing the even 
			//integer if it lies halfway between two, and choosing
			//+0 rather than −0.
			x = Math.abs(x - Math.round(x)) === 0.5 ? (((Math.round(x) % 2) === 0) ? Math.round(x) : Math.floor(x)) : Math.round(x);
			//Return the IDL unsigned long value that represents the same numeric value as x.
			return x; 
		}
		//Set x to ToUint32(x).
		x = esToUint32(x)
		//Return the IDL unsigned long value that represents the same numeric value as x.
		return x;
	}
    WebIDL.UnsignedLong.prototype = IDLType;
    return WebIDL.UnsignedLong;
});