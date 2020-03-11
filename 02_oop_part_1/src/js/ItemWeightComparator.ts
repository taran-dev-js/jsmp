import {ItemComparator} from './interface/ItemComparator';
import {Item} from './abstractClass/Item'

export class ItemWeightComparator implements ItemComparator {

    compare(first: Item, second: Item): number {
        if (first.value < second.value) {
            return 1;
        } else if (first.value > second.value) {
            return -1;
        } else {
            return first.compareTo(first)
        }
    }
}
