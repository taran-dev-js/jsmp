import {Pages} from "./Pages";
import {Item} from './Item'

export class Magazine extends Item {
    title: string;
    pages: Pages;

    constructor(title: string, pages: Pages) {
        super(pages);
        this.title = title;
        this.pages = pages;
    }

    toString(): string {
        return `Magazine: ${this.title} with number of pages: ${this.pages.pages.length}`
    }

    set setTitle(title: string) { this.title = title }

    get getTitle(): string { return this.title }
}