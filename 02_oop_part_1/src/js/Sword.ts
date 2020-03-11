import {Weapon} from './abstractClass/Weapon';

export class Sword extends Weapon {
    private readonly damage: number;

    constructor(baseDamage: number, baseDurability: number, value: number, weight: number) {
        const defaultName = 'sword';
        super(defaultName, value, baseDamage, baseDurability, weight);

        this.damage = baseDamage;
    }

    polish(): void {
        this.damageModifier += this.MODIFIER_CHANGE_RATE + (this.damage / 100 * 0.25);
    }
}
