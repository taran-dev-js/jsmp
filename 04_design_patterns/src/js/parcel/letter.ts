import { ShipInfo, ShipmentAbstract } from '../sipment';
import { LETTER } from '../constants';

export class Letter extends ShipmentAbstract {
	typeShipper = LETTER;

	public ship(shipInfo: ShipInfo): number {
		const cost = this.implementation.getCost(this.typeShipper);
		Letter.showMessage(shipInfo, cost);

		return cost;
	}
}
