/*jshint esversion: 6, node: true */
/*global require, module */
'use strict';

class Users{

	getName(id) {
		if(this.id === id){
			return this.name;
		}
	}

	add(name, email, password) {
		this.id = 1;
		this.name = name;
		this.email = email;
		this.password = password;
	}

	update(id, name, email, password) {
		if (this.id === id){
			this.name = name;
			this.email = email;
			this.password = password;
		}
	}

	delete(id) {
		if (this.id === id) {
			this.name = "";
			this.email = "";
			this.password = "";
		}
	}
}

module.exports = Users;