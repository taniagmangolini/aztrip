// config/passport.js
var passport = require('passport');

var FacebookStrategy = require('passport-facebook').Strategy;

var findOrCreate = require('mongoose-findorcreate');

var mongoose = require('mongoose');

module.exports = function() {
	
	var Usuario = mongoose.model('Usuario');

	passport.use(new FacebookStrategy({
		clientID: '1513032515387424',
		clientSecret: '4761fd9c022049a06ee95232bf791557',
		callbackURL: 'http://localhost:3000/auth/facebook/callback',
		profileFields: ["id", "displayName", "photos"],
	}, function(accessToken, refreshToken, profile, done) {

		var nome = profile.displayName;
		var id = profile.id;
		var photo = profile.photos !== undefined ? profile.photos[0].value : '';

		Usuario.findOrCreate(

			{ "login" : id}, 
			{ "nome" : nome, 
			"foto" : photo},

			function(erro, usuario) {

				if(erro) {
					console.log(' Erro passport!');
					return done(erro);
				} 

				return done(null, usuario);
			}
			);
	}));

	passport.serializeUser(function(usuario, done) {
		done(null, usuario._id);
	});

	passport.deserializeUser(function(id, done) {
		Usuario.findById(id).exec()
		.then(function(usuario) {
			done(null, usuario);	
		});
	});
};