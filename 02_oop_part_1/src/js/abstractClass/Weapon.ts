import {Item} from './Item';

export abstract class Weapon extends Item {
    readonly MODIFIER_CHANGE_RATE: number = 0.05;
    private baseDamage: number;
    private baseDurability: number;
    private effectiveDamage: number;
    private effectiveDurability: number;
    damageModifier: number = this.MODIFIER_CHANGE_RATE;
    durabilityModifier: number = this.MODIFIER_CHANGE_RATE;

    protected constructor(name: string, value: number, baseDamage: number, baseDurability: number, weight: number ) {
        super(name,value, weight);
        this.baseDamage = baseDamage;
        this.baseDurability = baseDurability;
    }

    abstract polish(): void;

    use(): string {
        this.effectiveDamage = this.floor(this.baseDamage + this.damageModifier);
        this.effectiveDurability = this.floor(this.baseDurability + this.durabilityModifier);
        this.effectiveDurability -= this.MODIFIER_CHANGE_RATE;

        const baseMessage = `You use the ${this.name}, dealing ${this.floor(this.effectiveDamage)} points of damage.`;

        if (this.effectiveDurability === 0) {
            return baseMessage + `The ${this.name} breaks`;
        } else if (this.effectiveDurability < 0) {
            throw Error(`You can't use the ${this.name}, it is broken`);
        }
        return baseMessage;
    }

    get getDamage(): number { return this.effectiveDamage }

    get getDurability(): number { return this.effectiveDurability }

    toString(): string {
        const {value, weight, baseDurability, baseDamage} = this;
        return `${this.name} - Value : ${value}, Weight : ${weight} , Damage : ${baseDamage} , Durability : ${baseDurability}%`;
    }

    private floor(num: number): number {
        return Math.floor(num * 100) / 100;
    }

}