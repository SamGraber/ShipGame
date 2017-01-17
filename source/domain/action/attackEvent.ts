import { IEvent, IShip, IWeapon } from '../interfaces';

export interface IAttackEvent extends IEvent {
	target: IShip;
	weapon: IWeapon;
}

export class AttackEvent implements IAttackEvent {
	constructor(public target: IShip
			, public weapon: IWeapon) {}
}
