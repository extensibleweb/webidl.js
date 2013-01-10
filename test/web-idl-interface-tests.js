module("WebIDL Interface");

asyncTest("should exist in global", function(){
  
  setTimeout(function(){
    QUnit.start();
    ok(window.webIDL, "WebIDL is global.");
    ok(window.webIDL.Boolean, "WebIDL Boolean type is global.");
    ok(window.webIDL.DOMString, "WebIDL DOMString type is global.");
    ok(window.webIDL.Double, "WebIDL Double type is global.");
  },200);

});