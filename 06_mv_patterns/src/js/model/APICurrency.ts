export class APICurrency {

    getCurrency = async () => {
        const currency = await fetch('/rates.json', {mode: 'no-cors'});
        return currency.json();
    }

}