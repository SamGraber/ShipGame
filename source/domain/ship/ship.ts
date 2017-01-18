import { Observable, Subject } from 'rxjs';

import { IEvent, IAttackEvent } from '../interfaces';
import { ModifiedAttackEvent } from '../action/modifiedAttackEvent';
import { DestroyedEvent } from '../action/destroyedEvent';

export interface IShip {
	// attack
	attack(target: IShip): void;

	// defense
	shieldHit(attack: IAttackEvent): IAttackEvent;
	structureHit(attack: IAttackEvent): void;

	// extras
	recharge(): void;

	hull: number;
	shields: number;
	speed: number;

	events$: Observable<IEvent>;
}

export abstract class Ship {
	hull: number;
	shields: number;
	speed: number;
	
	_events: Subject<IEvent> = new Subject<IEvent>();

	get events$(): Observable<IEvent> { 
		return this._events.asObservable();
	}

	attack(target: IShip): void {
		
	}

	shieldHit(attack: IAttackEvent): IAttackEvent {
		if (this.shields) {
			let absorbed: number;
			if (this.shields >= attack.damage) {
				absorbed = attack.damage;
			} else {
				absorbed = this.shields;
			}
			this.shields = this.shields - absorbed;
			return new ModifiedAttackEvent(attack, absorbed);
		}
		return attack;
	}

	structureHit(attack: IAttackEvent): void {
		if (this.hull > attack.damage) {
			this.hull = this.hull - attack.damage;
		} else {
			this._events.next(new DestroyedEvent(this));			
		}
	}
	
	recharge(): void {
		
	}
}