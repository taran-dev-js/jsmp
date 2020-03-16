
export class PagesIterable  {
    private page: any;
    private nextIdx: number;

    constructor(page: any) {
        this.page = page;
        this.nextIdx = 0;
    }

    next() {
        if (this.nextIdx === this.page.pages.pages.length) {
            return {
                value: undefined,
                done: true
            }
        }
        // console.log(this.page.pages.pages);
        const result = {
            value: this.page,
            done: false
        };

        this.nextIdx++;

        return result;
    }
}