// public/js/controllers/ContatosController.js
angular.module('aztrip').controller('ContatosController', function($scope, Contato) {

	$scope.filtro = '';
	$scope.contatos = [];
	$scope.mensagem = {texto: ''};

	function buscaContatos() {
		Contato.query(
			function(contatos) {
				$scope.contatos = contatos;
				$scope.mensagem = {};
			},
			function(erro) {
				console.log("Não foi possível obter a lista de contatos");
				console.log(erro);
				$scope.mensagem = {
					texto: 'Não foi possível obter a lista'
				};
			}
			);
	}
	
	buscaContatos();

	$scope.remove = function(contato) {
		Contato.delete({id: contato._id},
			buscaContatos,
			function(erro) {
				console.log('Não foi possível remover o contato');
				console.log(erro);
				$scope.mensagem = {
					texto: 'Não foi possível remover o contato'
				};
			}
			);
	};
	
});