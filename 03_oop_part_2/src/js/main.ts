import {Page} from "./Page";
import {Pages} from "./Pages";
import {Book} from "./Book";

const book = new Book('TITLE', 'AUTHOR', new Pages([
    new Page(1, 'lorem', 'eww'),
    new Page(2, 'lorem adfsf' , 'eww sd fasdsd'),
    new Page(3, 'lorem adfsf' , 'eww sd fasdsd')
]));

for (let item of book) {
    // console.log(item);
    console.dir(item.toString());
}

// console.log(book.toString());

const route = new Pages([
    new Page(1, 'lorem', 'eww'),
    new Page(2, 'lorem adfsf' , 'eww sd fasdsd'),
    new Page(3, 'lorem adfsf' , 'eww sd fasdsd')
]);

// for (let item of route) {
//     console.log(item);
// }