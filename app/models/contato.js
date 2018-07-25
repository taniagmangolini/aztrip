var mongoose = require('mongoose');

//modelo de um objeto
module.exports = function() {
	var schema = mongoose.Schema({
		nome: {
			type: String,
			required: true
		}

	});

	return mongoose.model('Contato', schema);
};