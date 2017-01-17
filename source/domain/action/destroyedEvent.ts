import { IEvent, IShip } from '../interfaces';

export class DestroyedEvent implements IEvent {
	constructor(public destroyedShip: IShip) {}
}
