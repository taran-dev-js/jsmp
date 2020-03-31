import {Pages} from "./Pages";
import {Item} from "./Item";

export class Comics extends Item {
    author: string;
    title: string;
    artist: string;

    constructor(title: string, author: string, artist: string, pages: Pages) {
        super();
        this.title = title;
        this.author = author;
        this.artist = artist;
        this.pages = pages;
    }

    toString(): string {
        return `Comics: ${this.title} by ${this.artist}, the artist is ${this.artist}, number of pages: ${this.pages.pages.length}`
    }

    set setAuthor(author: string) { this.author = author }

    set setTitle(title: string) { this.title = title }

    get getAuthor(): string { return this.author }

    get getTitle(): string { return this.title }
}