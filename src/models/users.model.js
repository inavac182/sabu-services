/*jshint esversion: 6, node: true */
/*global require, module */
'use strict';

const mongoose = require('mongoose'),
	  Schema = mongoose.Schema,
	  Validators = require('../helpers/validators.helper.js'),
	  userSchema = new Schema({
				name: {
					type: String,
					required: true
				},
				username: { 
					type: String, 
					required: true, 
					unique: true 
				},
				email: {
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
			}),
	  UserModel = mongoose.model('User', userSchema),
	  validators = new Validators();

class Users extends UserModel{

	add(callback) {
	    return super.save(callback);
	}

	get() {

	}

	remove() {

	}
}

Users.validateNewUser = (data, callback) => {
	if (!data.name) {
		return callback({ message: 'Name is empty', errorCode: 4006},'');
	}

	if (!data.username) {
		return callback({ message: 'Username is empty', errorCode: 4001},'');
	}

	if (!data.email) {
		return callback({ message: 'Email is empty', errorCode: 4003 }, '');
	} else if (!validators.validateEmail(data.email)) {
		return callback({ message: 'Email is not correct', errorCode: 4004 }, '');
	}

	if (!data.password) {
		return callback({ message: 'Password is empty', errorCode: 4007},'');
	}

	let query = { username: data.username};

	UserModel.find(query, (err, user) => {
		if (user.length > 0){
			return callback({ message: 'Username is duplicated', errorCode: 4002 }, '');
		} else {
			let query = { email: data.email };
			UserModel.find(query, (err, user) => {
				if (user.length > 0){
					return callback({ message: 'Email is duplicated', errorCode: 4005 }, '');
				} else {
					return callback('','');
				}
			});				
		}
	});
};

module.exports = Users;
