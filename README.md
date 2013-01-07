# webidl.js

An implementation of [WebIDL](http://dev.w3.org/2006/webapi/WebIDL/) in [ECMAScript](http://es5.github.com/).

## Goals and Scope

The initial goal of this project is to implement the [WebIDL](http://dev.w3.org/2006/webapi/WebIDL/) specification in [ECMAScript](http://es5.github.com/) (i.e., implement the [WebIDL ECMAScript bindings](http://dev.w3.org/2006/webapi/WebIDL/#ecmascript-binding)). 

For the first version, webidl.js will take as input well-formed Web IDL and give the developer the ability to do the following: 

  1. implement the interface in the Browser
  2. generate source code that can be used indepedently of webidl.js. 

#Proposed Architecture (in WebIDL)

WebIDL.js would build on Robin Berjon's [WebIDL Parser](https://github.com/darobin/webidl2.js), 

```
interface WebIDL : WebIDL2{
      void implement(DOMString idlFragment);
      DOMString toJS(DOMString idlFragment);
}

interface WebIDL2{
  object parse(); 
}
```
Where ```WebIDL2``` is [https://github.com/darobin/webidl2.js](https://github.com/darobin/webidl2.js)

##Examples of what we want to do
(The following examples are hypothetical, as we don't actually have any running code yet! :) )

Given some WebIDL, like: 

```JavaScript
[Constructor, Constructor(DOMString make, optional DOMString model)]
interface Car : Vehicle{
     const octet maxspeed = 200;
     attribute DOMString make;
     attribute DOMString model;
     void drive([Clamp] octet speed);
};

interface Vehicle{}
```

webidl.js will implement the following in the browser: 

```JavaScript

var webIDL = new WebIDL();

//convert to javascript
var script = webIDL.toScript(carIDLString);
//these would be equivelent
webIDL.implement(carIDLString)
eval(script); // noop methods by default

//adds interfaces to the global scope
console.log(window.Car);
console.log(window.Vehicle);
console.log(window.Car.prototype.drive);
console.log(Car.maxspeed === 200); 

var car = new Car(); 
console.log(car instanceof window.Car === true); 
//Check inheritance
console.log(car instanceof window.Vehicle === true); 
console.log("make" in car === true); 

//The following are equivelent
car.drive();
window.Car.prototype.drive.call(car)

//type checking 
try{
    //throws type error
    car.drive({}); 
}catch(e){}

//type conversion

car.drive( " 100 "); 
```

# Contributing
We welcome code contributions in the form of [pull requests](https://help.github.com/articles/using-pull-requests). All pull requests are reviewed prior to being integrated. 
 
## Coding conventions
We attempt to adhere to the [Google JavaScript Style Guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml).

Before submitting code, please be sure to run closure-linter and beautify your code with something like [jsbeautifier.org](http://jsbeautifier.org). 

## License
Copyright (C) 2013 [Extensible Web Community Group](http://www.w3.org/community/nextweb/)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
