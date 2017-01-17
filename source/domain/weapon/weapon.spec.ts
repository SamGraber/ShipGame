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
		let attackShieldResult;
		let attackShieldSpy: SinonSpy;
		let attackStructureSpy: SinonSpy;

		beforeEach(() => {
			attackShieldResult = {};
			attackShieldSpy = spy(() => attackShieldResult);
			attackStructureSpy = spy();
			weapon.attackShield = attackShieldSpy;
			weapon.attackStructure = attackStructureSpy;
		});

		it('should not hit the structure if the shields absorb all the damage', () => {
			attackShieldResult.damage = 0;
			const event = {};

			weapon.fire(<any>event);

			assert.calledOnce(attackShieldSpy);
			assert.calledWith(attackShieldSpy, event);
			assert.notCalled(attackStructureSpy);
		});

		it('should hit the structure with the damage not absorbed by the shields', () => {
			attackShieldResult.damage = 1;
			const event = {};

			weapon.fire(<any>event);

			assert.calledOnce(attackShieldSpy);
			assert.calledWith(attackShieldSpy, event);
			assert.calledOnce(attackStructureSpy);
			assert.calledWith(attackStructureSpy, attackShieldResult);
		});
	});

	describe('attackShield', () => {
		let target;
		let shieldHitResult;
		let shieldHitSpy: SinonSpy;

		beforeEach(() => {
			shieldHitResult = {};
			shieldHitSpy = spy(() => shieldHitResult);
			target = {
				shieldHit: shieldHitSpy,
			};
		});

		it('should hit the shields on the target and return a new attack event with the absorbed damage subtracted', () => {
			shieldHitResult.damage = 2;
			shieldHitResult.absorbedDamage = 1;
			const event = {
				target,
				damage: 2,
			};

			const result = weapon.attackShield(<any>event);

			assert.calledOnce(shieldHitSpy);
			assert.calledWith(shieldHitSpy, event);
			expect(result.target).to.equal(target);
			expect(result.damage).to.equal(1);
		});
	});

	describe('attackStructure', () => {
		let target;
		let structureHitSpy: SinonSpy;

		beforeEach(() => {
			structureHitSpy = spy();
			target = {
				structureHit: structureHitSpy,
			};
		});

		it('should hit the structure on the target', () => {
			const event = {
				target,
				damage: 2,
			};

			weapon.attackStructure(<any>event);

			assert.calledOnce(structureHitSpy);
			assert.calledWith(structureHitSpy, event);
		});
	});
});
