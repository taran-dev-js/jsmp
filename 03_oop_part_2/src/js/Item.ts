import {PagesIterable} from "./PagesIterable";
import {Pages} from "./Pages";

export abstract class Item {
    protected pages: Pages;

    abstract toString(): string;

    [Symbol.iterator]() {
        return new PagesIterable(this);
    }
}