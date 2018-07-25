// app/routes/contato.js

var verificaAutenticacao = require('../../config/auth');

module.exports = function(app) {

	var controller = app.controllers.contato;

	/*app.get('/contatos', controller.listaContatos);
	app.get('/contatos/:id', controller.obtemContato);
	app.delete('/contatos/:id', controller.removeContato);*/


	//usando um mesmo identificador para diferentes acoes
	app.route('/contatos')
	.get(verificaAutenticacao, controller.listaContatos)
	.post(verificaAutenticacao, controller.salvaContato);

	app.route('/contatos/:id')
	.get(verificaAutenticacao, controller.obtemContato)
	.delete(verificaAutenticacao, controller.removeContato);

};