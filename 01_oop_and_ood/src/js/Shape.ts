export abstract class Shape {
    protected constructor();
    protected constructor(color: string, filled: boolean);

    protected constructor(color?: string, filled?: boolean) {
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
