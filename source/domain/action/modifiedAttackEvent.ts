import { IEvent, IShip, WeaponType } from '../interfaces';
import { AttackEvent } from './attackEvent';

export class ModifiedAttackEvent extends AttackEvent {
	constructor(public attack: AttackEvent
			, public absorbedDamage: number) {
		super(attack.target, attack.weaponType, attack.damage);
	}
}
