angular.module('aztrip').controller('ContribuicaoController',
	function($scope, $routeParams, Contribuicao) {


		if($routeParams.contribuicaoId) {

			console.log($routeParams.contribuicaoId);

			Contribuicao.get({id: $routeParams.contribuicaoId},
				function(contribuicao) {
					$scope.contribuicao = contribuicao;
				},
				function(erro) {
					$scope.mensagem = {
						texto: 'Não foi possível obter a contribuicao.'
					};
					console.log(erro);
				}
				);
		} else {
			$scope.contribuicao = new Contribuicao();
		}

		$scope.salva = function() {

			//obtendo local, latitude e longitude
			var local = "";
			var latitude = "";
			var longitude = "";

			if($scope.contribuicao.localCompleto !== undefined){

				if($scope.contribuicao.localCompleto.formatted_address !== undefined){
					local = $scope.contribuicao.localCompleto.formatted_address;
				}

				if($scope.contribuicao.localCompleto.geometry !== undefined &&
					$scope.contribuicao.localCompleto.geometry.location !== undefined )
				{   

					console.log("========> coordenadas " + $scope.contribuicao.localCompleto.geometry.location);
					latitude = $scope.contribuicao.localCompleto.geometry.location.lat();
					longitude = $scope.contribuicao.localCompleto.geometry.location.lng();
				}

				$scope.contribuicao.local = local;
				$scope.contribuicao.latitude = latitude;
				$scope.contribuicao.longitude = longitude;
			}

			console.log("========> contribuicao.local " + $scope.contribuicao.local);

			console.log("========> contribuicao.latitude " + $scope.contribuicao.latitude);

			console.log("========> contribuicao.longitude " + $scope.contribuicao.longitude);

			$scope.contribuicao.$save()
			.then(function() {
				$scope.mensagem = {texto: 'Salvo com sucesso'};
				// limpa o formulário
				$scope.contribuicao = new Contribuicao();
			})
			.catch(function(erro) {
				$scope.mensagem = {texto: 'Não foi possível salvar'};
			});
		};

		Contribuicao.query(function(contribuicoes) {
			$scope.contribuicoes = contribuicoes;
		});

	});