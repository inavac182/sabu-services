/*jshint esversion: 6, node: true */
/*global require, module */
'use strict';

const 	express = require('express'),
		port = process.env.PORT || 8080,
		bodyParser = require('body-parser'),
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

const db = new DataBase();
db.openConnection();

console.log('Server is up');