export class Point {
    x: number;
    y: number;

    constructor(pointX: number = 0, pointY: number = 0) {

        this.x = pointX;
        this.y = pointY
    }

    get pointX(): number {
        return this.x
    }

    get pointY(): number {
        return this.y
    }

    set pointX(x: number) {
        this.x = x;
    }

    set pointY(y: number) {
        this.y = y;
    }

    private toString(): string {
        return `(${this.x}, ${this.y})`;
    }

    public distance(): string;
    public distance(other: Point): number;
    public distance(x: number, y: number): number;

    public distance(a?: Point | number, b?: number): number | string {

        if (typeof a === "object") {
            return new Point(this.x, this.y).distance(a.x, a.y)
        } else if (typeof a === "number" && b) {
            return Math.sqrt(((a - this.x) ** 2) + ((b - this.y) ** 2));
        }
        return 0;

    }
}

