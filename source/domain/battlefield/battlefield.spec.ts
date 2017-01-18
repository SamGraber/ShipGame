import { expect } from 'chai';
import { Battlefield } from './battlefield';
import { ShipLocation } from './shipLocation';
import { Coordinate } from './coordinate';

describe('Battlefield', () => {
	let battlefield: Battlefield;

	beforeEach(() => {
		battlefield = new Battlefield();
	});

	describe('getVisibleShips', () => {
		it('should get all ships within 3 spaces', () => {
			const sourceShip = new ShipLocation(null, new Coordinate(1, 0));
			const visibleShip1 = new ShipLocation(null, new Coordinate(2, 0));
			const visibleShip2 = new ShipLocation(null, new Coordinate(4, 0));
			const outOfRangeShip = new ShipLocation(null, new Coordinate(5, 0));
			battlefield.ships = [sourceShip, visibleShip1, visibleShip2, outOfRangeShip];

			const result = battlefield.getVisibleShips(sourceShip);

			expect(result).to.deep.equal([visibleShip1, visibleShip2]);
		});
	});

	describe('getRange', () => {
		it('should get the absolute value of the distance between the x coordinates if the distance is greater than the y coordinates', () => {
			const sourceShip = new ShipLocation(null, new Coordinate(1, 0));
			const targetShip = new ShipLocation(null, new Coordinate(3, 0));

			expect(battlefield.getRange(sourceShip, targetShip)).to.equal(2);
		});

		it('should get the absolute value of the distance between the y coordinates if the distance is greater than the x coordinates', () => {
			const sourceShip = new ShipLocation(null, new Coordinate(0, 1));
			const targetShip = new ShipLocation(null, new Coordinate(0, 3));

			expect(battlefield.getRange(sourceShip, targetShip)).to.equal(2);
		});
	});
});
