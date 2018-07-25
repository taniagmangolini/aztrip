// public/js/main.js
angular.module('aztrip', ['ngRoute','ngResource', 'google.places','ngMap'])

.config(['$provide', '$routeProvider', '$httpProvider', function($provide, $routeProvider, $httpProvider) {


	$provide.factory('meuInterceptor', ['$q','$location', function($q, $location){ 
		var meuInterceptor = {
			responseError: function(resposta) {
				
				if (resposta.status == 401) {
					$location.path('/auth');
				}
				return $q.reject(resposta);
			}
		};
		return meuInterceptor;
	}]);

	$httpProvider.interceptors.push('meuInterceptor');

	$routeProvider.when('/contatos', {
		templateUrl: 'partials/contatos.html',
		controller: 'ContatosController'
	});

	$routeProvider.when('/contato/:contatoId', {
		templateUrl: 'partials/contato.html',
		controller: 'ContatoController'
	});

	$routeProvider.when('/contato', {
		templateUrl: 'partials/contato.html',
		controller: 'ContatoController'
	});

	$routeProvider.when('/auth', {
		templateUrl: 'partials/auth.html'
	});

	$routeProvider.when('/home', {
		templateUrl: 'partials/home.html',
		controller: 'HomeController'
	});

	$routeProvider.when('/contribuicao', {
		templateUrl: 'partials/contribuicao.html',
		controller: 'ContribuicaoController'
	});

	$routeProvider.when('/contribuicao/:contribuicaoId', {
		templateUrl: 'partials/contribuicao.html',
		controller: 'ContribuicaoController'
	});

	//rota padrao
	$routeProvider.otherwise({redirectTo: '/home'});
}]);