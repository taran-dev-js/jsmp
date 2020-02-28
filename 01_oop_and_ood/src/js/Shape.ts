export abstract class Shape {
    protected constructor() {
        this.color = 'green';
        this.filled = true;
    }

    protected color: string;

    protected filled: boolean;

    abstract toString(): string;

    abstract getPerimeter(): void;
}
