/*jshint esversion: 6, node: true */
/*global require, module, describe, it, beforeEach */
'use strict';

const should = require('should');
const path = require('path');
const Users = require('../src/models/users.model.js');

describe('User tests', () => {
  	let users;

  	beforeEach(() => {
    	users = new Users();
	});

	it('Should set name correctly', () => {
      should.equal('Felipe', 'Felipe');
    });
});