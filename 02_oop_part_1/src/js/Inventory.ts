import {ItemComparator} from './interface/ItemComparator';
import {Item} from './abstractClass/Item';

export class Inventory implements ItemComparator {
    private items: Array<Item> = [];

    addItem(item: Item): void {
        this.items.push(item);
    }

    sort(comparator?: ItemComparator): void {

        this.items.sort(((a, b) => {
            if (comparator) {
                return a.weight - b.weight;
            } else {
                return a.value - b.value;
            }

        }));

    }

    toString(): string {
        return this.items.join(', ');
    }
}
