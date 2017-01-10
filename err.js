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
