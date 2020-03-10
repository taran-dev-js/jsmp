import {Page} from './Page';
import {Iterator} from "./Iterator";

interface Interface {
    pageNumber: number;
    pageType: string;
    pageMaterial: string;
}

export class Pages {
    pages: Array<Page>;

    constructor(pages: Page[]) {
        this.pages = pages;
    }

    get() {
        return this.pages;
    }

    [Symbol.iterator]() {
        return new Iterator(this);
    }
}

const route = new Pages([
    new Page(1, 'lorem', 'eww'),
    new Page(2, 'lorem adfsf' , 'eww sd fasdsd'),
    new Page(3, 'lorem adfsf' , 'eww sd fasdsd')
]);

for (let item of route) {
    console.log(item);
}