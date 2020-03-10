import {Pages} from "./Pages";

export class Book {
    title: string;
    author: string;
    pages: Array<Pages>;

    constructor(title: string, author: string, pages: Array<Pages>) {
        this.title = title;
        this.author = author;
        this.pages = pages;
    }

    toString(): string {
        return `Book: ${this.title} by ${this.author} with number of pages: ${this.pages.length}`
    }

    set setAuthor(author: string) { this.author = author }

    set setTitle(title: string) { this.title = title }

    get getAuthor(): string { return this.author }

    get getTitle(): string { return this.title }
}