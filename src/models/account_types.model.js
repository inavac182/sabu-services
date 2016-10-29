/*jshint esversion: 6, node: true */
/*global require, module */
'use strict';

const mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Validators = require('../helpers/validators.helper.js'),
	Errors = require('../helpers/errors.helper.js'),
	account_typeSchema = new Schema({
		name: {
				type: String,
				required: true
			}
		}),
	Account_typeModel = mongoose.model('Account_types', account_typeSchema),
	env = process.env.NODE_ENV || 'dev',
	errors = new Errors(env),
	validators = new Validators();

class Account_types extends Account_typeModel{
	add(callback) {
	    super.save(callback);
	}
}

Account_types.create = (data, callback) => {

	if (!data.name) {
		return callback({ message: errors.getMessage(4009), errorCode: 4009},'');
	}

	let account_type = new Account_types({
		'name': data.name
	});

	 account_type.add((err, account, affected) => {
		if (err) {
			return callback(err, '');
		} else {
			return callback('', {idAccount_type:  account_type._id, message: 'Account type created'});
		}
	});
};

Account_types.get = (req, callback) => {
	Account_typeModel.find('_id name', (err, account_types) => {
		if(err) {
			return callback(err, '');
		} else {
			return callback('', account_types);
		}
	});
};

Account_types.update = (id, data, callback) => {
	if (!id) {
		return callback({ message: errors.getMessage(40013), errorCode : 40013}, '', 0);
	}

    if (!validators.validateId(id)) {
        return callback({ message: errors.getMessage(40015), errorCode: 40015}, '');
    } else {

		if (!data || validators.isEmptyObject(data)) {
			return callback({ message: errors.getMessage(40014), errorCode: 40014}, '', 0);
		}

		if (!data.name) {
			return callback({ message: errors.getMessage(4006), errorCode: 4006}, '', 0);
		}
		
		Account_typeModel.find({ name: data.name }, (err, account_type_found) => {
			if (err) {
				return callback(err, '', '');
			} else {
				if (account_type_found.length > 0) {
					return callback({ message: errors.getMessage(40024), errorCode: 40024 }, '');
				} else {
					console.log(id);
					Account_typeModel.findById(id, (account_type) => {
						console.log('Account type: ', account_type);
						if (account_type && account_type.length > 0) {
							account_type.name = data.name;

							account_type.save((err, account, affected) => {
								if (err) {
									return callback(err, '');
								} else {
									if (affected > 0){
										return callback('', { message: 'Account type is modified'});
									} else {
										return callback({ message: errors.getMessage(40026), errorCode: 40026 }, '');
									}
								}
							});
						} else {
							return callback({ message: errors.getMessage(40025), errorCode: 40025 }, '');
						}
					});
				}
			}
		});
	}
};

Account_types.getById = (id, callback) => {

	if (!validators.validateId(id)) {
            return callback({ message: errors.getMessage(40015), errorCode: 40015}, '');
        } else {
            Account_typeModel.findById(id, '_id name', function(err, account_type) {
	            if (err)
	                return callback(err, '');
	            
	            if (account_type && account_type.toObject()) {
	                return callback('', account_type);
	            } else {
	            	return callback({ message: errors.getMessage(40025), errorCode: 40025 }, '');
	            }
            });
        }
};

module.exports = Account_types;

