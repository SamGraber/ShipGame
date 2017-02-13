import { Battlefield } from '../battlefield/battlefield';
import { PlayerShip } from './playerShip';

export class Player {
	ships: PlayerShip[];

	constructor(public battlefield: Battlefield) {}
}
