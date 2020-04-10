import {NumberCalculate} from "./NumberCalculate";
import {RangeCalculate} from "./RangeCalculate";

export class ChooseView {
    activeClass: string = 'is-active';
    alert: HTMLElement;

    constructor() {
        this.alert = document.getElementById('alert');

        this.alert.classList.add(this.activeClass);

        this.alert.addEventListener('click', (event: any) => {
            const target = (<HTMLElement>event.target);
            this.handler[target.id]()
        });
    }

    handler: { [key: string]: Function } = {
        ['number-button']: () => {
            new NumberCalculate();
            this.alert.classList.remove(this.activeClass)
        },
        ['range-button']: () => {
            new RangeCalculate();
            this.alert.classList.remove(this.activeClass)
        }
    }
}