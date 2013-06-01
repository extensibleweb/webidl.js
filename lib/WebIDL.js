define(function(require) {
    'use strict';
    var parser = require('deps/webidlParser'),
        interfaceObject = exportInterfaceObject(WebIDL, 'WebIDL');

    function WebIDL() {
        parser.call(this);
    }

    //Implements an operation a per the spec
    function implementOperation(object, name, operation) {
        var property = { writable: true, enumerable: true, configurable: true };
        property.value = operation;
        Object.defineProperty(object, name, property);
        return object[name];
    }

    //Implements and attribute on an object
    //@param name the name of the property is the identifier of the attribute.
    //TODO: implement extended attributes
    function implementAttr(object, name, isReadOnly, isStatic, get, set, extendedAttrs) {
        var property = {
                get: get,
                set: undefined,
                enumerable: true,
                configurable: !!(extendedAttrs.unforgable) || true
            },
            interfaceObject;

        if (typeof object !== 'object' || typeof name !== 'string') {
            throw new TypeError();
        }

        //setter
        if (!isReadOnly) {
            property.set = function() {
                if (arguments.length === 0) {
                    throw new TypeError();
                }
                return set(arguments[0]);
            };
        }

        //getter
        if (!!isStatic) {
            if (typeof object !== 'function') {
                interfaceObject = Object.getProtoTypeOf(object).prototype;
                if (typeof interfaceObject !== 'function') {
                    throw new TypeError();
                }
            }
            object = interfaceObject;
            return;
        }
        Object.defineProperty(object, name, property);
    }

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
            if (this instanceof interfaceProto) {
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
        return interfaceObject;
    }

    function checkAccess(object) {
        if (!(object instanceof WebIDL)) {
            throw new TypeError('Illegal invocation');
        }
    }

    WebIDL.prototype = Object.create(parser);
    implementOperation(interfaceObject, 'implementAttr', implementAttr);
    implementOperation(interfaceObject, 'implementOperation', implementOperation);
    implementOperation(interfaceObject, 'exportInterface', exportInterfaceObject);

    WebIDL.prototype.implement = function() {
        checkAccess(this);
        throw 'Not implemented yet';
    };

    WebIDL.prototype.toJS = function() {
        checkAccess(this);
        throw 'Not implemented yet';
    };

    return interfaceObject;
});
