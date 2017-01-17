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
		const shieldHitResult = this.attackShield(event);

		if (shieldHitResult.damage) {
			this.attackStructure(shieldHitResult);
		}
	}

	attackShield(event: IAttackEvent): IAttackEvent {
		let shieldHitEvent: ModifiedAttackEvent = <ModifiedAttackEvent>event.target.shieldHit(event);
		const remainingDamage = shieldHitEvent.damage - shieldHitEvent.absorbedDamage;
		return new AttackEvent(event.target, this.weaponType, remainingDamage);
	}

	attackStructure(event: IAttackEvent): void {
		event.target.structureHit(event);
	}
}
