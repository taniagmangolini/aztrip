angular.module('aztrip').factory('Contribuicao',
	function($resource) {
		var url = '/contribuicoes/:id';
		return $resource(url, null, {
			'removerContribuicao' : {
				method : 'DELETE',
				isArray : false,
				params: {
					id:"@id"
				}
			}
		});
	});