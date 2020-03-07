import {Weapon} from './abstractClass/Weapon';

export class Bow extends Weapon {

    constructor(baseDamage: number, baseDurability: number, value: number, weight: number) {
        const defaultName = 'bow';
        super(defaultName, value, baseDamage, baseDurability, weight);

    }

    polish(): void {
        this.durabilityModifier += this.MODIFIER_CHANGE_RATE; // TODO no more 1
    }
}

// const b = new Bow(30.4219, 0.7893, 300, 2.032);
// console.log(b.use());
// console.log(b.polish());
// console.log(b.use());
