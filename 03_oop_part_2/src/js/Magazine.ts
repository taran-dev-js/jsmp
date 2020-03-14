import {Pages} from "./Pages";

export class Magazine {
    title: string;
    pages: Pages;

    constructor(title: string, pages: Pages) {
        this.title = title;
        this.pages = pages;
    }

    toString(): string {
        return `Magazine: ${this.title} with number of pages: {number}`
    }

    set setTitle(title: string) { this.title = title }

    get getTitle(): string { return this.title }
}