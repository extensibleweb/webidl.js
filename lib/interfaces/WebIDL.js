define(function(require) {
	'use strict';
	var parser = require("deps/webidlParser"),
		webIDL;

	function WebIDL() {}

	function exportInterfaceObject(interfaceProto, identifier) {
		var functionBody = 'return function ' + identifier + '(){throw new TypeError(\'DOM object constructor cannot be called as a function\')}',
			interfaceObject = new Function(functionBody)(),
			toString = null,
			protoProps = null,
			objectToString;

		//emulate native code toString()


		function toStringMaker(name) {
			return function() {
				return 'function ' + name + '() { [native code] }';
			};
		}

		toString = toStringMaker(identifier);

		objectToString = function() {
			if(this instanceof interfaceProto) {
				return '[object ' + identifier + ']';
			}
			return '[object ' + identifier + 'Prototype]';
		};

		interfaceProto.prototype.toString = objectToString;
		interfaceObject.prototype = interfaceProto.prototype;
		protoProps = {
			writable: false,
			enumerable: false,
			configurable: false
		};
		Object.defineProperty(interfaceObject, 'prototype', protoProps);

		interfaceProto.prototype.constructor = interfaceObject;
		Object.defineProperty(interfaceProto.prototype, 'constructor', {
			enumerable: false
		});

		//prevents Empty() function as being the prototype
		interfaceObject.__proto__ = Object.create({});

		//replace toString with a "native" looking one
		interfaceProto.toString = interfaceObject.toString = toString;

		//Expose on global object
		Object.defineProperty(window, identifier, {
			value: interfaceObject
		});
	}

	function checkAccess(object) {
		if(!(object instanceof WebIDL)) {
			throw new TypeError('Illegal invocation');
		}
	}

	WebIDL.prototype = Object.create(parser);

	WebIDL.prototype.implement = function() {
		checkAccess(this);
		throw "Not implemented yet";
	};

	WebIDL.prototype.toJS = function() {
		checkAccess(this);
		throw "Not implemented yet";
	};

	exportInterfaceObject(WebIDL, "WebIDL");
	webIDL = new WebIDL();

	window.webIDL = webIDL;
	return window.WebIDL;
});