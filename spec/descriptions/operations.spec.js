var v = require('../../vtr');
var err = require('../../err');

describe('Vector addition', function() {
	it('adds two vectors using vector API', function(){
		var a = 1,
			b = 6,
			c = 3,
			d = 8;

		expect(v(a, b).add(v(c, d))).toEqual([a + c, b + d]);
	});

	it('adds two vectors using many-argument API', function(){
		var a = 1,
			b = 6,
			c = 3,
			d = 8;

		expect(v(a, b).add(c, d)).toEqual([a + c, b + d]);
	});

	it('throws a Non Valid Argument error', function(){
		var badArgument = 'badArgument';

		expect(function(){
			v(1, 2).add(badArgument);
		}).toThrow(err.nonValidArgumentForCreationError(badArgument));
	});
});


describe('Vector substraction', function() {
	it('substracts two vectors', function() {
		var a = 1,
			b = 6,
			c = 3,
			d = 8;

		expect(v(a, b).sub(v(c, d))).toEqual([a - c, b - d]);
	});

	it('throws a Non Valid Argument error', function(){
		var badArgument = 'badArgument';

		expect(function(){
			v(1, 2).sub(badArgument);
		}).toThrow(err.nonValidArgumentForCreationError(badArgument));
	});
});

describe('Vector scalar product/division', function() {
	it('multiplies a vectors by a scalar', function(){
		var a = 1,
			b = 6,
			s = 8;

		expect(v(a, b).prod(s)).toEqual([a * s, b * s]);
	});

	it('divides a vectors by a scalar', function(){
		var a = 1,
			b = 6,
			s = 8;

		expect(v(a, b).div(s)).toEqual([a / s, b / s]);
	});

	it('throws a non valid argument error in multiplication', function(){
		var a = 1,
			b = 6,
			badArgument = 'badArgument';

		expect(function() {
			v(a, b).prod(badArgument);
		}).toThrow(err.nonValidArgumentForProdError(badArgument));
	});

	it('throws a non valid argument error in division', function(){
		var a = 1,
			b = 6,
			badArgument = 'badArgument';

		expect(function() {
			v(a, b).div(badArgument);
		}).toThrow(err.nonValidArgumentForDivError(badArgument));
	});
});

describe('Vector module', function() {
	it('returns the module of a vector', function(){
		var a = 2,
			b = 6;

		expect(v(a, b).module()).toBe(Math.sqrt(a * a + b * b));
	});
});

describe('Vector angle', function() {
	it('returns the angle between two vectors', function(){
		var a = 5,
			b = a,
			c = a,
			d = -a,
			angle = v(a, b).angle(v(c, d));

		expect(angle * 180 / Math.PI).toBe(90);
	});

	it('returns the "argument" of one vector', function(){
		var a = v(0, 4);

		expect(a.angle()).toBe(Math.PI / 2);
	});

	it('throws an exception as one vector is null', function(){
		var a = 2,
			b = 6,
			c = 0,
			d = 0;

		expect(function() {
			v(a, b).angle(c, d)
		}).toThrow(err.nullVectorForAngleError());
	});
});

describe('Vector dot product', function() {
	it('returns dot product of two vectors', function(){
		var a = v(3, 7),
			b = v(5, -3),
			angle = a.angle(b);

		expect(a.dot(b)).toBe(a.module() * b.module() * Math.cos(a.angle(b)));
	});
});

describe('Vector unity', function() {
	it('returns the unit vector', function(){
		var a = 7;

		expect(v(a, 0).unit()).toEqual([1, 0]);
	});
});

describe('Vector rotation', function() {
	it('returns the rotated vector', function(){
		var a = 7,
			b = 7;

		expect(v(a, b).rotate(Math.PI / 2)).toEqual([-b, a]);
	});
});

describe('Vector projection', function() {
	it('returns projected vector', function(){
		var a = 7,
			b = 3,
			p = v(a, b).projection(v(-b, a));

		expect(p[0]).toBeGreaterThan(-0.0001);
		expect(p[0]).toBeLessThan(0.0001);
		expect(p[1]).toBeGreaterThan(-0.0001);
		expect(p[1]).toBeLessThan(0.0001);
	});
});
