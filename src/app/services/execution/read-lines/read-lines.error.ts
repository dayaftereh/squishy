import { ParseError } from 'papaparse';


export class ReadLinesError extends Error {

    file: string;

    errors: ParseError[];

    constructor(message?: string) {
        super(message);
    }

}