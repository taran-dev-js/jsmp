import {APICurrency} from '../model/APICurrency';
import {CurrencyTemplate} from '../view/currencyTemplate';

interface IState {
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
interface Interface {
    [key: string]: Function;
}
export class ConvertCurrency {
    state: IState;
    defaultValue: number = 100;

    constructor() {
        this.state = {
            pinEuro: false,
            rates: {}
        };
        this.state = this.onChange(this.state);
        // this.state.pinEuro = false;
        // this.state.rates = {};
        this.getCurrency()
            .then(() => {
                this.renderView();
                this.convert();
                this.radio();
                this.test()
            });

    }

    onChange(objToWatch: Object) {
        const handler = {
            get(target: any, property: any, receiver: Object): any {
                if (typeof target[property] === 'object' && target[property] !== null) {
                    return new Proxy(target[property], handler)
                } else {
                    return target[property];
                }
            },
            set(target: any, property: any, value: any) {
                // console.log('property', property);
                // console.log('value, target', JSON.parse(JSON.stringify(value)), target);
                // console.log('-----------');

                const event = new CustomEvent('build', {
                    'detail': {
                        'property': property,
                        'value': JSON.parse(JSON.stringify(value)),
                        'target': target
                    }
                });

                document.body.dispatchEvent(event);
                return Reflect.set(target, property, value);
            },
            deleteProperty(target: Object, property: any) {
                return Reflect.deleteProperty(target, property);
            }
        };
        return new Proxy(objToWatch, handler);
    }

    test(){
        const rate = [...document.querySelectorAll('[data-rate]')];
        document.body.addEventListener('build', (e: CustomEvent) => {
            console.log(e.detail);
            const target = e.detail.target.name;

            rate.forEach(item => {
                const attr = item.getAttribute('data-currency-calculate-input');

            })
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
        const rate = [...document.querySelectorAll('[data-rate]')];

        rate.forEach(item => {
            const inputs = [...item.querySelectorAll('[data-currency-calculate-input]')];
            const defaultValueInput: HTMLInputElement = item.querySelector('.js-default-value');
            const convertValueInput: HTMLInputElement = item.querySelector('.js-convert-value');
            const inp = [...document.querySelectorAll('.js-default-value')];
            const currency = item.getAttribute('data-rate');
            const targetCurrency = this.state.rates[currency];

            const hendler: { [key: string]: Function } = {
                ['rate-value']: (value: number) => {
                    targetCurrency.rate = value;
                    // console.log(value, targetCurrency.defaultValue, value * targetCurrency.defaultValue,'----------------------------');
                    targetCurrency.convertValue = value * targetCurrency.defaultValue;

                    convertValueInput.value = String(targetCurrency.convertValue);//TODO View
                },
                ['convert-value']: (value: number) => {
                    targetCurrency.convertValue = value;
                    targetCurrency.defaultValue = Number((value / targetCurrency.rate).toFixed(3));

                    defaultValueInput.value = String(targetCurrency.defaultValue)
                },
                ['default-value']: (value: number) => {
                    if (this.state.pinEuro) {
                        hendler['all'](value);

                        inp.forEach((i: HTMLInputElement) => {
                            i.value = String(value);
                        })
                    } else {
                        targetCurrency.defaultValue = value;
                        targetCurrency.convertValue = Number((value * targetCurrency.rate).toFixed(3));

                        convertValueInput.value = String(targetCurrency.convertValue)
                    }

                },
                ['all']: (value: number) => {
                    for (let rateItem in this.state.rates) {
                        this.state.rates[rateItem].defaultValue = value;
                        this.state.rates[rateItem].convertValue = value * targetCurrency.rate;
                    }
                }
            };

            item.addEventListener('keyup', (e: Event) => {
                console.log(e);
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
    }

    renderView() {
        const template = new CurrencyTemplate();

        for (let rate in this.state.rates) {
            template.render(this.state.rates[rate])
        }

    }

}

new ConvertCurrency();