import { WeaponType } from './weaponType.enum';

export interface IWeapon {
	weaponType: WeaponType;
	damage: number;
}
