declare module WebIDL {
    export interface WebIDL2 {
        parse(idl: string): IDLEntry[];
    }

    export interface IDLEntry {

        type: string; //"export interface"  or "callback export interface" or "callback" or "dictionnary" or "exceptions" or "enum" or "typeDef" or "implement"...
        name: string;
        extAttrs: IDLAttribute[];

    }

    export interface IDLInterfaceEntry extends IDLEntry {

        partial: bool;
        inheritance: string; // null or type name
        members: IDLMember[];

    }

    export interface IDLCallbackEntry {

        idlType: IDLType;
        arguments: IDLArgument[];

    }

    export interface IDLDictionnaryEntry extends IDLInterfaceEntry {}

    export interface IDLExceptionEntry extends IDLInterfaceEntry {}

    export interface IDLEnumEntry extends IDLEntry {

        values: string[];

    }

    export interface IDLTypeDefEntry extends IDLEntry {

        idlType: IDLType;
        typeExtAttrs: IDLAttribute[];

    }

    export interface IDLImplementEntry extends IDLEntry {

        target: string;
        implements: string;

    }

    export interface IDLMember {

        type: string;
        name: string;
        extAttrs: IDLAttribute[];

    }

    export interface IDLFieldMember extends IDLMember {

        default: IDLValue;

    }

    export interface IDLOperationMember extends IDLMember {

        getter: bool;
        setter: bool;
        creator: bool;
        deleter: bool;
        legacycaller: bool;
        static: bool;
        stringifier: bool;
        arguments: IDLArgument[];
        idlType: IDLType;

    }

    export interface IDLAttributeMember extends IDLMember {

        static: bool;
        stringifier: bool;
        inherit: bool;
        readonly: bool;
        idlType: IDLType;

    }

    export interface IDLConstMember extends IDLMember {

        idlType: IDLType;
        nullabe: bool;
        value: any;

    }

    export interface IDLSerializerMember extends IDLMember {
        __INTELLISENSE_NOT_IMPLEMENTEND__: any;
    }

    export interface IDLIteratorMember extends IDLOperationMember {
        iteratorObject: string;
    }

    export interface IDLAttribute {

        name: string;
        arguments: IDLArgument[];
        rhs: IDLAttributeAssignement;

    }

    export interface IDLAttributeAssignement {

        value: string;
        type: string; // "identifier"

    }

    export interface IDLArgument {

        optional: bool;
        variadic: bool;
        extAttrs: IDLAttribute[];
        idlType: IDLType;
        name: string;

    }

    export interface IDLType {

        sequence: bool;
        nullable: bool;
        array: number; //sometimes false (it means 0)
        union: bool;
        idlType: any;

    }

    export interface IDLUnionType extends IDLType {
        idlType: IDLType[];
    }

    export interface IDLSequenceType extends IDLType {
        idlType: IDLType;
    }

    export interface IDLArrayType extends IDLType {
        idlType: IDLType;
    }

    export interface IDLSimpleType extends IDLType {
        idlType: string;
    }

    export interface IDLValue {
        type: string;
        value: any;
    }
}