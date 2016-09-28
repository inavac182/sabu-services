module.exports = {
	entry: './src/app.es6',
	output: {
		path: __dirname,
		filename: 'build/bundle.js'
	},
	module: {
		preLoaders: [{
        	test: [/\.js$/,/\.es6$/],
        	exclude: /node_modules/,
        	loader: 'jshint-loader'
      	}],
		loaders: [{
			test: [/\.js$/,/\.es6$/],
			exclude: /node_modules/,
			loader: 'babel',
			query: {
				cacheDirectory: true,
				presets: ['es2015',  'stage-0','react']
			}
		}]
	},
	resolve: {
		extensions: ['', '.js', '.es6']
 	}
};