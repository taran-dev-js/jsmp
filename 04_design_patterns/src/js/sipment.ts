import { Shipper } from './shipper';
import { AirEastShipper, ChicagoSprintShipper, PacificParcelShipper } from './shippers/index';

export interface ShipInfo {
	toAddress: string;
	fromAddress: string;
	toZipCode: string;
	fromZipCode: string;
	readonly weight: number;
}

export interface IShipment {
	getShipmentID?: () => number;
	ship?: (shipInfo: ShipInfo) => void;
	showMessage?: (shipInfo?: ShipInfo, cost?: number) => void;
}

export abstract class ShipmentAbstract implements IShipment {
	protected implementation: Shipper;
	protected typeShipper: string;

	constructor(fromZipCode: string) {
		if (fromZipCode[0] === '0') {
			console.log(`Zip code can't be start with 0`);
			return;
		}

		this.implementation = new mapShipper[fromZipCode[0]];
		// console.log(this.implementation);
	}

	public static getShipmentID(): number {
		const random = Math.random() * 1000;
		return Math.floor(random);
	}

	public ship(shipInfo: ShipInfo): void {}

	protected static showMessage(shipInfo?: ShipInfo, cost?: number): void {
		const { fromZipCode, toZipCode, toAddress, fromAddress } = shipInfo;

		console.log(`Shipment with the ID ${ ShipmentAbstract.getShipmentID() } will be picked up from ${ fromZipCode } 4th Ave SE, \n` +
			`${ fromAddress }, Wa 92021 and shipped to 1313 Mockingbird Lane, ${ toAddress }, OK ${ toZipCode }`);

		console.log(`Cost = ${ cost }`);
	}
}

const mapShipper: { [key: string]: any } = {
	[1]: AirEastShipper,
	[2]: AirEastShipper,
	[3]: AirEastShipper,
	[4]: ChicagoSprintShipper,
	[5]: ChicagoSprintShipper,
	[6]: ChicagoSprintShipper,
	[7]: PacificParcelShipper,
	[8]: PacificParcelShipper,
	[9]: PacificParcelShipper,
};
