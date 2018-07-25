// app/models/contato.js

//Model é um objeto que corresponde a uma collection do banco

var mongoose = require('mongoose');

//modelo de um objeto
module.exports = function() {
	var schema = mongoose.Schema({
		local: {
			type: String,
			required: true
		},
		latitude: {
			type: String,
			required: true,
		},
		longitude: {
			type: String,
			required: true,
		},
		inclusao: {
			type: Date,
			default: Date.now
		}

	});

	return mongoose.model('Contribuicao', schema);
};