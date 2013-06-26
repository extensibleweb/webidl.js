// callback interface MyFunc
interface MyFunc {
    (arg0: any, arg1: number = undefined): string;
    convert(input: string): string;
    convert(input: number, input2: number): string;
}

