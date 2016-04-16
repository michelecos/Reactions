# A bare minimum Webpack and Babel configuration

This is a project I have been looking for elsewhere: not a very opinionated fully accessorized compilation chain to create a web project mixing in all you might need in the future. This is the exact opposite: it is the minimum configuration with the shortest configuration files and dependencies, that will make possibile to create a Reactjs project using ES6 syntax and a build system based on Webpack.

Sources should go into src and the entry pont should be in main.js. With these settings, typing

	webpack

A single compiled file named main.js, along with a source map, will appear in the www directory, ready for shipping. Everything outside the www directory need not be distributed.

# Installation log

## Webpack

I followed [Pete Hunt's instructions on Github][1], in particular

* npm init
* npm install webpack
* npm install babel-loader coffee-loader
* npm install babel-core babel-preset-es2015 babel-preset-react
* npm install babel-core
* npm install babel-preset-es2015 --save-dev
* npm install react react-dom
* npm install babel-preset-react

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

