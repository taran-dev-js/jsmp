export abstract class CurrencyTemplate {
    wrapper = document.getElementById('container');
    maxRange: number = 1000;

    constructor() {
        this.renderButton();
    }

    private renderButton() {
        const template = `
        <label class="top-label">
            Pin Euro
            <input type="radio" name="euro" value="all" id="pin-radio">
        </label>
        <label class="top-label">
            Unpin Euro
            <input type="radio" name="euro" value="one" id="unpin-radio" checked>
        </label>`;
        this.wrapper.innerHTML += template;
    }

    abstract render(data: any): void;
}

