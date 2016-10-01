/*jshint esversion: 6, node: true */
/*global require, module */
'use strict';
const mongoose = require('mongoose');

class DataBase{
	openConnection() {
		if (mongoose.connection.readyState === 0) {
      		mongoose.connect('mongodb://db_test:db_test_pass@ds041506.mlab.com:41506/heroku_wpdnwb5k', function(err) {
        		if (err) console.log('Error connecting to DB...', err);
          		console.log('DB connection open');
      		});
    	}
	}

	closeConnection() {
		mongoose.connection.close();
    	console.log('DB connection closed');
	}
}

module.exports = DataBase;