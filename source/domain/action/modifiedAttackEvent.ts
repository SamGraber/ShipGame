import { IEvent, IShip, IWeapon } from '../interfaces';
import { AttackEvent } from './attackEvent';

export class ModifiedAttackEvent extends AttackEvent {
	constructor(public target: IShip
			, public weapon: IWeapon
			, public absorbedDamage: number) {
		super(target, weapon);
	}
}
