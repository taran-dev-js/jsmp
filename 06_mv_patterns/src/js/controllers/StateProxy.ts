import {IState} from "./ConvertCurrency";

export class StateProxy {

    onChange(objToWatch: IState) {
        const handler = {
            get(target: any, property: any, receiver: Object): any {
                if (typeof target[property] === 'object' && target[property] !== null) {
                    return new Proxy(target[property], handler)
                } else {
                    return target[property];
                }
            },
            set(target: any, property: any, value: any) {
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
}

