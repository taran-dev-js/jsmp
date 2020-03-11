import {Weapon} from './abstractClass/Weapon';

export class Bow extends Weapon {

    constructor(baseDamage: number, baseDurability: number, value: number, weight: number) {
        const defaultName = 'bow';
        super(defaultName, value, baseDamage, baseDurability, weight);
    }

    polish(): void {
        if (this.durabilityModifier <= 1) {
            this.durabilityModifier = 1;
        } else {
            this.durabilityModifier += this.MODIFIER_CHANGE_RATE;
        }
    }
}

