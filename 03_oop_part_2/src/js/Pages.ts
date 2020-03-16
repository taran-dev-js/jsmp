import {Page} from './Page';
import {PagesIterable} from "./PagesIterable";

export class Pages {
    pages: Array<Page>;

    constructor(pages: Array<Page>) {
        this.pages = pages;
    }

    // [Symbol.iterator]() {
    //     return new PagesIterable(this);
    // }
}
