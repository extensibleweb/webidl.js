module("WebIDL Interface");

asyncTest("should exist in global", function(){
  
  setTimeout(function(){
    QUnit.start();
    ok(window.webIDL, "WebIDL is global.");
    ok(window.WebIDL.Boolean, "WebIDL Boolean type is global.");
    ok(window.WebIDL.DOMString, "WebIDL DOMString type is global.");
    ok(window.WebIDL.Double, "WebIDL Double type is global.");
  },200);

});