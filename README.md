# webidl.js

An implementation of [WebIDL](http://dev.w3.org/2006/webapi/WebIDL/) in [ECMAScript](http://es5.github.com/).

## Goals and Scope

The initial goal of this project is to implement a polyfill code generator based on the [WebIDL](http://dev.w3.org/2006/webapi/WebIDL/) specification in [ECMAScript](http://es5.github.com/) (i.e., implement the [WebIDL ECMAScript bindings](http://dev.w3.org/2006/webapi/WebIDL/#ecmascript-binding)). 

For the first version, webidl.js will take as input well-formed Web IDL and give the developer the ability to generate some JavaScript source code that: 

  1.  implement properly the given WebIDL interfaces following the ECMAScript binding rules
  2.  can be eval'ed immediately to implement a noop object based on the interface
  3.  can be used indepedently of webidl.js (and any library)

#Proposed Architecture (in WebIDL)

WebIDLCompiler will be based on Robin Berjon's [WebIDL Parser](https://github.com/darobin/webidl2.js), 

```
interface WebIDLCompiler : WebIDL2{
      DOMString compile(DOMString dataFragment);
	  DOMString compile(object dataTree);
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
interface Vehicle {
	void move();
}

[Constructor, Constructor(DOMString make, optional DOMString model)]
interface Car : Vehicle {
     const octet maxspeed = 200;
     attribute DOMString make;
     attribute DOMString model;
     void drive([Clamp] octet speed);
};
```

webidl.js will implement the following in the browser: 

```JavaScript

var webIDL = new WebIDLCompiler();

//convert to javascript
var script = webIDL.compile(carIDLString);
eval(script); // noop methods by default

// interfaces are added to the global scope
console.log(window.Car);
console.log(window.Vehicle);
console.log(window.Car.prototype.drive);
console.log(Car.maxspeed === 200); 

// instances are valid and inheritance works properly
var car = new Car(); 
console.log(car instanceof window.Car === true); 
console.log(car instanceof window.Vehicle === true); 
console.log("make" in car === true); 
console.log("move" in car === true); 

// methods can be called on instances
car.drive();
window.Car.prototype.drive.call(car)

// methods can't be called on other objects (throws a type error)
try{ window.Car.prototype.drive.call({}); }
catch(e){} 

// type checking is built-in (throws a type error)
try{ car.drive({}); }
catch(e){}

// type conversion is also buit-in
car.drive("100"); 
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
