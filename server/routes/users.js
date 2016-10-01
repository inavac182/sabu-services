/*jshint esversion: 6, node: true */
/*global require, module */
'use strict';

const UserModel = require('../../src/models/users.model.js'),
	  mongoose = require('mongoose'),
	  express = require('express');

let usersRouter = express.Router();

usersRouter.route('/')
	.post(function(req, res) {

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
		
	}).get(function(req, res) {
        UserModel.find(function(err, users) {
            if (err)
                res.send(err);

            res.json(users);
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