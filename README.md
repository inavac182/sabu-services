# sabu-services
Services for sabu app

# APIS
## Users API
 	/users
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
	### GET
	- Getting users from DB, data required:
		1. query {Json, required} <- The query to filter results, {} <- Will return all users, { username: 'myUser'} <- Will return users with username myUser.  This parameter MUST go in the HEADERS of the request.

		NOTE: If is needed to filter by dates, these have to go in different parameters, MUST come the two values, if needed just one day, send both as the same date:

		2. dateStart {String: '2016-10-01' } Y-m-d, Jan = 0.
		3. dateEnd {String: '2016-10-02' } Y-m-d, Jan = 0.
	- Responses:
		1. HTTP Codes:
			1. 400 - Bad Requers
				1. JSON: {message: 'Query is not setted correctly', errorCode: 4008}
				2. JSON: {message: 'Query is empty', errorCode: 4009}
				2. JSON: {message: 'The start date is not a correct date', errorCode: 40010}
				2. JSON: {message: 'The end date is not a correct date', errorCode: 40011}
			2. 200 -OK
				1. JSON [{"_id", "name", "username", "password", "plan", "created_at"}, {...}]

#Internal Error Codes