import {Page} from "./Page";
import {Pages} from "./Pages";
import {Book} from "./Book";
import {Magazine} from "./Magazine";
import {Comics} from "./Comics";

const book = new Book('TITLE', 'AUTHOR', new Pages([
    new Page(1, 'lorem', 'eww'),
    new Page(2, 'lorem adfsf' , 'eww sd fasdsd'),
    new Page(3, 'lorem adfsf' , 'eww sd fasdsd')
]));

for (let item of book) {
    console.dir(item.toString());
}

const mag = new Magazine('TITLE', new Pages([
    new Page(1, 'lorem', 'eww'),
    new Page(2, 'lorem adfsf' , 'eww sd fasdsd'),
    new Page(3, 'lorem adfsf' , 'eww sd fasdsd')
]));

for (let item of mag) {
    console.dir(item.toString());
}

const comics = new Comics('TITLE', 'AUTHOR', 'ARTIST', new Pages([
    new Page(1, 'lorem', 'eww'),
    new Page(2, 'lorem adfsf' , 'eww sd fasdsd'),
    new Page(3, 'lorem adfsf' , 'eww sd fasdsd'),
    new Page(4, 'lorem adfsf' , 'eww sd fasdsd')
]));

for (let item of comics) {
    console.dir(item.toString());
}
