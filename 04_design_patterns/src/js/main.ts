import { Letter, Oversized, Package } from './parcel/index';
import { DoNotLeaveDecorator, FragileDecorator, ReturnReceiptDecorator } from './decorators/index';
import { ShipInfo } from './sipment';

const weightShip: { readonly [key: string]: number } = {
	letter: 15,
	package: 160
};

const shipInfo: ShipInfo = {
	toAddress: 'Florida',
	fromAddress: 'Boston',
	toZipCode: '95623',
	fromZipCode: '83569',
	weight: 220
};

const client = () => {
	const { fromZipCode, weight } = shipInfo;
	let typeShipment;

	if (weight <= weightShip.letter) {
		typeShipment = new Letter(fromZipCode);
	} else if (weight <= weightShip.package) {
		typeShipment = new Package(fromZipCode);
	} else {
		typeShipment = new Oversized(fromZipCode);
	}

	typeShipment.ship(shipInfo);

	new DoNotLeaveDecorator(typeShipment).showMessage();
	new FragileDecorator(typeShipment).showMessage();
	new ReturnReceiptDecorator(typeShipment).showMessage();
};

client();
