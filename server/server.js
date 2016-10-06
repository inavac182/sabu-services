/*jshint esversion: 6, node: true */
/*global require, module */
'use strict';

const 	express = require('express'),
		port = process.env.PORT || 8081,
		bodyParser = require('body-parser'),
		env = process.env.NODE_ENV || 'dev',
		router = require('./router'),
		DataBase = require('../src/helpers/db.helper.js'),
		app = express();

app.use(bodyParser.urlencoded({
  limit: '10kb',
  extended: false
}));

app.use(bodyParser.json({
	limit: '10mb'
}));

app.use(router);


app.listen(port);

const db = new DataBase(env);
db.openConnection();

console.log('Server is up');