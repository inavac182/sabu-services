# sabu-services
Services for sabu app

# APIS
## Users API
 	_/users_
 	### POST
 	-  Creating new users, data required:
 		1. name {String, required}
 		2. username {String, required}
 		3. password {String, required} <- Remember to encrypt password before send it
 		4. email {String, requried, email format = text@text.com}
	- Responses:
		1. HTTP Codes:
			1. 400 - Bad Request
				1. JSON: {message: 'Username is empty', errorCode: 4001}
				2. JSON: {message: 'Username is duplicated', errorCode: 4002}
				3. JSON: {message: 'Email is empty', errorCode: 4003}
				4. JSON: {message: 'Email is incorrect', errorCode: 4004}
				5. JSON: {message: 'Email is duplicated', errorCode: 4005}
				6. JSON: {message: 'Name is empty', errorCode: 4006}
				7. JSON: {message: 'Password is empty', errorCode: 4007}
			1. 200 - OK
				1. JSON: {message: 'User is created', user: {"name", "username", "email", "password", "plan", "created_date", "_id"}}
#Internal Error Codes