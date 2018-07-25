module.exports = function(app) {
	app.get('/', function(req, res) {
		var usuarioLogado = "";
		var fotoUsuarioLogado = "";
		var logout =  "";

		if( req.user){
			usuarioLogado = req.user.nome;
			fotoUsuarioLogado = req.user.foto;
			logout =  "Logout";
		}
		res.render('index', { "usuarioLogado" : usuarioLogado, 
			"fotoUsuarioLogado" : fotoUsuarioLogado,
			"logout" : logout});
	});
};