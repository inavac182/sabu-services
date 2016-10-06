/*jshint esversion: 6, node: true */
/*global require, module */
'use strict';
const mongoose = require('mongoose');

class DataBase{
	constructor(env) {
		if (env === 'production') {
			this.usr = 'db_test';
			this.pwd = 'db_test_pass';
			this.server = 'ds041506.mlab.com';
			this.port = '41506';
			this.db = 'heroku_wpdnwb5k';
		} else {
			this.usr = 'sabu_usr';
			this.pwd = 'sabu_pwd';
			this.server = 'localhost';
			this.port = '27017';
			this.db = 'sabu';
		}
	}

	openConnection() {
		if (mongoose.connection.readyState === 0) {
      		mongoose.connect('mongodb://' + this.usr + ':' + this.pwd + '@' + this.server + ':' + this.port + '/' + this.db, function(err) {
        		if (err) {
        			console.log('Error connecting to DB...', err);
        		} else {
          			console.log('DB connection open');
        		}
      		});
    	}
	}

	closeConnection() {
		mongoose.connection.close();
    	console.log('DB connection closed');
	}
}

module.exports = DataBase;