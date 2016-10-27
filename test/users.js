/*jshint esversion: 6, node: true */
/*global require, module, describe, it, beforeEach, afterEach, before, after */
'use strict';

const should = require('should'),
	  path = require('path'),
	  env = process.env.NODE_ENV || 'dev',
	  DataBase = require('../src/helpers/db.helper.js'),
	  Users = require('../src/models/users.model.js');

const db = new DataBase(env);

describe('User tests', () => {
  	let users;

    before (() =>{
      db.openConnection();
    });

  	beforeEach(() => {
    	
    });

  	afterEach(()=>{
      
  	});

    after(() => {
      db.closeConnection();
    });

  	describe('/users', () => {
		  it('Should set name correctly 1', () => {
      		should.equal('Felipe', 'Felipe');
    	});

    	it('Should set name correctly 2', () => {
      		should.equal('Felipe', 'Felipe');
    	});
	});

});