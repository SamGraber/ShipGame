import { Observable, Subject } from 'rxjs';

import { IEvent, IAttackEvent } from '../interfaces';
import { DestroyedEvent } from '../action/destroyedEvent';

export interface IShip {
	attack(target: IShip): void;
	defend(attack: IAttackEvent): void;
	recharge(): void;

	events$: Observable<IEvent>;
}

export abstract class Ship {
	hull: number;
	shields: number;

	_events: Subject<IEvent> = new Subject<IEvent>();

	get events$(): Observable<IEvent> { 
		return this._events.asObservable(); 
	}

	attack(target: IShip): void {
		
	}

	defend(attack: IAttackEvent): void {
		let hullDamage: number = 0;
		if (this.shields) {
			if (attack.weapon.damage > this.shields) {
				hullDamage = attack.weapon.damage - this.shields;
				this.shields = 0;
			} else {
				this.shields -= attack.weapon.damage;
			}
		} else {
			hullDamage = attack.weapon.damage;
		}

		if (hullDamage >= this.hull) {
			this._events.next(new DestroyedEvent(this));
		} else {
			this.hull -= hullDamage;
		}
	}
	
	recharge(): void {
		
	}
}