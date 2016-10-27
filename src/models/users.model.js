/*jshint esversion: 6, node: true */
/*global require, module */
'use strict';

const mongoose = require('mongoose'),
	  Schema = mongoose.Schema,
	  Validators = require('../helpers/validators.helper.js'),
	  Errors = require('../helpers/errors.helper.js'),
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
				plan: {
					type: Number,
					required: true
				},
				user_active: Boolean,
				created_date: Date
			}),
	  UserModel = mongoose.model('User', userSchema),
	  env = process.env.NODE_ENV || 'dev',
	  errors = new Errors(env),
	  validators = new Validators();

class Users extends UserModel{

	add(callback) {
	    super.save(callback);
	}

}

Users.create = (data, callback) => {
	if (!data.name) {
		return callback({ message: errors.getMessage(4006), errorCode: 4006},'');
	}

	if (!data.username) {
		return callback({ message: errors.getMessage(4001), errorCode: 4001},'');
	}

	if (!data.email) {
		return callback({ message: errors.getMessage(4003), errorCode: 4003 }, '');
	} else if (!validators.validateEmail(data.email)) {
		return callback({ message: errors.getMessage(4004), errorCode: 4004 }, '');
	}

	if (!data.password) {
		return callback({ message: errors.getMessage(4007), errorCode: 4007},'');
	}

	let query = { username: data.username};

	UserModel.find(query, (err, user) => {
		if (user.length > 0){
			return callback({ message: errors.getMessage(4002), errorCode: 4002 }, '');
		} else {
			
			let query = { email: data.email };

			UserModel.find(query, (err, user) => {
				if (user.length > 0){
					return callback({ message: errors.getMessage(4005), errorCode: 4005 }, '');
				} else {
					
					let user = new Users({
				    	'name': data.name,
				    	'username': data.username,
				    	'email': data.email,
				    	'password': data.password,
				    	'plan': 0,
				    	'created_date': new Date(),
				    	'user_active': true
				    });

					user.add( (err, user, affected) => {
						if (err) {
							return callback(err, '');
					    } else {
					    	return callback('', { idUser: user._id, message: 'User created' });
				    	}
					});
				}
			});				
		}
	});
};


Users.get = (req, callback) => {
	let query = req.get('query'),
		dateStart,
		dateEnd;

	if (req.get('dateStart') && req.get('dateStart')) {

            if (Date.Parse(query.dateStart)) {
                dateStart = new Date(query.dateStart);
            } else   {
                return callback({ message: errors.getMessage(40010), errorCode: 40010}, '');
            }

            if (Date.Parse(query.dateEnd)) {
                dateEnd = new Date(query.dateEnd);
            } else {
                return callback({ message: errors.getMessage(40011), errorCode: 40011}, '');
            }
            
            if (typeof query === 'undefined') {
                query = { dateStart : dateStart, dateEnd : dateEnd};
            } else {
            	try {
				    query = JSON.parse(query);
                	query.dateStart = dateStart;
                	query.dateEnd = dateEnd;
				}
				catch(e) {
					return callback({ message: errors.getMessage(4008), errorCode: 4008}, '');   
				}
        	}
        }

        if (typeof query === 'undefined') {
            return callback({ message: errors.getMessage(4009), errorCode: 4009 }, '');
        }

		try {
		   query = JSON.parse(query);
		}
		catch(e) {
			return callback({ message: errors.getMessage(4008), errorCode: 4008}, '');   
		}

	query.user_active = true;
	console.log(query);

	UserModel.find(query, '_id name username email plan created_date user_active', (err, users) => {
		return callback('',users);
	});
};

Users.update = (id, data, callback) => {

	if (!id) {
		return callback({ message: errors.getMessage(40013), errorCode : 40013}, '', 0);
	}

    if (!validators.validateId(id)) {
        return callback({ message: errors.getMessage(40015), errorCode: 40015}, '');
    } else {

		if (!data || validators.isEmptyObject(data)) {
			return callback({ message: errors.getMessage(40014), errorCode: 40014}, '', 0);
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
					.catch((err) => { throw new Error(err); });
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
			if (err.message === 'Error: 4002') {
                return callback({ message: errors.getMessage(4002), errorCode: 4002}, '', '');   
            }

            if (err.message === 'Error: 4005') {
                return callback({ message: errors.getMessage(4005), errorCode: 4005}, '', '');   
            }

            if (err.message === 'Error: 40012') {
                return callback({ message: errors.getMessage(40012), errorCode: 40012}, '', '');   
            }

            if (err.message === 'Error: 4004') {
                return callback({ message: errors.getMessage(4004), errorCode: 4004}, '', '');   
            }

            return callback({ message: errors.getMessage(401), errorCode: 401 }, '', '');   
		};

		let saveChanges = (user) => {
			return user.save(function(err, user, affected) {
	            if (err) {
	            	throw new Error(err);
	            }
	            return callback('', user, affected);
	        });
		};

		let findUser = UserModel.findById(id).exec();
			
		findUser.then(checkCommonData)
		.then(checkUsername)
		.then(checkEmail)
		.then(saveChanges)
		.catch(errorFound);
	}
};

Users.getById = (id, callback) => {

	if (!validators.validateId(id)) {
            return callback({ message: errors.getMessage(40015), errorCode: 40015}, '');
        } else {
            UserModel.findById(id, '_id name username email plan created_date user_active', function(err, user) {
	            if (err)
	                return callback(err, '');
	            
	            if (user && user.toObject()) {
	                return callback('', user);
	            } else {
	            	return callback({ message: errors.getMessage(40012), errorCode: 40012 }, '');
	            }
            });
        }
};

Users.delete = (id, callback) => {
	if (validators.validateId(id)) {
            UserModel.findById(id, (err, user) => {
                if (user){
                    UserModel.remove({ _id: id }, (err) => {
                    	if (err) {
                    		return callback(err, null);
                    	}

                    	return callback(null, 'User is removed');
                    });
                } else {
                    return callback({ message: errors.getMessage(40018), errorCode:  40018}, '');
                }

            });
        } else {
            return callback({ message: errors.getMessage(40015), errorCode: 40015}, '');
        }
};

module.exports = Users;
