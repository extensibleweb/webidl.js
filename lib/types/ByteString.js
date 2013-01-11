/**
The ByteString type corresponds to the set of all possible sequences of bytes. 
Such sequences might be interpreted as UTF-8 encoded strings [RFC3629] or
strings in some other 8-bit-per-code-unit encoding, although this is not required.
There is no way to represent a constant ByteString value in IDL.
The type name of the ByteString type is “ByteString”.
*/
define(function (require) {
	'use strict';
	var IDLType = require("types/IDLType"),
		WebIDL = require("interfaces/WebIDL");

	WebIDL.ByteString = function(value) {
		if(!(this instanceof WebIDL.ByteString)) {
			return toByteString(value);
		}
		this.value = value;
	};

	//4.2.17. ByteString
	//An ECMAScript value V is converted to an IDL ByteString value by running the following algorithm:
	//The result of converting an IDL ByteString value to an ECMAScript value 
	//is a String value whose length is the length of the ByteString,
	//and the value of each element of which is the value of the corresponding
	//element of the ByteString.
	function toByteString(V){
		//Let x be ToString(V).
		var x = String(V);
		//If the value of any element of x is greater than 255, then throw a TypeError.
		for (var i = x.length - 1; i >= 0; i--) {
			if(x.charCodeAt(i) > 255){
				throw new TypeError();
			}
		}
		//Return an IDL ByteString value whose length is the length of x, 
		//and where the value of each element is the value of the corresponding element of x.
		return "".concat(x);
	}

	WebIDL.ByteString.prototype = new IDLType('ByteString', toByteString);	
});