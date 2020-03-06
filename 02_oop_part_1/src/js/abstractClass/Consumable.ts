import {Item} from './Item';

export abstract class Consumable extends Item {
    private consumed: boolean = false;
    private spoiled: boolean;
    private defaultMessage: string = `You eat the ${this.name}.`;
    private sickMessage: string = 'You fell sick.';

    protected constructor(name: string, value: number, weight: number, spoiled: boolean) {
        super(name, value, weight);
    }

    use(): string {
        if (this.consumed && this.spoiled) {
            return this.eat();
        } else if (!this.spoiled) {
            return  this.defaultMessage + this.sickMessage;
        }
    }

    abstract eat(): string;

    get isConsumed(): boolean { return false }

    set setConsumed(consumed: boolean) { this.consumed = consumed }

    get isSpoiled(): boolean { return false }

    toString(): string {
        return '';
    }
}