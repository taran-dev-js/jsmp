export class Page {
    pageNumber: number;
    pageType: string;
    pageMaterial: string;
    constructor(pageNumber: number, pageType: string, pageMaterial: string) {
            this.pageNumber = pageNumber;
            this.pageType = pageType;
            this.pageMaterial = pageMaterial;
    }
}