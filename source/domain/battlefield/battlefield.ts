import { without, filter, max } from 'lodash';
import { ShipLocation } from './shipLocation';

export class Battlefield {
	ships: ShipLocation[];

	getVisibleShips(ship: ShipLocation): ShipLocation[] {
		return filter(without(this.ships, ship), otherShip => {
			return this.getRange(ship, otherShip) <= 3;
		});
	}

	getRange(sourceShip: ShipLocation, targetShip: ShipLocation): number {
		const xRange = Math.abs(sourceShip.location.x - targetShip.location.x);
		const yRange = Math.abs(sourceShip.location.y - targetShip.location.y);
		return max([xRange, yRange]);
	}
}
