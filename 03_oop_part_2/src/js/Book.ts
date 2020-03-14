import {Pages} from "./Pages";
import {Item} from "./Item";

export class Book extends Item {
    title: string;
    author: string;
    pages: Pages;
    pagesLength: number = 0;

    constructor(title: string, author: string, pages: Pages) {
        super([title, author, pages]);
        this.title = title;
        this.author = author;
        this.pages = pages;

        for (let item of this.pages) {
            console.log(item);
            this.pagesLength++;
        }
    }

    toString(): string {
        return `Book: ${this.title} by ${this.author} with number of pages: ${this.pagesLength}`
    }

    set setAuthor(author: string) { this.author = author }

    set setTitle(title: string) { this.title = title }

    get getAuthor(): string { return this.author }

    get getTitle(): string { return this.title }
}