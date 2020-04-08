interface ICurrency {
    [key: string]: string
}

export class CurrencyTemplate {
    wrapper = document.getElementById('container');

    constructor() {
    }

    render(model: any) {
        const template = (data: any) => `
        <div class="currency" data-rate="${data.name}">
            <h3 class="currency_title">${data.name}</h3>
            <form action="#" class="currency_form">
                <label class="currency_top">
                    <span class="currency_top-text">1 EURO is </span>
                    <input type="number" value="${data.rate}" data-currency-calculate-input="rate-value" class="currency_input js-rate">
                    <span class="currency_top-text">${data.name}</span>
                </label>
                <label class="currency_bottom">
                    <span>EURO</span>
                    <input type="number" value="${data.defaultValue}" data-currency-calculate-input="default-value" class="currency_input js-default-value">
                </label>
                <label class="currency_bottom">
                    <span>${data.name}</span>
                    <input type="number" value="${data.convertValue}" data-currency-calculate-input="convert-value" class="currency_input js-convert-value">
                </label>
            </form>
        </div>`;

        this.wrapper.innerHTML += template(model);

    }
}

