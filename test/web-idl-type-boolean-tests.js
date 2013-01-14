module("WebIDL Boolean");

require(["types/Boolean"], function(boolFunc){

  test("Boolean global", function(){
    ok(boolFunc, "Sanity check");
    equal(typeof(boolFunc), "function", "Should be a function.");
  });

  test("Boolean instantiation", function(){
    var truthness = new boolFunc(1===1);
    ok(truthness.value, "Should be truthy value.");
    var falseness = new boolFunc(1!==1);
    ok(!falseness.value, "Should be falsy value.");
  });

  test("Boolean converter", function(){
    var booln = new boolFunc();
    equal(booln.converter(1===1), true, "Should convert to truthy.");
    equal(booln.converter(1!==1), false, "Should convert to falsy.");
  });
  
});