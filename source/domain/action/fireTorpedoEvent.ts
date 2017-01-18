import { IAttackEvent, IShip, WeaponType } from '../interfaces';

export class FireTorpedoEvent implements IAttackEvent {
	constructor(public target: IShip
			, public weaponType: WeaponType
			, public damage: number) {}
}
