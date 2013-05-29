/**
 * The ByteString type corresponds to the set of all possible sequences
 * of bytes. Such sequences might be interpreted as UTF-8 encoded strings
 * [RFC3629] or strings in some other 8-bit-per-code-unit encoding,
 * although this is not required.
 **/
require(['types/ByteString'], function() {
    'use strict';

    var requirement, QUnit = window.QUnit;

    module('WebIDL ByteString', {
        setup: function() {},
        teardown: function() {}
    });

    requirement = "Let x be ToString(V).";
    QUnit.test(requirement, function() {
        QUnit.strictEqual(window.WebIDL.ByteString(0), "0", 'number 0xff is string "255"');
        QUnit.strictEqual(window.WebIDL.ByteString(0xff), "255", 'number 0xff is string "255"');
    });

    requirement = "If the value of any element of x is greater than 255, then throw a TypeError.";
    QUnit.test(requirement, function() {
        QUnit.throws(

        function() {
            window.WebIDL.ByteString("\u0256");
        }, TypeError, "above 255 must throw.");
        QUnit.throws(

        function() {
            window.WebIDL.ByteString("a b c \u0256 d e f");
        }, TypeError, "above 255 must throw.");
    });

    requirement = "Return an IDL ByteString value whose length is the length of x, and where the value of each element is the value of the corresponding element of x.";
    QUnit.test(requirement, function() {
        QUnit.strictEqual(window.WebIDL.ByteString("test"), "test", 'strings must be equal');
    });

});