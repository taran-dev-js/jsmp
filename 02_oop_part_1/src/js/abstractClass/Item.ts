import {Consumable} from './Consumable';
import {Comparable} from '../interface/Comparable';

const counter = 0;

export class Item implements Comparable {
    private id = 0;
    private readonly counter = counter;
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

    reset(): void { this.id = 0 }

    toString(): string {
        return `${this.name} = Value: ${this.value}, weight: ${this.weight}`;
    }

}

