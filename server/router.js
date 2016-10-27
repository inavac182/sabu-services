/*jshint esversion: 6, node: true */
/*global require, module */
'use strict';

const express = require('express'),
	    router = express.Router(),
	    mongoose = require('mongoose');

router.use(function (req, res, next) {
  //LOG APP AND LET CONTINUE
  if (req.get('token') === 'ASj2JZD-123jjahKAJ-11jHkasd3LD') {
    next();
  } else {
    res.status(403).json({ message: 'Invalid token!' });
  }
});

 router.use('/users', require('./controllers/users.controller.js'));


 module.exports = router;


