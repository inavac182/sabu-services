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
	validators = new Validators(),
	Accounts = require('../models/accounts.model.js');

class Account_types extends Account_typeModel{
	add(callback) {
	    super.save(callback);
	}
}

Account_types.create = (data, callback) => {

	if (!data.name) {
		return callback({ message: errors.getMessage(4006), errorCode: 4006},'');
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
					Account_typeModel.findById(id, (err, account_type) => {
						if (account_type && account_type.toObject()) {
							account_type.name = data.name;

							account_type.save((err, account_type, affected) => {
								if (err) {
									return callback(err, '');
								} else {
									return callback('', account_type, affected);
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

Account_types.delete = (id, callback) => {
	if (validators.validateId(id)) {
        let checkIfExists = (account_type) => {
        	if (account_type && account_type._id !== '') {
        		return account_type;
        	} else {
        		throw new Error(40025);
        	}
        };

        let checkIfHaveAccounts = (account_type) => {
        	return Accounts.accountTypeUsed(id).exec()
	        	.then((account_type_used) => {
	        		if (account_type_used.length > 0) {
		    	 		throw new Error(40028);
		        	} else {
		        	 	return account_type;
		    		}
	        	}).catch((err) => { throw new Error(err);});
        };

        let deleteAccountType = (account_type) => {
        	account_type.remove((err) => {
        		if (err) {
        			console.log(401, err);
					throw new Error(401);
        		}

        		return callback(null, 'Account type is removed');
            });
        };

        let errorFound = (err) => {
        	if (err.message === '40025')
        		return callback({ message: errors.getMessage(40025), errorCode:  40025}, '');

        	if (err.message === '401')
        		return callback({ message: errors.getMessage(401), errorCode:  401}, '');

			if (err.message === 'Error: 40028')
        		return callback({ message: errors.getMessage(40028), errorCode:  40028}, '');
        };

        let findAccount_type = Account_types.findById(id).exec();

        findAccount_type.then(checkIfExists)
        .then(checkIfHaveAccounts)
        .then(deleteAccountType)
        .catch(errorFound);

    } else {
        return callback({ message: errors.getMessage(40015), errorCode: 40015}, '');
    }
};

module.exports = Account_types;
