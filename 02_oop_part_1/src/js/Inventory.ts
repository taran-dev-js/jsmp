import {ItemComparator} from './interface/ItemComparator';
import {Item} from './abstractClass/Item';

export class Inventory implements ItemComparator {
    items: Array<Item>;

    sort(comparator?: ItemComparator): void {

    }

    toString(): string {
        return '';
    }
}
