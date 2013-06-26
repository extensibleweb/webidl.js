/// <reference path="WebIDL.ts" />
declare var WebIDL2: WebIDL.WebIDL2;
"use strict";




///
/// This module converts a WebIDL type of a JS type
///
class JSType {

    /// 
    /// Converts a WebIDL type to a JS type
    /// 
    static fromIDL(input: WebIDL.IDLType): string {
        if (typeof (input) == "string") {

            // most types can be converted from their name
            return JSType.fromIDLName(<any>input);

        } else if (input.union) {

            // union types are not supported
            return "any";

        } else if (input.sequence) {

            // unwrap the array
            return JSType.fromIDL(input.idlType) + "[]";

        } else if (input.array) {

            // unwrap the array (multiple levels)
            var output = JSType.fromIDL(input.idlType);
            for (var i = input.array; i; i--) {
                output += "[]";
            }
            return output;

        } else {

            // in all other cases, just use the name
            return JSType.fromIDL(input.idlType);

        }
    }

    /// 
    /// Converts a WebIDL type name to a JS type
    /// 
    static fromIDLName(input: string) {
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
    }
}




///
/// This module converts a WebIDL value of a JS value
///
class JSValue {
    static fromIDL(input) {
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
    }
}





///
/// Source file generator (string builder)
///
class IndentedStringBuilder {

    /// 
    /// Construct a new code block
    /// 
    constructor(public code: string = "", public header: string = "") {
        if (this.code) {
            this.code = (this.header + this.code).split("\n").join("\n" + this.header);
        }
    }

    /// 
    /// Add a new line at the end of the code block
    /// 
    append(s) {
        this.code = (this.code? this.code+"\n": "") + (this.header + s).split("\n").join("\n" + this.header);
    }

    /// 
    /// Add a new line at the beginning of the code block
    /// 
    prepend(s) {
        this.code = (this.header + s).split("\n").join("\n" + this.header) + (this.code? "\n"+this.code: "");
    }

    /// 
    /// Converts back to a string the code block
    /// 
    toString() {
        return this.code;
    }

}






class TypeScriptHelper {
    out: HTMLElement;
    
    ///
    ///
    ///
    constructor (element?: HTMLElement) { 
        this.out = element;
    }

    ///
    ///
    ///
    private log(s) {
        this.out.appendChild(document.createTextNode(s+"\n"));
    }

    ///
    ///
    ///
    private clear() {
        this.out.textContent = "";
    }

    ///
    ///
    ///
    private emitParameters(args: WebIDL.IDLArgument[], opt?: any): string {

        var opCode = "";
        for (var k = 0; k < args.length; k++) {

            var arg = args[k]; if (k) opCode += ", ";
            if (arg.optional) {
                if (opt && opt.interface) {

                    opCode += arg.name + "?:" + JSType.fromIDL(arg.idlType);

                } else {

                    if (typeof ((<any>arg).default) != 'undefined') {
                        opCode += arg.name + ":" + JSType.fromIDL(arg.idlType);
                        opCode += " = " + JSValue.fromIDL((<any>arg).default);
                    } else {
                        opCode += arg.name + "?:" + JSType.fromIDL(arg.idlType);
                    }

                }
            } else {

                opCode += arg.name + ":" + JSType.fromIDL(arg.idlType);

            }

        }

        return opCode;

    }

    ///
    ///
    ///
    private emitOperation(op: WebIDL.IDLOperationMember, opt?: any): string {

        // compute the method body, if needed
        var hasBody = (opt && !opt.interface);
        if (hasBody) {
            var body = "//\n// [...]\n//"; // TODO: generate converters
            if (opt.bodyDecorator) body = opt.bodyDecorator(body);
        }

        // return the whole declaration
        return (
            (opt && opt.noName ? "" : op.name)
            + "(" + this.emitParameters(op.arguments, opt) + ")"
            + (op.idlType.idlType == "new" ? "" : ": " + JSType.fromIDL(op.idlType))
            + (hasBody ? "{\n"+(new IndentedStringBuilder(body,"    "))+"\n}" : ";")
        );
    }

    ///
    ///
    ///
    private emitAttribute(att: WebIDL.IDLAttributeMember, opt?: any): string {

        if (opt.interface) {

            // code for interfaces
            return att.name + (att.idlType.nullable ? "?: " : ": ") + JSType.fromIDL(att.idlType) + ";";

        } else {

            // code for classes
            var type = JSType.fromIDL(att.idlType);
            var code = "get " + att.name + "() : " + type + " {\n}";
            if (!att.readonly) {
                code += "\nset " + att.name + "(value : " + type + ") {\n}";
            }
            return code;

        }
    }

    ///
    ///
    ///
    private emitInterface(type: WebIDL.IDLInterfaceEntry, opt?: any) {
        var generateInterface = (!opt || !("interface" in opt) || (opt.interface));

        var esb = new IndentedStringBuilder("","");
        var isb = new IndentedStringBuilder("", "    ");

        if (generateInterface) {

            // initiate interface creation (compile-time construct)
            esb.append(
                "interface " + type.name
                + ((type.inheritance) ? (" extends " + type.inheritance) : "")
                + " {"
            );

        } else {

            // initiate class creation (run-time construct)
            esb.append(
                "class " + type.name
                + ((type.inheritance) ? (" extends " + type.inheritance) : "")
                + " {"
            );

            // TODO: constructor?
            if (type.extAttrs) {
                var ctors = type.extAttrs.filter((x) => x.name === "Constructor");
                if (ctors.length > 0) {
                    isb.append("\n//\n// Implementation of the constructor\n//");
                    isb.append(this.emitOperation(
                        {
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
                        },
                        {
                            interface: false,
                            bodyDecorator: function (s) { 
                                return "var self = this/*or reuse existing DOM objects by changing their prototype*/;\n" + s + "\nreturn self;"
                            }
                        }
                    ));
                }
            }

        }

        // flush isb content
        esb.append(isb.toString()); isb.code = "";

        // now let's generate the members
        var ms = type.members;
        var n = ms.length;
        var legacyCallers: WebIDL.IDLOperationMember[] = [];
        while (n) {
            var m = ms[--n];

            switch (m.type) {
                case 'attribute':
                    var att = <WebIDL.IDLAttributeMember>m;

                    isb.prepend(this.emitAttribute(att, { interface: generateInterface }));
                    isb.prepend("\n//\n// Implementation of the " + att.name + " attribute\n//");
                    break;

                case 'operation':
                    var op = <WebIDL.IDLOperationMember>m;

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

        // for callable objects, calling conventions go before everything else
        if (legacyCallers.length > 0) {

            if (legacyCallers.length !== 1) { legacyCallers[0] = this.mergeCallingConventions(legacyCallers); }
            isb.prepend(this.emitOperation(legacyCallers[0], { noName: true, interface: generateInterface }));

        }

        // flush
        esb.append(isb); if (isb.code) esb.append("");
        esb.append("}");

        return esb.toString();
    }

    ///
    /// merge multiple calling conventions into one
    ///
    private mergeCallingConventions(operations: WebIDL.IDLOperationMember[]) {

        // operations should not be empty
        if (!operations && operations.length < 1) throw new Error("Unable to merge calling conventions when the number of conventions is smaller than 1");

        // we are going to compute the minimum & maximum number of arguments for the call
        var minArgCount: number = operations[0].arguments.reduce((c, a) => c + (a.optional ? 0 : 1), 0);
        var maxArgCount: number = operations[0].arguments.length;

        // we're also going to determine the type & names of the arguments
        var args = operations[0].arguments.map((a) => ({ optional: a.optional, variadic: a.variadic, extAttrs: a.extAttrs, idlType: a.idlType, name: a.name }));
        var retType = JSType.fromIDL(operations[0].idlType);

        // let's merge the other calling conventions with the first one
        for (var x = 1; x < operations.length; x++) {

            // if the number of min/max arguments has changed, take that in consideration
            minArgCount = Math.min(minArgCount, operations[x].arguments.reduce((c, a) => c + (a.optional ? 0 : 1), 0));
            maxArgCount = Math.max(maxArgCount, operations[x].arguments.length);

            // check if the types of the arguments are consistent
            for (var y = 0; y < operations[x].arguments.length; y++) {
                if (args.length <= y) {

                    // push the new arguments to the array
                    var newArg = operations[x].arguments[y];
                    args[y] = {
                        optional: true,
                        variadic: newArg.variadic,
                        extAttrs: newArg.extAttrs,
                        idlType: newArg.idlType,
                        name: newArg.name
                    };

                } else if (JSType.fromIDL(args[y].idlType) != JSType.fromIDL(operations[x].arguments[y].idlType)) {

                    // if there's a conflict, create a special argument
                    args[y] = <WebIDL.IDLArgument>{
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

                    // if there's only a name mismatch, let's just change the name
                    args[y].name = 'arg' + y;

                }
            }

            // mark arguments after minArgCount optional
            for (var i = minArgCount; i < maxArgCount; i++) {
                args[i].optional = true;
            }

            // check if the type of the return value is consistent
            if (retType != JSType.fromIDL(operations[x].idlType)) {
                retType = 'any';
            }

        }

        // return the data
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
            arguments: <WebIDL.IDLArgument[]>args,
            idlType: {
                union: false,
                array: 0,
                sequence: false,
                nullable: false,
                idlType: retType
            },
            originalConventions: operations
        };

    }

    ///
    ///
    ///
    parseIDLString(input:string, generateInterface: boolean = true) {

        // now, let's take an input an analyze it
        var t = WebIDL2.parse(input)
        t.forEach((e) => {

            this.log("// " + e.type + " " + (e.name||(<any>e).target||'anonymous'));
            switch(e.type) {
                case "interface":
                case "callback interface":
                case "dictionnary":
                    this.log(this.emitInterface(<WebIDL.IDLInterfaceEntry>e, { interface: generateInterface||(e.type!="interface") }));
                    break;

                case "implements":
                    var implement = <WebIDL.IDLImplementEntry>e;
                    this.log("interface " + implement.target + " extends " + implement.implements + "{}");
                    break;

                default:
                    this.log("// TODO: " + e.type + " " + e.name);
            }

            this.log("");
        });

    }

}

window.onload = () => {
    var input = <HTMLTextAreaElement> document.getElementById('input');
    var output = document.getElementById('output');
    var tests = new TypeScriptHelper(output);
    tests.parseIDLString(input.value,false);
};