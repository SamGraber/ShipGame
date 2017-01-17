import { expect } from 'chai';
import { SinonSpy, spy, assert } from 'sinon';
import { Weapon } from './weapon';
import { AttackEvent } from '../action/attackEvent';

class TestWeapon extends Weapon {}

describe('Weapon', () => {
	let weapon: Weapon;

	beforeEach(() => {
		weapon = new TestWeapon();
	});

	describe('fire', () => {
		let target;
		let shieldHitResult;
		let shieldHitSpy: SinonSpy;
		let structureHitSpy: SinonSpy;

		beforeEach(() => {
			shieldHitResult = {};
			shieldHitSpy = spy(() => shieldHitResult);
			structureHitSpy = spy();
			target = {
				shieldHit: shieldHitSpy,
				structureHit: structureHitSpy,
			};
		});

		it('should not hit the structure if the shields absorb all the damage', () => {
			const damage = 2;
			shieldHitResult.damage = damage;
			shieldHitResult.absorbedDamage = damage;
			const event = {
				target,
				damage,
			};

			weapon.fire(<any>event);

			assert.calledOnce(shieldHitSpy);
			assert.calledWith(shieldHitSpy, event);
			assert.notCalled(structureHitSpy);
		});

		it('should hit the structure with the damage not absorbed by the shields', () => {
			const damage = 2;
			const remainingDamage = 1;
			shieldHitResult.damage = damage;
			shieldHitResult.absorbedDamage = damage - remainingDamage;
			const event = {
				target,
				damage,
			};

			weapon.fire(<any>event);

			assert.calledOnce(shieldHitSpy);
			assert.calledWith(shieldHitSpy, event);
			assert.calledOnce(structureHitSpy);
			assert.calledWith(structureHitSpy, new AttackEvent(target, weapon.weaponType, remainingDamage));
		});
	});
});
