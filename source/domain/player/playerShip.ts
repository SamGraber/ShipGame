import { ShipLocation } from '../battlefield/shipLocation';

export class PlayerShip {
	exhausted: boolean = false;

	constructor(public ship: ShipLocation) {}
}