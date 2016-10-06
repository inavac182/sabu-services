/*jshint esversion: 6, node: true */
/*global require, module */
'use strict';

const UserModel = require('../../src/models/users.model.js'),
	  mongoose = require('mongoose'),
      Validators = require('../../src/helpers/validators.helper.js'),
	  express = require('express'),
      validators = new Validators();

let usersRouter = express.Router();

usersRouter.route('/')
	.post((req, res) => {

	    UserModel.validateNewUser(req.body, (err, user) => {

	    	if (err) {
	    		res.status(400).json(err);
	    	} else {

				let user = new UserModel({
			    	'name': req.body.name,
			    	'username': req.body.username,
			    	'email': req.body.email,
			    	'password': req.body.password,
			    	'plan': 0,
			    	'created_date': new Date()
			    });

				user.add( (err, user, affected) => {
					if (err) {
						res.status(400).send(err);
				    } else {
				    	res.status(200).json({ idUser: user._id, message: 'User created' });	
			    	}
				});
            }
	    });
		
	}).get((req, res) => {
        let query = req.get('query'),
            dateStart,
            dateEnd;

        if (req.get('dateStart') && req.get('dateStart')) {
            if (Date.Parse(query.dateStart)) {
                dateStart = new Date(query.dateStart);
            } else   {
                res.status(400).json({ message: 'The start date is not a correct date', errorCode: 40010});
            }

            if (Date.Parse(query.dateEnd)) {
                dateEnd = new Date(query.dateEnd);
            } else {
                res.status(400).json({ message: 'The end date is not a correct date', errorCode: 40011});
            }
            
            if (typeof query === 'undefined') {
                query = { dateStart : dateStart, dateEnd : dateEnd};
            } else if (validators.validateJSON(query)) {
                query = JSON.parse(query);
                query.dateStart = dateStart;
                query.dateEnd = dateEnd;
            } else{
                res.status(400).json({ message: 'Query is not setted correctly', errorCode: 4008});
            }
        }

        if (typeof query === 'undefined') {
            res.status(400).json({ message: 'Query is empty', errorCode: 4009 });
        }

        if (validators.validateJSON(query)) {
                query = JSON.parse(query);
            } else{
                res.status(400).json({ message: 'Query is not setted correctly', errorCode: 4008});
            }

        UserModel.get( query, (err, users) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(200).json(users);
            }
        });
});

usersRouter.route('/:user_id')
	.get(function(req, res) {

        if (!validators.validateId(req.params.user_id)) {
            res.status(400).json({ message: 'ID value is not correct', errorCode: 40015});
        } else {
            UserModel.findById(req.params.user_id, '_id name username email plan created_date', function(err, user) {
            if (err)
                res.send(err);
            
            if (user && user.toObject()) {
                res.status(200).json(user);
            } else {
                res.status(400).json({ message: 'User not found.', errorCode: 40012 });    
            }
            
            });
        }
        
    }).put(function(req, res) {

        if (!validators.validateId(req.params.user_id)) {
            res.status(400).json({ message: 'ID value is not correct', errorCode: 40015});
        } else {
            UserModel.update(req.params.user_id, req.body, (err, user, affected) => {
                if (err) {
                    if (err.message === 'Error: 4002') {
                        return res.status(400).json({ message: 'Username is duplicated', errorCode: 4002});   
                    }

                    if (err.message === 'Error: 4005') {
                        return res.status(400).json({ message: 'Email is duplicated', errorCode: 4005});   
                    }

                    if (err.message === 'Error: 40012') {
                        return res.status(400).json({ message: 'User not found', errorCode: 40012});   
                    }

                    if (err.message === 'Error: 4004') {
                        return res.status(400).json({ message: 'Email is not correct', errorCode: 4004});   
                    }

                    return res.status(400).json({ message: 'Something went wrong D:', errorCode: 401 });   
                }

                if (affected > 0) {
                    res.status(200).json({ message: 'User is updated'});
                } else {
                    res.status(400).json({ message: 'User was not updated', errorCode: 40017});
                }
            });
        }

    }).delete(function(req, res) {
        
        if (validators.validateId(req.params.user_id)) {
            UserModel.findById(req.params.user_id, (err, user) => {

                if (user){
                    user.remove(function(err, removed) {
                        if (err)
                            res.send(err);

                        console.log('Removed:', removed);
                        res.status(200).json({ message: 'Successfully deleted' });
                    });    
                } else {
                    res.status(200).json({ message: 'User not found', errorCode:  40012});
                }

            });
            
        } else {
            res.status(400).json({ message: 'ID value is not correct', errorCode: 40015});
        }
        
    });

module.exports = usersRouter;