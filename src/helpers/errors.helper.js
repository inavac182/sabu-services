/*jshint esversion: 6, node: true */
/*global require, module */
'use strict';

class Errors{
	constructor(env) {
		this.errors = [];
		this.errors.push({ value : 401, message : 'Unexpected error D:' });
		this.errors.push({ value : 4001, message : 'Username is empty' });
		this.errors.push({ value : 4002, message : 'Username is duplicated' });
		this.errors.push({ value : 4003, message : 'Email is empty' });
		this.errors.push({ value : 4004, message : 'Email is not correct' });
		this.errors.push({ value : 4005, message : 'Email is duplicated' });
		this.errors.push({ value : 4006, message : 'Name is empty' });
		this.errors.push({ value : 4007, message : 'Password is empty' });
		this.errors.push({ value : 4008, message : 'Query is not setted correctly' });
		this.errors.push({ value : 4009, message : 'Name is empty' });
		this.errors.push({ value : 40010, message : 'Query is empty' });
		this.errors.push({ value : 40011, message : 'The end date is not a correct date' });
		this.errors.push({ value : 40012, message : 'User not found' });
		this.errors.push({ value : 40013, message : 'ID is empty' });
		this.errors.push({ value : 40014, message : 'Data is empty' });
		this.errors.push({ value : 40015, message : 'ID value is not correct' });
		this.errors.push({ value : 40016, message : 'Data is not setted correctly' });
		this.errors.push({ value : 40017, message : 'User was not updated' });
	}

	getMessage(idError) {
		for (let i in this.errors) {
			if (this.errors[i].value === idError) {
				return this.errors[i].message;
			}
		} 
	}

}

module.exports = Errors;