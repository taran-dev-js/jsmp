export abstract class Shape {
    protected constructor() {
        this.color = 'green';
        this.filled = true;
    }

    protected color: string;

    protected filled: boolean;

    toString(): string {
        return "A Shape with color of xxx and filled/Not filled";
    }

    abstract getPerimeter(): void;
}
