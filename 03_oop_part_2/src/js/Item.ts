import {PagesIterable} from "./PagesIterable";
import {Pages} from "./Pages";

export abstract class Item {
    args: any;

    constructor(args: any) {
        this.args = args;
    }
    abstract toString(): string;

    [Symbol.iterator]() {
        return new PagesIterable(this);
    }
}