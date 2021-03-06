/*jshint esversion: 6, node: true */
/*global require, module */
'use strict';

class Validators{
	
	validateEmail(email) {
    	let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	return re.test(email);
	}	

	validateJSON(json) {
		return (/^[\],:{}\s]*$/.test(json.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, '')));
	}

	validateId(id) {
		return id.match(/^[0-9a-fA-F]{24}$/);
	}

	isEmptyObject(obj) {
    	let name;
    	for (name in obj) {
        	return false;
    	}
    	return true;
	}

}

module.exports = Validators;