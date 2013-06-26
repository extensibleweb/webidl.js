"use strict";

var JSType = (function () {
    function JSType() {
    }
    JSType.fromIDL = function (input) {
        if (typeof (input) == "string") {
            return JSType.fromIDLName(input);
        } else if (input.union) {
            return "any";
        } else if (input.sequence) {
            return JSType.fromIDL(input.idlType) + "[]";
        } else if (input.array) {
            var output = JSType.fromIDL(input.idlType);
            for (var i = input.array; i; i--) {
                output += "[]";
            }
            return output;
        } else {
            return JSType.fromIDL(input.idlType);
        }
    };

    JSType.fromIDLName = function (input) {
        switch (input) {
            case "DOMString":
            case "ByteString":
                return "string";

            case "byte":
            case "octet":
            case "short":
            case "unsigned short":
            case "long":
            case "unsigned long":
            case "long long":
            case "unsigned long long":
            case "float":
            case "unrestricted float":
            case "double":
            case "unrestricted double":
                return "number";

            case "boolean":
            case "Boolean":
                return "bool";

            case "object":
            case "Object":
                return "any";

            case "any":
                return "any";

            default:
                return input;
        }
    };
    return JSType;
})();

var JSValue = (function () {
    function JSValue() {
    }
    JSValue.fromIDL = function (input) {
        switch (input.type) {
            case "undefined":
                return "undefined";
            case "null":
                return "null";
            case "Infinity":
                return input.negative ? "Number.NEGATIVE_INFINITY" : "Number.POSITIVE_INFINITY";
            case "NaN":
                return "Number.NaN";
            default:
                return JSON.stringify(input.value);
        }
    };
    return JSValue;
})();

var IndentedStringBuilder = (function () {
    function IndentedStringBuilder(code, header) {
        if (typeof code === "undefined") { code = ""; }
        if (typeof header === "undefined") { header = ""; }
        this.code = code;
        this.header = header;
        if (this.code) {
            this.code = (this.header + this.code).split("\n").join("\n" + this.header);
        }
    }
    IndentedStringBuilder.prototype.append = function (s) {
        this.code = (this.code ? this.code + "\n" : "") + (this.header + s).split("\n").join("\n" + this.header);
    };

    IndentedStringBuilder.prototype.prepend = function (s) {
        this.code = (this.header + s).split("\n").join("\n" + this.header) + (this.code ? "\n" + this.code : "");
    };

    IndentedStringBuilder.prototype.toString = function () {
        return this.code;
    };
    return IndentedStringBuilder;
})();

var TypeScriptHelper = (function () {
    function TypeScriptHelper(element) {
        this.out = element;
    }
    TypeScriptHelper.prototype.log = function (s) {
        this.out.appendChild(document.createTextNode(s + "\n"));
    };

    TypeScriptHelper.prototype.clear = function () {
        this.out.textContent = "";
    };

    TypeScriptHelper.prototype.emitParameters = function (args, opt) {
        var opCode = "";
        for (var k = 0; k < args.length; k++) {
            var arg = args[k];
            if (k)
                opCode += ", ";
            if (arg.optional) {
                if (opt && opt.interface) {
                    opCode += arg.name + "?:" + JSType.fromIDL(arg.idlType);
                } else {
                    if (typeof ((arg).default) != 'undefined') {
                        opCode += arg.name + ":" + JSType.fromIDL(arg.idlType);
                        opCode += " = " + JSValue.fromIDL((arg).default);
                    } else {
                        opCode += arg.name + "?:" + JSType.fromIDL(arg.idlType);
                    }
                }
            } else {
                opCode += arg.name + ":" + JSType.fromIDL(arg.idlType);
            }
        }

        return opCode;
    };

    TypeScriptHelper.prototype.emitOperation = function (op, opt) {
        var hasBody = (opt && !opt.interface);
        if (hasBody) {
            var body = "//\n// [...]\n//";
            if (opt.bodyDecorator)
                body = opt.bodyDecorator(body);
        }

        return ((opt && opt.noName ? "" : op.name) + "(" + this.emitParameters(op.arguments, opt) + ")" + (op.idlType.idlType == "new" ? "" : ": " + JSType.fromIDL(op.idlType)) + (hasBody ? "{\n" + (new IndentedStringBuilder(body, "    ")) + "\n}" : ";"));
    };

    TypeScriptHelper.prototype.emitAttribute = function (att, opt) {
        if (opt.interface) {
            return att.name + (att.idlType.nullable ? "?: " : ": ") + JSType.fromIDL(att.idlType) + ";";
        } else {
            var type = JSType.fromIDL(att.idlType);
            var code = "get " + att.name + "() : " + type + " {\n}";
            if (!att.readonly) {
                code += "\nset " + att.name + "(value : " + type + ") {\n}";
            }
            return code;
        }
    };

    TypeScriptHelper.prototype.emitInterface = function (type, opt) {
        var generateInterface = (!opt || !("interface" in opt) || (opt.interface));

        var esb = new IndentedStringBuilder("", "");
        var isb = new IndentedStringBuilder("", "    ");

        if (generateInterface) {
            esb.append("interface " + type.name + ((type.inheritance) ? (" extends " + type.inheritance) : "") + " {");
        } else {
            esb.append("class " + type.name + ((type.inheritance) ? (" extends " + type.inheritance) : "") + " {");

            if (type.extAttrs) {
                var ctors = type.extAttrs.filter(function (x) {
                    return x.name === "Constructor";
                });
                if (ctors.length > 0) {
                    isb.append("\n//\n// Implementation of the constructor\n//");
                    isb.append(this.emitOperation({
                        type: 'operation',
                        name: 'constructor',
                        extAttrs: [],
                        getter: false,
                        setter: false,
                        legacycaller: false,
                        creator: false,
                        deleter: false,
                        static: false,
                        stringifier: false,
                        arguments: ctors[0].arguments || [],
                        idlType: {
                            union: false,
                            array: 0,
                            sequence: false,
                            nullable: false,
                            idlType: 'new'
                        }
                    }, {
                        interface: false,
                        bodyDecorator: function (s) {
                            return "var self = this/*or reuse existing DOM objects by changing their prototype*/;\n" + s + "\nreturn self;";
                        }
                    }));
                }
            }
        }

        esb.append(isb.toString());
        isb.code = "";

        var ms = type.members;
        var n = ms.length;
        var legacyCallers = [];
        while (n) {
            var m = ms[--n];

            switch (m.type) {
                case 'attribute':
                    var att = m;

                    isb.prepend(this.emitAttribute(att, { interface: generateInterface }));
                    isb.prepend("\n//\n// Implementation of the " + att.name + " attribute\n//");
                    break;

                case 'operation':
                    var op = m;

                    if (op.legacycaller) {
                        legacyCallers.push(op);
                    }

                    isb.prepend(this.emitOperation(op, { interface: generateInterface }));
                    isb.prepend("\n//\n// Implementation of the " + op.name + " method\n//");
                    break;

                default:
                    isb.prepend("\n// TODO: " + m.name);
                    break;
            }
        }

        if (legacyCallers.length > 0) {
            if (legacyCallers.length !== 1) {
                legacyCallers[0] = this.mergeCallingConventions(legacyCallers);
            }
            isb.prepend(this.emitOperation(legacyCallers[0], { noName: true, interface: generateInterface }));
        }

        esb.append(isb);
        if (isb.code)
            esb.append("");
        esb.append("}");

        return esb.toString();
    };

    TypeScriptHelper.prototype.mergeCallingConventions = function (operations) {
        if (!operations && operations.length < 1)
            throw new Error("Unable to merge calling conventions when the number of conventions is smaller than 1");

        var minArgCount = operations[0].arguments.reduce(function (c, a) {
            return c + (a.optional ? 0 : 1);
        }, 0);
        var maxArgCount = operations[0].arguments.length;

        var args = operations[0].arguments.map(function (a) {
            return ({ optional: a.optional, variadic: a.variadic, extAttrs: a.extAttrs, idlType: a.idlType, name: a.name });
        });
        var retType = JSType.fromIDL(operations[0].idlType);

        for (var x = 1; x < operations.length; x++) {
            minArgCount = Math.min(minArgCount, operations[x].arguments.reduce(function (c, a) {
                return c + (a.optional ? 0 : 1);
            }, 0));
            maxArgCount = Math.max(maxArgCount, operations[x].arguments.length);

            for (var y = 0; y < operations[x].arguments.length; y++) {
                if (args.length <= y) {
                    var newArg = operations[x].arguments[y];
                    args[y] = {
                        optional: true,
                        variadic: newArg.variadic,
                        extAttrs: newArg.extAttrs,
                        idlType: newArg.idlType,
                        name: newArg.name
                    };
                } else if (JSType.fromIDL(args[y].idlType) != JSType.fromIDL(operations[x].arguments[y].idlType)) {
                    args[y] = {
                        optional: args[y].optional || operations[x].arguments[y].optional,
                        variadic: false,
                        extAttrs: [],
                        idlType: {
                            union: false,
                            array: 0,
                            sequence: false,
                            nullable: false,
                            idlType: 'any'
                        },
                        name: (args[y].name == operations[x].arguments[y].name) ? args[y].name : 'arg' + y
                    };
                } else if (args[y].name != operations[x].arguments[y].name) {
                    args[y].name = 'arg' + y;
                }
            }

            for (var i = minArgCount; i < maxArgCount; i++) {
                args[i].optional = true;
            }

            if (retType != JSType.fromIDL(operations[x].idlType)) {
                retType = 'any';
            }
        }

        return {
            type: 'operation',
            name: operations[0].name,
            extAttrs: [],
            getter: false,
            setter: false,
            legacycaller: operations[0].legacycaller,
            creator: operations[0].creator,
            deleter: operations[0].deleter,
            static: operations[0].static,
            stringifier: operations[0].stringifier,
            arguments: args,
            idlType: {
                union: false,
                array: 0,
                sequence: false,
                nullable: false,
                idlType: retType
            },
            originalConventions: operations
        };
    };

    TypeScriptHelper.prototype.parseIDLString = function (input, generateInterface) {
        if (typeof generateInterface === "undefined") { generateInterface = true; }
        var _this = this;
        var t = WebIDL2.parse(input);
        t.forEach(function (e) {
            _this.log("// " + e.type + " " + (e.name || (e).target || 'anonymous'));
            switch (e.type) {
                case "interface":
                case "callback interface":
                case "dictionnary":
                    _this.log(_this.emitInterface(e, { interface: generateInterface || (e.type != "interface") }));
                    break;

                case "implements":
                    var implement = e;
                    _this.log("interface " + implement.target + " extends " + implement.implements + "{}");
                    break;

                default:
                    _this.log("// TODO: " + e.type + " " + e.name);
            }

            _this.log("");
        });
    };
    return TypeScriptHelper;
})();

window.onload = function () {
    var input = document.getElementById('input');
    var output = document.getElementById('output');
    var tests = new TypeScriptHelper(output);
    tests.parseIDLString(input.value, false);
};
//@ sourceMappingURL=app.js.map
