import { IEvent, IShip, WeaponType } from '../interfaces';

export interface IAttackEvent extends IEvent {
	target: IShip;
	weaponType: WeaponType;
	damage: number;
}

export class AttackEvent implements IAttackEvent {
	constructor(public target: IShip
			, public weaponType: WeaponType
			, public damage: number) {}
}
