// config/express.js
var express = require('express');

var load = require('express-load');

var bodyParser = require('body-parser');

//modulos para uso do Passaport

var cookieParser = require('cookie-parser');

var session = require('express-session');

var passport = require('passport');

var helmet = require('helmet');

//var home = require('../app/routes/home');

module.exports = function() {
	var app = express();

	//configuracoes do express

	app.disable('x-powered-by');

	app.use(helmet.hidePoweredBy({ setTo: 'PHP 5.5.14' }));

	app.use(helmet.xframe());

	app.use(helmet.xssFilter());

	app.use(helmet.nosniff());

	// variável de ambiente
	app.set('port', 3000);

	// middleware
	app.use(express.static('./public'));

	app.use(bodyParser.urlencoded({extended: true}));

	app.use(bodyParser.json());

	app.use(require('method-override')());

	app.set('views','./app/views');

	app.set('view engine', 'ejs');

	app.use(cookieParser());

	app.use(session(
		{ secret: 's1r1guel4',
		resave: true,
		saveUninitialized: true
	}
	));

	app.use(passport.initialize());

	app.use(passport.session());

    //home(app);

	//carrega models, controllers e routes automaticamente, nesta ordem
	load('models', {cwd: 'app'}) //indica o diretorio a partir do qual serao carregados
	.then('controllers')
	.then('routes/auth.js')
	.then('routes')
	.into(app);

	//se nenhuma rota atender, direciona para 404
	app.get('*', function(req, res) {
		res.status(404).render('404');
	});

	return app;

};