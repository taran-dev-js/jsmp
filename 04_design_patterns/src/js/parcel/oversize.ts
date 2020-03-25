import { ShipmentAbstract, ShipInfo } from '../sipment';
import { OVERSIZE } from '../constants';

export class Oversized extends ShipmentAbstract{
	typeShipper = OVERSIZE;

	public ship(shipInfo: ShipInfo): number {
		const cost = this.implementation.getCost(this.typeShipper);
		Oversized.showMessage(shipInfo, cost);

		return cost;
	}
}
