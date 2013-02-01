/*
3.10.23. Sequences — sequence<T>
The sequence<T> type is a parameterized type whose values are (possibly zero-length)
sequences of values of type T.

Sequences are always passed by value. In language bindings where a sequence is represented
by an object of some kind, passing a sequence to a platform object will not result
in a reference to the sequence being kept by that object. Similarly, any sequence
returned from a platform object will be a copy and modifications made to it will not
be visible to the platform object.

There is no way to represent a constant sequence value in IDL.

Sequences must not be used as the type of an attribute, constant or exception field.

Note
This restriction exists so that it is clear to specification writers and API users
that sequences are copied rather than having references to them passed around. Instead
of a writable attribute of a sequence type, it is suggested that a pair of operations
to get and set the sequence is used. Another option is to use an array type, which can
be used as the type of an attribute.
*/
define(function(require) {
	'use strict';
	var IDLType = require('types/IDLType'),
		WebIDL = require('interfaces/WebIDL');

	WebIDL.Sequence = function(T, value) {
		var props, oldGetter;
		if(!(this instanceof WebIDL.Sequence)) {
			return toSequence(T, value);
		}

		//The type name of a sequence type is the 
		//concatenation of the type name for T and the string “Sequence”.
		IDLType.call(this, T + "Sequence", toSequence, value);

		//redefine the value getter
		props = Object.getOwnPropertyDescriptor(this, 'value');
		oldGetter = props.get;
		props.get = function() {
			var value = oldGetter();
			return toESArray(value);
		};
		Object.defineProperty(this, 'value', props);
	};

	/*
	An IDL sequence value S0..n−1 of type sequence<T> is converted to an 
	ECMAScript Array object as follows:
	*/
	function toESArray(S, T) {
		//Let A be a new Array object created as if by the expression [].
		var A = [],
			//Initialize i to be 0.
			i = 0,
			//n is not defiend, filed bug: https://www.w3.org/Bugs/Public/show_bug.cgi?id=20735
			n = S.length,
			E, P;
		//While i < n:
		while(i < n) {
			//Let E be the result of converting Si to an ECMAScript value.
			E = S[i].value;
			//Let P be the result of calling ToString(i).
			P = String(i);
			//Call the [[DefineOwnProperty]] internal method on A with property name P,
			//descriptor { [[Writable]]: true, [[Enumerable]]: true, [[Configurable]]: true, [[Value]]: E }
			//and Boolean flag false.
			//Note: ES6 no longer requires boolean flag
			Object.defineProperty(A, P, {
				writable: true,
				enumerable: true,
				configurable: true,
				value: E
			});
			//Set i to i + 1.
			i++;
		}
		//Return A.
		return A;
	}

	/*
	IDL sequence<T> values are represented by ECMAScript Array values.
	An ECMAScript value V is converted to an IDL sequence<T> value as follows:
	*/
	function toSequence(T, V) {
		var n, i, S, length, P, E;

		function esToUint32(x) {
			var number, posInt, n, int32bit;
			//Let number be the result of calling ToNumber on
			//the input argument.
			number = Number(x);
			//If number is NaN, +0, −0, +∞, or −∞, return +0.
			if(isNaN(x) || number === 0 || number === Infinity || number === -Infinity) {
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

		//Initialize i to be 0.
		i = 0;
		//Depending on the type of V:
		//A platform array object
		//Note: [[Prototype]] property of a platform array object is Array prototype. 
		if(Object.getPrototypeOf(V) instanceof Array) {
			//Let n be the length of the platform array object.
			n = V.length;
			//Initialize S[0..n−1] to be an IDL sequence with elements of type T,
			//where each element is uninitialized.
			S = new Array(n);
			//While i < n:
			while(i < n) {
				//Let E be the result of converting the platform array object element 
				//at index i to an ECMAScript value.
				E = WebIDL.toIDLValue(T, V[i]);
				//Set S[i] to the result of converting E to an IDL value of type T.
				S[i] = E;
				//Set i to i + 1.
				i++;
			}
			//Return S.
			return S;
		}
		//Any kind of object except for a native Date object or a native RegExp object
		//Note: assuming that the V will have a .length for indexed props 
		//see https://www.w3.org/Bugs/Public/show_bug.cgi?id=16833
		//see https://www.w3.org/Bugs/Public/show_bug.cgi?id=20535
		if(!(V instanceof Date) && !(V instanceof RegExp)) {
			//Let length be one greater than V’s maximum indexed property index,
			//if V is a platform object that supports indexed properties,
			//or the result of calling [[Get]] on V with property name “length” otherwise.
			length = V.length;

			//Let n be the result of calling ToUint32(length).
			n = esToUint32(V.length);

			//Initialize S[0..n−1] to be an IDL sequence with elements of type T,
			//where each element is uninitialized.
			S = new Array(n);

			//While i < n:
			while(i < n) {
				//Let P be the result of calling ToString(i).
				P = String(i);
				//Let E be the result of calling [[Get]] on V with property name P.
				E = V[i];
				//Set S[i] to the result of converting E to an IDL value of type T.
				S[i] = WebIDL.toIDLValue(T, E);
				//Set i to i + 1.
				i++;
			}
			//Return S.
			return S;
		}
		//Otherwise
		//Throw a TypeError.
		throw new TypeError();
	}
	WebIDL.Sequence.prototype = IDLType;
    return WebIDL.Sequence;
});