var sanitize = require('mongo-sanitize');

module.exports = function (app) {

	var Contribuicao = app.models.Contribuicao;

	var controller = {};

	controller.listaContribuicoes= function(req, res) {
		Contribuicao.find().exec()
		.then(
			function(contribuicoes) {
				res.json(contribuicoes);
			},
			function(erro) {
				console.error(erro);
				res.status(500).json(erro);
			}
			);
	};

	controller.obtemContribuicao = function(req, res) {
		var _id = req.params.id;
		Contribuicao.findById(_id).exec()
		.then(
			function(contribuicao) {
				if (!contribuicao) throw new Error("Contribuicao não encontrada");
				res.json(contribuicao);
			},
			function(erro) {
				console.log(erro);
				res.status(404).json(erro);
			}
			);
	};

	controller.removeContribuicao= function(req, res) {
		var _id = sanitize(req.params.id);
		console.log("===>ID " + req.params.id );
		Contribuicao.remove({"_id" : _id}).exec()
		.then(
			function() {
				res.end();
			},
			function(erro) {
				return console.error(erro);
			}
			);
	};


	controller.salvaContribuicao = function(req, res) {

		var _id = req.body._id;

		var dados = {
			"local" : req.body.local,
			"latitude" : req.body.latitude,
			"longitude" : req.body.longitude,
		};

		console.log("==>Dados:" + req.body.local);
		console.log("==>Dados:" + req.body.latitude);
		console.log("==>Dados:" + req.body.longitude);

		if(_id) {
			Contribuicao.findByIdAndUpdate(_id, dados).exec()
			.then(
				function(Contribuicao) {
					res.json(contribuicao);
				},
				function(erro) {
					console.error(erro);
					res.status(500).json(erro);
				}
				);
		} else {
			Contribuicao.create(dados)
			.then(
				function(contribuicao) {
					res.status(201).json(contribuicao);
				},
				function(erro) {
					console.log(erro);
					res.status(500).json(erro);
				}
				);
		}
	};

	return controller;
};

