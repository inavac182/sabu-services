/*jshint esversion: 6, node: true */
/*global require, module */
'use strict';

const AccountModel = require('../../src/models/accounts.model.js'),
	  mongoose = require('mongoose'),
      Validators = require('../../src/helpers/validators.helper.js'),
      Errors = require('../../src/helpers/errors.helper.js'),
	  express = require('express'),
      errors = new Errors(),
      validators = new Validators();

let accountRouter = express.Router();

accountRouter.route('/')
	.post((req, res) => {
		AccountModel.create(req.body, (err, user) => {
	    	if (err) {
	    		res.status(400).json(err);
	    	} else {
                res.status(200).json(user);
            }
	    });
	}).get((req, res) => {
		AccountModel.get(req, (err, accounts) => {
			if (err) {
                res.status(400).json(err);  
            } else {
            	res.status(200).json(accounts);
            }
		});
	});


module.exports = accountRouter;
