import {APICurrency} from '../model/APICurrency';
import {CurrencyTemplate} from '../view/currencyTemplate';
import {StateProxy} from "./StateProxy";

export interface IState {
    pinEuro: boolean;
    rates: {
        [key: string]: {
            name?: string,
            rate?: number;
            defaultValue?: number;
            convertValue?: number;
        }
    };
}

export class ConvertCurrency {
    state: IState;
    defaultValue: number = 100;
    rates: Array<Element>;

    constructor() {
        const stateListener = new StateProxy();
        this.state = {
            pinEuro: false,
            rates: {}
        };

        this.state = stateListener.onChange(this.state);

        this.getCurrency()
            .then(() => {
                this.renderView();
                this.rates = [...document.querySelectorAll('[data-rate]')];

                this.calculate();
                this.handlerPinEuro();
                this.updateView()
            });

    }

    updateView() {
        document.body.addEventListener('changeState', (e: CustomEvent) => {
            const detail = e.detail;
            // console.log(detail);
            if (detail.target.name) {
                this.rates.forEach(rateItem => {
                    const inputs = [...rateItem.querySelectorAll('[data-currency-calculate-input]')];

                    inputs.forEach((inputElement: HTMLInputElement) => {
                        const attr = inputElement.getAttribute('data-currency-calculate-input');

                        if (detail.target.name === rateItem.getAttribute('data-rate')) {
                            if (detail.property === attr) {
                                inputElement.value = detail.value
                            }
                        }
                    })
                })
            }

        })
    }

    handlerPinEuro() {
        const radioInput = [...document.querySelectorAll('[type="radio"]')];

        radioInput.forEach(input => {
            input.addEventListener('change', event => {
                let target = (<HTMLInputElement>event.target);
                this.state.pinEuro = target.id === 'pin-radio';
            })
        })
    }

    calculate() {
        this.rates.forEach(rate => {
            const currency = rate.getAttribute('data-rate');
            const targetCurrency = this.state.rates[currency];

            const handler: { [key: string]: (value: number) => void } = {
                ['rate']: (value) => {
                    targetCurrency.rate = ConvertCurrency.toNumberFloor(value);
                    targetCurrency.convertValue = ConvertCurrency.toNumberFloor(value * targetCurrency.defaultValue);
                },
                ['convertValue']: (value) => {
                    targetCurrency.convertValue = ConvertCurrency.toNumberFloor(value);
                    targetCurrency.defaultValue = ConvertCurrency.toNumberFloor(value / targetCurrency.rate);
                },
                ['defaultValue']: (value) => {
                    if (this.state.pinEuro) {
                        handler['all'](value);
                    } else {
                        targetCurrency.defaultValue = ConvertCurrency.toNumberFloor(value);
                        targetCurrency.convertValue = ConvertCurrency.toNumberFloor(value * targetCurrency.rate);
                    }
                },
                ['all']: (value) => {
                    for (let rateItem in this.state.rates) {
                        const currentRateItem = this.state.rates[rateItem];
                        currentRateItem.defaultValue = ConvertCurrency.toNumberFloor(value);
                        currentRateItem.convertValue = ConvertCurrency.toNumberFloor(value * currentRateItem.rate);
                    }
                }
            };

            rate.addEventListener('keyup', event => {
                const target = (<HTMLInputElement>event.target);
                const value = Number(target.value);
                const attr = target.getAttribute('data-currency-calculate-input');

                handler[attr](value);

            });

        })
    }

    getCurrency = async () => {
        const modelApi = new APICurrency();
        const model = await modelApi.getCurrency();

        for (let item in model.rates) {
            if (model.rates.hasOwnProperty(item)) {
                this.state.rates[item] = {
                    name: item,
                    rate: model.rates[item],
                    defaultValue: this.defaultValue,
                    convertValue: ConvertCurrency.toNumberFloor(model.rates[item] * this.defaultValue)
                }
            }
        }
    };

    renderView() {
        const template = new CurrencyTemplate();
        for (let rate in this.state.rates) template.render(this.state.rates[rate])
    }

    private static toNumberFloor(value: number): number {
        return Number((value).toFixed(3));
    }

}
