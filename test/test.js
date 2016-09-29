const should = require('should');
const path = require('path');
const Users = require('../src/classes/users.class.js');

describe('User tests', () => {
  	let users;

  	beforeEach(() => {
    	users = new Users();
	});

	it('Should set name correctly', () => {
      users.add('Felipe','felipe.nava.co@gmail.com','mipass');
      should.equal(users.getName(1),'Felipe');
    });
});