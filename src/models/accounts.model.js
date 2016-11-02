/*jshint esversion: 6, node: true */
/*global require, module */
'use strict';

const mongoose = require('mongoose'),
	  Schema = mongoose.Schema,
	  Validators = require('../helpers/validators.helper.js'),
	  Errors = require('../helpers/errors.helper.js'),
	  ObjectId = Schema.ObjectId,
	  accountSchema = new Schema({
				idType: {
					type: ObjectId,
					required: true
				},
				idUser: {
					type: ObjectId,
					required: true
				},
				name: {
					type: String,
					required: true
				},
				balance: {
					type: Number,
					required: true
				},
				money_date: Date
			}),
	  AccountModel = mongoose.model('Accounts', accountSchema),
	  env = process.env.NODE_ENV || 'dev',
	  errors = new Errors(env),
	  validators = new Validators();

class Accounts extends AccountModel{
	add(callback) {
	    super.save(callback);
	}
}

Accounts.create = (data, callback) => {
	let today;

	if (!data.idType) {
		return callback({ message: errors.getMessage(40019), errorCode: 40019},'');
	}

	if (!validators.validateId(data.idType)) {
    	return callback({ message: errors.getMessage(40023), errorCode: 40023}, '');
    }

	if (!data.idUser) {
		return callback({ message: errors.getMessage(40022), errorCode: 40022},'');
	}

	if (!validators.validateId(data.idUser)) {
    	return callback({ message: errors.getMessage(40015), errorCode: 40015}, '');
    }

	if (!data.name) {
		return callback({ message: errors.getMessage(4006), errorCode: 4006},'');
	}

	if (!data.balance) {
		return callback({ message: errors.getMessage(40021), errorCode: 40021},'');
	}

	if (data.balance > 0){
		today = new Date();
	}

	let account = new Accounts({
		'idType': data.idType,
		'idUser': data.idUser,
		'name': data.name,
		'balance': data.balance,
		'money_date': today
	});

	account.add((err, account, affected) => {
		if (err) {
			return callback(err, '');
		} else {
			return callback('', {idAccount: account._id, message: 'Account created'});
		}
	});
};

Accounts.get = (req, callback) => {
	let query = req.get('query');

	if (typeof query === 'undefined') {
        return callback({ message: errors.getMessage(40010), errorCode: 40010 }, '');
    }

	try {
	   query = JSON.parse(query);
	}
	catch(e) {
		return callback({ message: errors.getMessage(4008), errorCode: 4008}, '');
	}

	if (!query.idUser) {
		return callback({ message: errors.getMessage(40020), errorCode: 40020}, '');
    }

    if (!validators.validateId(query.idUser)) {
    	return callback({ message: errors.getMessage(40022), errorCode: 40022}, '');
    }

	AccountModel.find(query, '_id idType name balance money_date', (err, accounts) => {
		if (err) {
			return callback(err, '');
		} else {
			return callback('',accounts);
		}
	});
};

Accounts.update = (req, callback) => {
	
};

Accounts.remove = () => {

};

Accounts.accountTypeUsed = (idAccount_type) => {
	return AccountModel.find({ idType: idAccount_type}, '_id idType');
};

module.exports = Accounts;

