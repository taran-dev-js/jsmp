import {Sword} from "./Sword";
import {Bow} from './Bow';
import {Inventory} from './Inventory';
import {ItemWeightComparator} from './ItemWeightComparator';


const inventory = new Inventory();

const a = new Bow(20.49, 0.7893, 250, 2);
const b = new Bow(32, 0.7893, 200, 2.5);
const c = new Sword(30, 0.7893, 230, 1);

inventory.addItem(a);
inventory.addItem(b);
inventory.addItem(c);

inventory.sort();
console.log(inventory.toString());
inventory.sort(new ItemWeightComparator());
console.log(inventory.toString());
