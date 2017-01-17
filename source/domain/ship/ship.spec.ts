import { expect } from 'chai';
import { Ship } from './ship';
import { DestroyedEvent } from '../action/destroyedEvent';

class TestShip extends Ship {}

describe('Ship', () => {
	let ship: Ship;
	let lastEvent;

	beforeEach(() => {
		ship = new TestShip();
		ship.events$.subscribe(event => lastEvent = event);
	});

	describe('shieldHit', () => {
		it('should return the event untouched if there are no shields', () => {
			ship.shields = 0;
			const event = {};

			const result = ship.shieldHit(<any>event);

			expect(result).to.equal(event);
		});

		it('should reduce the shields by the attack damage and absorb the whole attack', () => {
			ship.shields = 3;
			const event = { weapon: { damage: 2 }};

			const result: any = ship.shieldHit(<any>event);

			expect(ship.shields).to.equal(1);
			expect(result.weapon).to.equal(event.weapon);
			expect(result.absorbedDamage).to.equal(2);
		});

		it('should drain the shields and absorb an equivalent amount of damage', () => {
			ship.shields = 2;
			const event = { weapon: { damage: 3 }};

			const result: any = ship.shieldHit(<any>event);

			expect(ship.shields).to.equal(0);
			expect(result.weapon).to.equal(event.weapon);
			expect(result.absorbedDamage).to.equal(2);
		});
	});

	describe('structureHit', () => {
		it('should reduce the hull strength by the damage amount', () => {
			ship.hull = 3;

			ship.structureHit(<any>{ weapon: { damage: 2 }});

			expect(ship.hull).to.equal(1);
		});

		it('should emit a destroyed event', () => {
			ship.hull = 3;

			ship.structureHit(<any>{ weapon: { damage: 3 }});

			expect(lastEvent instanceof DestroyedEvent).to.be.true;
			expect(lastEvent.destroyedShip).to.equal(ship);
		});
	});
});
