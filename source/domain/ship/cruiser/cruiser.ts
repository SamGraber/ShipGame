import { IShip, Ship } from '../ship';

import { AttackEvent } from '../../action/index';
import { IWeapon, WeaponType } from '../../weapon/index';

export class Cruiser extends Ship {
	weapon: IWeapon = {
		weaponType: WeaponType.beam,
		damage: 2,
	};
	hull = 4;
	shields = 1;

	attack(target: IShip): void {
		this._events.next(new AttackEvent(target, this.weapon.weaponType, this.weapon.damage));
	}

	recharge(): void {
		this.shields = 1;
	}
}
