/*jshint esversion: 6, node: true */
/*global require, module */
'use strict';

const UserModel = require('../../src/models/users.model.js'),
	  mongoose = require('mongoose'),
      Validators = require('../../src/helpers/validators.helper.js'),
      Errors = require('../../src/helpers/errors.helper.js'),
	  express = require('express'),
      errors = new Errors(),
      validators = new Validators();

let usersRouter = express.Router();

usersRouter.route('/')
	.post((req, res) => {

	    UserModel.create(req.body, (err, user) => {
	    	if (err) {
	    		res.status(400).json(err);
	    	} else {
                res.status(200).json(user);
            }
	    });
		
	}).get((req, res) => {

        UserModel.get( req, (err, users) => {
            if (err) {
                res.status(400).json(err);  
            } else {
                res.status(200).json(users);
            }
        });
});

usersRouter.route('/:user_id')
	.get(function(req, res) {
        UserModel.getById(req.params.user_id, (err, user) => {
            if (err) res.status(400).json(err);

            if (user) {
                res.status(200).json(user);
            }
        });
        
    }).put(function(req, res) {

        UserModel.update(req.params.user_id, req.body, (err, user, affected) => {
            if (err) {
                return res.status(400).json(err);   
            } else {
                if (affected > 0) {
                    res.status(200).json({ message: 'User updated'});
                } else {
                    res.status(400).json({ message: errors.getMessage(40017), errorCode: 40017});
                }
            }
        });

    }).delete(function(req, res) {
        UserModel.delete(req.params.user_id, (err, removed) => {
            if (err) {
                res.status(400).json(err); 
            } else {
                res.status(200).json({message: 'User removed'});
            }
        });
    });

module.exports = usersRouter;