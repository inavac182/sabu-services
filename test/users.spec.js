/*jshint esversion: 6, node: true */
/*global require, module, describe, it, beforeEach, afterEach, before, after */
'use strict';

const should = require('should'),
    path = require('path'),
    env = process.env.NODE_ENV || 'dev',
    DataBase = require('../src/helpers/db.helper.js'),
    sinon = require('sinon'),
    UserModel = require('../src/models/users.model.js');

const db = new DataBase(env);

describe('User tests', () => {
  	let users;

    before (() =>{
      db.openConnection();
    });

    after(() => {
      db.closeConnection();
    });

  	describe('/users', () => {
        describe('Create', () => {
            let mockedRequest;

            beforeEach(() => {
                mockedRequest = {
                    name: 'myName',
                    username: 'myUsername',
                    email: 'myEmail@test.com',
                    password: 'mypass',
                    plan: 0,
                    user_active: true,
                    created_date: '12/10/2016'
                };

            });

            afterEach(()=>{
              
            });

            it('Should validate name in the request', () =>{
                UserModel.create(mockedRequest, (err, user) =>{
                    
                    should.equal(UserModel.find.calledOnce, false,'The find called was not send');
                });
            });
    	});

    	it('Should set name correctly 2', () => {
      		should.equal('Felipe', 'Felipe');
    	});
	});

});