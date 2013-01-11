/**
 * 3.10.25. Date
 * The Date type is a type that represents an instant in time with millisecond accuracy.
 * The instants in time that this type can represent are the same that can be represented with
 * ECMAScript Date objects ([ECMA-262], section 15.9.1.1) – namely, every millisecond in the
 * 200,000,000 days centered around midnight of 1 January, 1970 UTC, except for any millisecond
 * that is part of an inserted leap second, because they cannot be represented by this type.
 *
 * An additional value that this type can represent is one that indicates an indeterminate
 * or undefined time, which we write as undefined.
 *
 * There is no way to represent a constant Date value in IDL.
 *
 * The type name of the Date type is “Date”.
 **/
define(function(require) {
    'use strict';
    var IDLType = require('types/IDLType'),
        WebIDL = require('interfaces/WebIDL');

    WebIDL.Date = function(value) {
        var props, oldGetter;
        if (!(this instanceof WebIDL.Date)) {
            return toDate(value);
        }
        //Web IDL requires that the a new Date instace is always returned
        //so we override the standard getter to always return a new Date instace.
        props = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this), 'value');
        oldGetter = props.get;
        props.get = function() {
            var value = oldGetter();
            return getDate(value);
        };
        Object.defineProperty(this, 'value', props);
        this.value = value;
    };
    //An IDL Date value V is converted to an ECMAScript value by running the following the algorithm:
    function getDate(V) {
        //If V is the undefined Date value,
        //then return a newly constructed ECMAScript Date object whose time value is NaN.
        //Otherwise, return a newly constructed ECMAScript Date object
        //that represents the same millisecond as V.
        //Platform objects returning an ECMAScript Date object from attributes,
        //operations or exception field do not hold on to a reference to the Date object.
        //A script that modifies a Date object so retrieved cannot affect the platform object it
        //was retrieved from.
        return new Date(V);
    }
    /*
    IDL Date values are represented by ECMAScript Date objects.
    An ECMAScript value V is converted to an IDL Date value by running the following algorithm:
    */
    function toDate(V) {
        //If V is not an ECMAScript Date object, then throw a TypeError.
        if (!(V instanceof Date)) {
            throw new TypeError();
        }
        //If the time value of V is NaN, then return the undefined IDL Date value.
        if (isNaN(V.getTime())) {
            return undefined;
        }
        //Return the IDL Date value that represents the same time value as V.
        return V.getTime();
    }
    WebIDL.Date.prototype = new IDLType('Date', toDate);
});
