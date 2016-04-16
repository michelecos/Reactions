# A bare minimum Webpack and Babel configuration supporting React and ES6

This is a project I have could not find elsewhere, so I created it myself.

It is a starter kit for Reactjs and Webpack supporting ES.

It is different because it is not a very opinionated, fully accessorized compilation chain, built support a web project as it grows, with all the features one might need in the future, like testing, modularization and whatnot.

This project is the exact opposite: it has the minimum of features, the shortest configuration files, the least dependencies, that will allow one to compile Reactjs code and support ES6 syntax.

You are quite likely to build upon it and add features, rather than deleting stuff you want to do an other way. Of course, Webpack is included, supposing it is a long term choice. If you are unsure it you want to use, for example, browserify, you will have to remove something and change config files.

Installation is done with the command

	npm install 

After installation, you can edit files inside the `src` directory.

The application entry point is `main.js`. Compilation starts with

	webpack

All the compiled sources will be aggregated in a main.js in the www directory, with a source map for convenience, ready for shipping. Your original sources are left outside and will not be part of distribution.
Everything outside the www directory need not be distributed.

# Installation log

## Webpack

I followed [Pete Hunt's instructions on Github][1], in particular

* npm init
* npm install webpack
* npm install babel-loader babel-core
* npm install babel-preset-es2015 babel-preset-react -S --save-dev
* npm install react react-dom

Look at `package.json` for dependencies.

I created a Webpack config based on [James Nelson's instruction to configure Webpack in 26 lines of code][2] trying to reduce line count as much as possibile and making slight changes.

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

With these setting, sources will be in the `src` directory, and compilation output will end in `www`, where should go everything that needs to be installed on the server or in the app, like css and graphics.

[1]: https://github.com/petehunt/webpack-howto
[2]: http://jamesknelson.com/webpack-made-simple-build-es6-less-with-autorefresh-in-26-lines/

