import {Item} from "../abstractClass/Item";

export interface Comparable {
    name: string;
    value: number;
    weight: number;
    compareTo(other: Item): number;
    toString(): string;
    use(): string;
}