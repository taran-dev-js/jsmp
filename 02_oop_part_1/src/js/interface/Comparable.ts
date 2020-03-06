import {Item} from "../abstractClass/Item";

export interface Comparable {
    compareTo(other: Item): number;
    toString(): string;
}