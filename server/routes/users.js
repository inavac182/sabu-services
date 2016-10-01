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
				    }else{

				    	res.status(200).json({ 
				    		user,
				    		message: 'User created'
				    	});	
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
            } else {
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
                res.status(400).json({message: 'Query is not setted correctly', errorCode: 4008});
            }
        }

        if (typeof query === 'undefined') {
            res.status(400).json({ message: 'Query is empty', errorCode: 4009 });
        }

        if (validators.validateJSON(query)) {
                query = JSON.parse(query);
            } else{
                res.status(400).json({message: 'Query is not setted correctly', errorCode: 4008});
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
        UserModel.findById(req.params.user_id, function(err, user) {
            if (err)
                res.send(err);

            res.json(user);
        });
    }).put(function(req, res) {

        UserModel.findById(req.params.user_id, function(err, user) {

            if (err)
                res.send(err);

            user.name = req.body.name; 
           	user.username = req.body.username;  
           	user.pass = req.body.pass;  
           	user.plan = req.body.plan;  

            user.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'User updated!' });
            });

        });
    }).delete(function(req, res) {
        UserModel.remove({
            _id: req.params.user_id
        }, function(err, bear) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

module.exports = usersRouter;