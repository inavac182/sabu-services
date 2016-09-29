/*jshint esversion: 6, node: true */
/*global require, module */
'use strict';

const 	mongoose = require('mongoose'),
  		Schema = mongoose.Schema;

let userSchema = new Schema({
	name: String,
	username: { 
		type: String, 
		required: true, 
		unique: true 
	},
	password: { 
		type: String, 
		required: true 
	},
	plan: Boolean,
	created_date: Date
});

mongoose.connect('mongodb://db_test:db_test_pass@ds041506.mlab.com:41506/heroku_wpdnwb5k');
let UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;