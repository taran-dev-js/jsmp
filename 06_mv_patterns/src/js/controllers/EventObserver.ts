export class EventObserver {
    observers: Array<any> = [];

    constructor () {
    }

    subscribe (fn: any) {
        this.observers.push(fn)
    }

    unsubscribe (fn: any) {
        this.observers = this.observers.filter(subscriber => subscriber !== fn)
    }

    broadcast (data: any) {
        this.observers.forEach(subscriber => subscriber(data))
    }
}

// const observer = new EventObserver();
//
// // @ts-ignore
// observer.subscribe(data => {
//     console.log('subscribe for module 1 fired', data)
// })
// // @ts-ignore
//
// observer.subscribe(data => {
//     console.log('subscribe for module 2 fired', data)
// })
//
// observer.broadcast({someData: 'hello'});