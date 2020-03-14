import {PagesIterable} from "./PagesIterable";
import {Pages} from "./Pages";

export abstract class Item {
    args: any;

    constructor(...args: any[]) {
        this.args = args;
    }
    abstract toString(): string;

    [Symbol.iterator]() {
        let i = 0;
        return {
            next: () => ({
                value: this.args[ i++ ],
                done: i > this.args.length
            })
        };

    }
}