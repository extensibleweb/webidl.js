// interface BlurpEvent
class BlurpEvent extends CustomEvent {

    //
    // Implementation of the constructor
    //
    constructor() {
        var self = this/*or reuse existing DOM objects by changing their prototype*/;
        //
        // [...]
        //
        return self;
    }

    //
    // Implementation of the blurp attribute
    //
    get blurp(): string {
    }

    //
    // Implementation of the maybe attribute
    //
    get maybe(): string {
    }
    set maybe(value: string) {
    }

    //
    // Implementation of the checkIfOkay method
    //
    checkIfOkay(potentialIssues: string[]= null): bool {
        //
        // [...]
        //
    }

}

// implements BlurpEvent
interface BlurpEvent extends EventTarget { }

// callback interface MyFunc
interface MyFunc {

    (input: any, input2?: number): string;

    //
    // Implementation of the convert method
    //
    convert(input: string): string;

    //
    // Implementation of the convert method
    //
    convert(input: number, input2: number): string;

}


