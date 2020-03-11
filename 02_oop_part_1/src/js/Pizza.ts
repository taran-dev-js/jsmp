import {Consumable} from './abstractClass/Consumable';

export class Pizza extends Consumable {
    private numberOfSlices: number;
    private slicesEaten: number;

    constructor(numberOfSlices: number, spoiled: boolean) {
        const defaultName = 'pizza';
        super(defaultName, 20, 30, spoiled)
    }

    eat(): string {
        if (this.slicesEaten < this.numberOfSlices) {
            this.slicesEaten++;
            if (this.slicesEaten >= this.numberOfSlices) {
                this.setConsumed = true;
            }
            return 'You eat a slice of pizza.';
        } else {

            return '';
        }
    }
}