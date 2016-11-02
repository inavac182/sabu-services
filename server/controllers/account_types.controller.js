/*jshint esversion: 6, node: true */
/*global require, module */
'use strict';

const Account_typesModel = require('../../src/models/account_types.model.js'),
	  mongoose = require('mongoose'),
      Validators = require('../../src/helpers/validators.helper.js'),
      Errors = require('../../src/helpers/errors.helper.js'),
	  express = require('express'),
      errors = new Errors(),
      validators = new Validators();

let account_typesRouter = express.Router();

account_typesRouter.route('/')
	.post((req, res) => {
		Account_typesModel.create(req.body, (err, user) => {
	    	if (err) {
	    		res.status(400).json(err);
	    	} else {
                res.status(200).json(user);
            }
	    });
	}).get((req, res) => {
		Account_typesModel.get(req, (err, accounts) => {
			if (err) {
                res.status(400).json(err);  
            } else {
            	res.status(200).json(accounts);
            }
		});
	});

account_typesRouter.route('/:account_type_id')
    .get(function(req, res) {
        Account_typesModel.getById(req.params.account_type_id, (err, account_type) => {
            if (err) res.status(400).json(err);

            if (account_type) {
                res.status(200).json(account_type);
            }
        });
        
    }).put(function(req, res) {
        Account_typesModel.update(req.params.account_type_id, req.body, (err, account_type, affected) => {
            if (err) {
                return res.status(400).json(err);   
            } else {
                if (affected > 0) {
                    res.status(200).json({ message: 'Account type updated'});
                } else {
                    res.status(400).json({ message: errors.getMessage(40026), errorCode: 40026});
                }
            }
    	});
  	}).delete(function(req, res) {
        Account_typesModel.delete(req.params.account_type_id, (err, removed) => {
            if (err) {
                res.status(400).json(err); 
            } else {
                res.status(200).json({message: 'Account type is removed'});
            }
        });
    });


module.exports = account_typesRouter;
