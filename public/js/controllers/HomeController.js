
angular.module('aztrip').controller('HomeController', function($scope, Contribuicao, NgMap) {

	$scope.contribuicoes = [];

	function buscaContribuicoes() {
		Contribuicao.query(
			function(contribuicoes) {
				$scope.contribuicoes = contribuicoes;
			},
			function(erro) {
				console.log("Não foi possível obter a lista de contribuicoes");
				console.log(erro);
			}
			);
	}
	
	$scope.remove = function(contribuicao) {
		console.log('===> delete contribuicao Id: ' + contribuicao._id );
		Contribuicao.removerContribuicao({id: contribuicao._id},
			buscaContribuicoes,
			function(erro) {
				console.log('Não foi possível remover a contribuição');
				console.log(erro);
				$scope.mensagem = {
					texto: 'Não foi possível remover a contribuição'
				};
			}
			);
	};

	buscaContribuicoes();
	
});