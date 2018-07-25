// app/routes/contato.js

var verificaAutenticacao = require('../../config/auth');

module.exports = function(app) {
	var controller = app.controllers.contribuicao;

	app.route('/contribuicoes')
	.get(verificaAutenticacao, controller.listaContribuicoes)
	.post(verificaAutenticacao, controller.salvaContribuicao);

	app.route('/contribuicoes/:id')
	.get(verificaAutenticacao, controller.obtemContribuicao)
	.delete(verificaAutenticacao, controller.removeContribuicao);

};