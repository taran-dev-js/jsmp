import {ItemComparator} from './interface/ItemComparator';
import {Item} from './abstractClass/Item'

export class ItemWeightComparator implements ItemComparator {
    compare(first: Item, second: Item): number {

        return 1;
    }
}
