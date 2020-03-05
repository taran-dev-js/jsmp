import {Item} from './Item';

export abstract class Consumable extends Item {
    private consumed: boolean;
    private spoiled: boolean;

    protected constructor(name: string, value: number, weight: number, spoiled: boolean) {
        super(name, value, weight);
    }

    use(): string {
        return '';
    }

    eat(): string {
        return '';
    }

    get isConsumed(): boolean {
        return false;
    }

    set setConsumed(consumed: boolean) {}

    get isSpoiled(): boolean {
        return false
    }

    toString(): string {
        return '';
    }
}