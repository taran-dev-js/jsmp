import {IState} from "./ConvertCurrency";

interface IEventDetail {
    property: string;
    value: Object | number | string;
    target: IState;
}

export class StateProxy {

    onChange(objToWatch: IState) {
        const handler = {
            get(target: any, property: any, receiver: any): any {
                if (typeof target[property] === 'object' && target[property] !== null) {
                    return new Proxy(target[property], handler)
                } else {
                    return target[property];
                }
            },
            set(target: IState, property: string, value: Object | number | string) {
                StateProxy.createCustomEvent({ property, value, target });

                return Reflect.set(target, property, value);
            }
        };

        return new Proxy(objToWatch, handler);
    }

    private static createCustomEvent(detail: IEventDetail) {
        const event = new CustomEvent('changeState', { 'detail': detail});
        document.body.dispatchEvent(event);
    }
}

