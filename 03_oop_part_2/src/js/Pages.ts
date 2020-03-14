import {Page} from './Page';
import {PagesIterable} from "./PagesIterable";

interface Interface {
    pageNumber: number;
    pageType: string;
    pageMaterial: string;
}

export class Pages {
    pages: Array<Page>;

    constructor(pages: Array<Page>) {
        this.pages = pages;
    }

    [Symbol.iterator]() {
        return new PagesIterable(this);
    }
}
