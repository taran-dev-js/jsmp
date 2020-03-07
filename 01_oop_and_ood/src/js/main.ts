import {Point} from './Point';
import {Triangle} from './Triangle';

// const p: Point = new Point(3, 4);
// console.log(p);
// console.log(p.distance()) ;
// console.log(p.distance(1, 2));
// console.log(p.distance(new Point(4, 8)));
const triangle = new Triangle(new Point(1, 2), new Point(2, 7), new Point(5, 2));
const triangle2 = new Triangle(new Point(5, 5), new Point(5, 5), new Point(5, 2));
const triangle3 = new Triangle(new Point(5, 5), new Point(5, 5), new Point(5, 5));

triangle.getPerimeter();
triangle2.getPerimeter();
triangle3.getPerimeter();

console.log(triangle.toString());
console.log(triangle2.toString());
console.log(triangle3.toString());

triangle.printType();
triangle2.printType();
triangle3.printType();