export class PagesIterable  {
    private item: any;
    private nextIdx: number;

    constructor(page: any) {
        this.item = page;
        this.nextIdx = 0;
    }

    next() {
        if (this.nextIdx === this.item.pages.pages.length) {
            return {
                value: undefined,
                done: true
            }
        }
        const result = {
            value: this.item,
            done: false
        };

        this.nextIdx++;

        return result;
    }
}