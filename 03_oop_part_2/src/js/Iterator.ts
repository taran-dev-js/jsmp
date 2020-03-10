
export class Iterator {
    private page: any;
    private nextIdx: number;

    constructor(page: any) {
        this.page = page;
        this.nextIdx = 0;
    }

    next() {
        if (this.nextIdx === this.page.pages.length) {
            return {
                value: null,
                done: true
            }
        }

        const result = {
            value: this.page.get(this.nextIdx),
            done: false
        };

        this.nextIdx++;

        return result;
    }
}