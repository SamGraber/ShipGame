import { IAttackEvent } from '../interfaces';
import { WeaponType } from './weaponType.enum';
import { ModifiedAttackEvent } from '../action/modifiedAttackEvent';
import { AttackEvent } from '../action/attackEvent';

export interface IWeapon {
	weaponType: WeaponType;
	damage: number;
}

export abstract class Weapon implements IWeapon {
	weaponType: WeaponType;
	damage: number;

	fire(event: IAttackEvent): void {
		let shieldHitEvent: ModifiedAttackEvent = <ModifiedAttackEvent>event.target.shieldHit(event);
		const remainingDamage = shieldHitEvent.damage - shieldHitEvent.absorbedDamage;
		
		if (remainingDamage) {
			const structureHit = new AttackEvent(event.target, this.weaponType, remainingDamage);
			event.target.structureHit(structureHit);
		}
	}
}
