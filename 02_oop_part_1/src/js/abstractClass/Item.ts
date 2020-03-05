import {Consumable} from './Consumable';
import {Comparable} from '../interface/Comparable';

export abstract class Item implements Comparable {
    private id = 0;

    protected constructor(name: string, value: number, weight: number) {
        this.id ++;
    }

    compareTo(other: Item) {
        return 1;
    }

    get numberOfItems(): number { return this.id }

    reset(): void { this.id = 0 }

}

