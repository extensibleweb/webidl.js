/*
To add:
  RegExp
  unsigned long
  long long
  unsigned long long
  float
  unrestricted float
  ByteString
*/

module("WebIDL Interface");

asyncTest("should exist in global", function() {

  setTimeout(function() {
    QUnit.start();
    ok(window.WebIDL, "WebIDL is global.");
    ok(window.WebIDL.Boolean, "WebIDL Boolean type is global.");
    ok(window.WebIDL.DOMString, "WebIDL DOMString type is global.");
    ok(window.WebIDL.Double, "WebIDL Double type is global.");
    ok(window.WebIDL.Byte, "WebIDL Byte type is global.");
    ok(window.WebIDL.Octet, "WebIDL Octet type is global.");
    ok(window.WebIDL.Short, "WebIDL Short type is global.");
    ok(window.WebIDL.UnsignedShort, "WebIDL UnsignedShort type is global.");
    ok(window.WebIDL.Object, "WebIDL Object type is global.");
    ok(window.WebIDL.Date, "WebIDL Date type is global.");
    ok(window.WebIDL.Long, "WebIDL Long type is global.");
    ok(window.WebIDL.UnrestrictedDouble, "WebIDL Unrestricted Double is global");
  }, 200);
});