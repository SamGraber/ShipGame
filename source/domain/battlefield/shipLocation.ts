import { IShip } from '../interfaces';
import { Coordinate } from './coordinate';

export class ShipLocation {
	constructor(public ship: IShip
			, public location: Coordinate) {}
}
