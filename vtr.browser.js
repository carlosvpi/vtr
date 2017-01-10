require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var err = {};

err.nonValidArgumentError = function(op, argument) {
	return '"' + argument + '" is not a valid argument for the operation "' + op + '"';
}

err.nonValidArgumentForProdError = err.nonValidArgumentError.bind(null, 'product');
err.nonValidArgumentForDivError = err.nonValidArgumentError.bind(null, 'division');
err.nonValidArgumentForCreationError = err.nonValidArgumentError.bind(null, 'creation');

err.nullVectorError = function(op) {
	return 'Null vector; impossible to compute "' + op + '" it forms with another vector';
}

err.nullVectorForAngleError = err.nonValidArgumentError.bind(null, 'angle');
err.nullVectorForProjectionError = err.nonValidArgumentError.bind(null, 'projection');
err.nullVectorForRejectionError = err.nonValidArgumentError.bind(null, 'rejection');

err.tooManyArgumentsError = function(op, collection) {
	return '"' + collection.length + '" are too many arguments for the operation "' + op + '"';
}

err.tooManyArgumentsForCreationError = err.tooManyArgumentsError.bind(null, 'creation');

module.exports = err;

},{}],"vtr":[function(require,module,exports){
var err = require('./err');

var prototype = {},
	d = 2;

prototype.add = function(sth) {
	if (!v.isVector(sth)) {
		sth = v.apply({}, arguments);
	}
	var result = [];
	for (var i = 0; i < d; i++) {
		result.push(this[i] + sth[i]);
	}
	return v(result);
};

prototype.sub = function(sth) {
	if (!v.isVector(sth)) {
		sth = v.apply({}, arguments);
	}
	var result = [];
	for (var i = 0; i < d; i++) {
		result.push(this[i] - sth[i]);
	}
	return v(result);
};

prototype.prod = function(sth) {
	if (Number.isFinite(sth)) {
		var result = [];
		for (var i = 0; i < d; i++) {
			result.push(this[i] * sth);
		}
		return v(result);
	} else {
		throw err.nonValidArgumentForProdError(sth);
	}
};

prototype.div = function(sth) {
	if (Number.isFinite(sth)) {
		var result = [];
		for (var i = 0; i < d; i++) {
			result.push(this[i] / sth);
		}
		return v(result);
	} else {
		throw err.nonValidArgumentForDivError(sth);
	}
};

prototype.module = function() {
	var result = 0;
	for (var i = 0; i < d; i++) {
		result += this[i] * this[i];
	}
	return Math.sqrt(result);
}

prototype.angle = function(sth) {
    var thisModule = this.module(),
        sthModule;
    if (sth === undefined) {
    	sth = v(1, 0);
    } else if (!v.isVector(sth)) {
    	sth = v(sth);
    	// sth = v.apply({}, arguments);
    }
    sthModule = sth.module();
    if (thisModule == 0 || sthModule == 0) {
    	throw err.nullVectorForAngleError();
    }
    return Math.acos((this[0] * sth[0] + this[1] * sth[1]) / (thisModule * sthModule));
}

prototype.unit = function() {
    return this.prod(1 / this.module());
};

prototype.dot = function(sth) {
	if (!v.isVector(sth)) {
		sth = v.apply({}, arguments);
	}
    return this.module() * sth.module() * Math.cos(this.angle(sth));
};

prototype.rotate = function(angle) {
    return v(this[0] * Math.cos(angle) - this[1] * Math.sin(angle), this[0] * Math.sin(angle) + this[1] * Math.cos(angle));
};

prototype.projection = function(sth) {
	if (!v.isVector(sth)) {
		sth = v.apply({}, arguments);
	}
    if(sth.module() === 0) throw err.nullVectorForProjectionError();
    return sth.unit().prod(this.module() * Math.cos(this.angle(sth)));
};

prototype.rejection = function(sth) {
	if (!v.isVector(sth)) {
		sth = v.apply({}, arguments);
	}
    if(sth.module() === 0) throw err.nullVectorForRejectionError();
    return this.sub(this.projection(sth));
};

prototype.toArray = function() {
	var result = [];
	for (var i = 0; i < this.length; i++) {
		result.push(this[i]);
	}
	return result;
};

var v = function(arg) {
	var vector = [],
		collection = Array.isArray(arg) ? arg : arguments,
		i = 0;

	if (v.isVector(arg)) {
		return v(arg.toArray());
	}
	if (collection.length > d) {
		throw err.tooManyArgumentsForCreationError(collection);
	}
	for (i = 0; i < collection.length; i++) {
		if (!Number.isFinite(collection[i])) {
			throw err.nonValidArgumentForCreationError(arg);
		}
		vector.push(collection[i]);
	}
	for (; i < d; i++) {
		vector.push(0);
	}
	vector.__proto__ = prototype;
	return vector;
};

v.__proto__.isVector = function (sth) {
	try {
		return sth.__proto__ === prototype;
	} catch(e) {
		return false;
	}
};

module.exports = v;
},{"./err":1}]},{},[]);
