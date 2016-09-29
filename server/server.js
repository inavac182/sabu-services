/*jshint esversion: 6, node: true */
/*global require, module */
'use strict';

const 	express = require('express'),
		path = require('path'),
		port = process.env.PORT || 8080,
		bodyParser = require('body-parser'),
		app = express(),
		UserModel = require('../src/models/users.model.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let router = express.Router(); 

router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.route('/users')
	.post(function(req, res) {
	    let user = new UserModel();

	    console.log('Creating user with this data', req.body);
	    user.name = req.body.name;
	    user.username = req.body.username;
	    user.password = req.body.password;
	    user.plan = 0;
	    user.created_date = new Date();

	    user.save(function(err) {
	        if (err)
	            res.send(err);

	        res.json({ message: 'User created!' });
	    });
	}).get(function(req, res) {
        UserModel.find(function(err, users) {
            if (err)
                res.send(err);

            res.json(users);
        });
});

router.route('/users/:user_id')
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


app.use('/api', router);


app.listen(port);
console.log('Server is up');