import { IShip, WeaponType } from '../../interfaces';
import { Weapon } from '../weapon';

export class Laser extends Weapon {
	constructor(power: number) {
		super();
		this.weaponType = WeaponType.beam;
		this.damage = power;
	}
}
