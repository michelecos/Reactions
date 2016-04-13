# Log di installazione

## Webpack

Ho seguito le [istruzioni di Pete Hunt su Github][1], in particolare

* npm init
* npm install webpack
* npm install babel-loader coffee-loader
* npm install babel-core babel-preset-es2015 babel-preset-react
* npm install babel-core
* npm install babel-preset-es2015 --save-dev
* npm install react react-dom
* npm install babel-preset-react

Quindi ho creato un webpack config seguendo le [istruzioni di James Nelson][2] per stare entro le 26 righe di configurazione, con qualche piccola modifica.

	// webpack.config.js

	var path = require('path');
	var webpack = require('webpack');

	module.exports = {
	    entry: [
	        //'babel-polyfill',
	        './src/main'
	    ],
	    output: {
	        path: './www',
	        publicPath: '/',
	        filename: 'main.js'
	    },
	    devtool: 'source-map',
	    module: {
	        loaders: [{
	            test: /\.js$/,
	            include: path.join(__dirname, 'src'),
	            loader: 'babel-loader',
	            query: {
	                presets: ["es2015"],
	            }
	        }]
	    },
	    debug: true
	};

Con questa configurazione, ho i sorgenti in src, mentre l'output del progetto è nella directory www, che contiene ciò che deve essere distribuito.


[1]: https://github.com/petehunt/webpack-howto
[2]: http://jamesknelson.com/webpack-made-simple-build-es6-less-with-autorefresh-in-26-lines/

