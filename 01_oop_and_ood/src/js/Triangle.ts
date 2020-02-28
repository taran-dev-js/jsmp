import { Shape } from './Shape'
import {Point} from './Point';

export class Triangle extends Shape {
    v1: Point;
    v2: Point;
    v3: Point;

    constructor(x1: Point, x2: Point, x3: Point) {
        super();

        this.v1 = x1;
        this.v2 = x2;
        this.v3 = x3;
        // return `Triancle[v1=(${x1.x},${x1.y})]`;
    }

    getPerimeter(): void {

    }

    toString(): any {
        let {v1, v2, v3} = this;

        return "Triangle[v1=(x1,y1),v2=(x2,y2),v3=(x3,y3)]"
        // const t = this;
        // return '' + t;
    }

    printType() {

    }
}