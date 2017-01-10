var v = require('../../vtr');
var err = require('../../err');

describe('Vector prototype', function() {
	it('creates a vector [1, 2] with the many-argument api', function(){
		var a = 1,
			b = 2;
		expect(v(a, b)).toEqual([a, b]);
	});

	it('creates a vector [1, 2] with the list api', function(){
		var list = [1, 2];
		expect(v(list)).toEqual(list);
	});

	it('creates a vector [1, 0] with the many-argument api', function(){
		var a = 2;
		expect(v(a)).toEqual([a, 0]);
	});

	it('identifies a vector with "isVector"', function(){
		var list = [1, 2];
		expect(v.isVector(v(list))).toBe(true);
	});

	it('negatively identifies a nonvector with "isVector"', function(){
		var nonVector = [1, 2];
		expect(v.isVector(nonVector)).toBe(false);
	});

	it('copies a vector', function(){
		var vector = v([1, 2]);
		expect(v(vector)).toEqual(vector);
		expect(v(vector)).not.toBe(vector);
	});

	it('throws an exception when using ("badArgument") to create a vector with the many-argument api', function(){
		var badArgument = 'badArgument';

		expect(function(){
			v(badArgument);
		}).toThrow(err.nonValidArgumentForCreationError(badArgument));
	});

	it('throws an exception when using (["badArgument"]) to create a vector with the list api', function(){
		var badArgument = ['badArgument'];

		expect(function(){
			v(badArgument);
		}).toThrow(err.nonValidArgumentForCreationError(badArgument));
	});

});
