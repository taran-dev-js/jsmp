export {Item} from '../abstractClass/Item';

export interface Comparable {
    // id: number;
    // value: number;
    // name: string;
    // weight: number;
    compareTo(other: any): number;
    toString(): string;
}