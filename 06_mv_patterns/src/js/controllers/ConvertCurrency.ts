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
        const stateProxy = new StateProxy();
        this.state = {
            pinEuro: false,
            rates: {}
        };

        this.state = stateProxy.onChange(this.state);

        this.getCurrency()
            .then(() => {
                this.renderView();
                this.rates = [...document.querySelectorAll('[data-rate]')];

                this.convert();
                this.radio();
                this.test()
            });

    }

    test(){
        document.body.addEventListener('build', (e: CustomEvent) => {
            const detail = e.detail;

            if (detail.target.name) {
                this.rates.forEach(item => {
                    const inputs = [...item.querySelectorAll('[data-currency-calculate-input]')];

                    inputs.forEach((elem: HTMLInputElement) => {
                        const attr = elem.getAttribute('data-currency-calculate-input');

                        if (detail.target.name === item.getAttribute('data-rate')) {
                            if (detail.property === attr) {
                                elem.value = detail.value
                            }
                        }
                    })
                })
            }

        })
    }

    radio() {
        const radioInput = [...document.querySelectorAll('[type="radio"]')];

        radioInput.forEach(input => {
            input.addEventListener('change', (e) => {
                let target = (<HTMLInputElement>e.target);

                if (target.id === 'pin-radio') {
                    this.state.pinEuro = target.checked;
                } else {
                    this.state.pinEuro = !target.checked;
                }
            })
        })
    }

    pinEuro() {
        const rate = [...document.querySelectorAll('[data-rate]')];
        const inp = [...document.querySelectorAll('.js-default-value')];
        let rates = this.state.rates;

        rate.forEach(item => {
            const euroInput: HTMLInputElement = item.querySelector('.js-default-value');
            // console.log(item.querySelectorAll('.js-first-currency'));
            const handler = (e: Event) => {
               if (this.state.pinEuro) {
                   const target = (<HTMLInputElement>e.target);
                   const value = Number(target.value);
                  for (let rate in rates) {
                      rates[rate].defaultValue = value;
                  }
                   // console.log(rates);
                   inp.forEach((i: HTMLInputElement) => {
                       i.value = String(value);
                   })
               }
            };

            // euroInput.addEventListener('keyup', handler)
        })
    }

    convert() {
        this.rates.forEach(item => {
            const currency = item.getAttribute('data-rate');
            const targetCurrency = this.state.rates[currency];

            const hendler: { [key: string]: Function } = {
                ['rate']: (value: number) => {
                    targetCurrency.rate = value;
                    targetCurrency.convertValue = value * targetCurrency.defaultValue;
                },
                ['convertValue']: (value: number) => {
                    targetCurrency.convertValue = value;
                    targetCurrency.defaultValue = Number((value / targetCurrency.rate).toFixed(3));
                },
                ['defaultValue']: (value: number) => {
                    if (this.state.pinEuro) {
                        hendler['all'](value);
                    } else {
                        targetCurrency.defaultValue = value;
                        targetCurrency.convertValue = Number((value * targetCurrency.rate).toFixed(3));
                    }
                },
                ['all']: (value: number) => {
                    for (let rateItem in this.state.rates) {
                        this.state.rates[rateItem].defaultValue = value;
                        this.state.rates[rateItem].convertValue = value * this.state.rates[rateItem].rate;
                    }
                }
            };

            item.addEventListener('keyup', (e: Event) => {
                const target = (<HTMLInputElement>e.target);
                const value = Number(target.value);
                const attr: string = target.getAttribute('data-currency-calculate-input');

                hendler[attr](value);

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
                    convertValue: model.rates[item] * this.defaultValue
                }
            }
        }
    };

    renderView() {
        const template = new CurrencyTemplate();
        for (let rate in this.state.rates) template.render(this.state.rates[rate])
    }

}

new ConvertCurrency();