import {Pages} from "./Pages";

export class Comics {
    author: string;
    title: string;
    artist: string;
    pages: Pages;

    constructor(title: string, author: string, artist: string, pages: Pages) {
        this.title = title;
        this.author = author;
        this.artist = artist;
        this.pages = pages;
    }

    toString(): string {
        return `Comics: ${this.title} by ${this.artist}, the artist is ${this.artist}, number of pages: {number}`
    }

    set setAuthor(author: string) { this.author = author }

    set setTitle(title: string) { this.title = title }

    get getAuthor(): string { return this.author }

    get getTitle(): string { return this.title }
}