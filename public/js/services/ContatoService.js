angular.module('aztrip').factory('Contato',
	function($resource) {
		return $resource('/contatos/:id');
	});