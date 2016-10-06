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
	    super.save(callback);
	}

	remove(callback) {
		super.remove(callback);
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


Users.get = (query, callback) => {
	UserModel.find(query, '_id name username email plan created_date', (err, users) => {
		return callback('',users);
	});
};

Users.update = (id, data, callback) => {
	if (!id) {
		return callback({ message: 'ID is empty', errorCode : 40013}, '', 0);
	}

	if (!data || validators.isEmptyObject(data)) {
		return callback({ message: 'Data is empty', errorCode: 40014}, '', 0);
	}
	mongoose.Promise = global.Promise;
	
	let checkCommonData = (user) => {
		if (user) {

			if (data.name && data.name !== '')
        		user.name = data.name; 

    		if (data.plan && data.plan !== '')
        		user.plan = data.plan;

		} else {
			throw new Error(40012);
		}

		return user;
	};

	let checkUsername = (user) => {
		if (data.username && user.username !== data.username) {
			let query = { username:  data.username };

			return UserModel.find(query).exec()
			.then((userFound) => {
				if (userFound.length > 0) {
					user = null;
					throw new Error(4002);
				} else {
					user.username = data.username;
					return user;
				}

			})
			.catch((err) => {throw new Error(err); });
		}

		return user;
	};

	let checkEmail = (user) => {
		if (data.email && user.email !== data.email) {

			if (!validators.validateEmail(data.email)) {
				throw new Error(4004);
			}
			let query = { email:  data.email };

			return UserModel.find(query).exec()
			.then((userFound) => { 
				if (userFound.length > 0) {
					user = null;
					throw new Error(4005);
				} else {
					user.email = data.email;
					return user;
				}
			})
			.catch((err) => { throw new Error(err); });
		}

		return user;
	};

	let errorFound = (err) => {
		return callback(err);
	};

	let saveChanges = (user) => {
		return user.save(function(err, user, affected) {
            if (err) {
            	throw new Error(err);
            }
            return callback('', user, affected);
        });
	};

	let findById = UserModel.findById(id).exec();
		
		findById.then(checkCommonData)
		.then(checkUsername)
		.then(checkEmail)
		.then(saveChanges)
		.catch(errorFound);
};

module.exports = Users;
