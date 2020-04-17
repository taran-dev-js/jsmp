import { ShipInfo, ShipmentAbstract } from '../sipment';
import { PACKAGE } from '../constants';

export class Package extends ShipmentAbstract {
	typeShipper = PACKAGE;

	public ship(shipInfo: ShipInfo): number {
		const cost = this.implementation.getCost(this.typeShipper);
		Package.showMessage(shipInfo, cost);

		return cost;
	}
}
