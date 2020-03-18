import {Pages} from "./Pages";
import {Item} from "./Item";

export class Book extends Item {
    title: string;
    author: string;

    constructor(title: string, author: string, pages: Pages) {
        super();
        this.title = title;
        this.author = author;
        this.pages = pages;
    }

    toString(): string {
        return `Book: ${this.title} by ${this.author} with number of pages: ${this.pages.pages.length}`
    }

    set setAuthor(author: string) { this.author = author }

    set setTitle(title: string) { this.title = title }

    get getAuthor(): string { return this.author }

    get getTitle(): string { return this.title }
}