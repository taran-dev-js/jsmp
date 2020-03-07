import {Comparable} from '../interface/Comparable';

const counter = 0;
const id = 0;

export abstract class Item implements Comparable {
    private readonly counter: number = counter;
    private id: number = id;
    name: string;
    weight: number;
    value: number;

    protected constructor(name: string, value: number, weight: number) {
        this.name = name;
        this.weight = weight;
        this.value = value;

        this.id ++;
        this.counter ++;
    }

    compareTo(other: Item): number {
        if (other.value < this.value) {
            return 1;
        } else if (other.value > this.value) {
            return -1;
        } else {
            return other.name.toUpperCase() > this.name.toUpperCase() ? 1 : -1;
        }
    }

    get numberOfItems(): number { return this.counter }

    get getID(): number { return this.id }

    reset(): void { this.id = 0 }

    abstract use(): string;

    toString(): string {
        return `${this.name} = Value: ${this.value}, weight: ${this.weight}`;
    }

}

