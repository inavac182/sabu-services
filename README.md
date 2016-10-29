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
				1. JSON: { message: 'User is created' }
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
				3. JSON: {message: 'The start date is not a correct date', errorCode: 40010}
				4. JSON: {message: 'The end date is not a correct date', errorCode: 40011}
				5. JSON: {message: 'User not found', errorCode: 40012}
				6. JSON: {message: 'ID is not correct', errorCode: 40015}
			2. 200 -OK
				1. JSON [{"_id", "name", "username", "password", "plan", "created_at"}, {...}]

	/users/:user_id
	### PUT
	- Update data for 1 user by id.
		1. name {String}
		2. username {String}
		3. password {String}
		4. email {String}
	-Responses:
		- HTTP Codes:
			1. 400 - Bad Request
				1. JSON: {message: 'ID is empty', errorCode: 40013}
				2. JSON: {message: 'User not found', errorCode: 40012}
				3. JSON: {message: 'Data is empty', errorCode: 40014}
				4. JSON: {message: 'ID is not correct', errorCode: 40015}
				5. JSON: {message: 'Data is not setted correctly', errorCode: 40016}
				6. JSON: {message: 'Email is duplicated', errorCode: 4005}
				7. JSON: {message: 'Username is duplicated', errorCode: 4002}
				8. JSON: {message: 'User was not updated', errorCode: 40017}
			2. 200 - OK
				1. JSON {message: 'User updated successfully'}
	### DELETE
	- Remove an user from the app
		- No parameters needed as user id comes in the url.
	- Responses:
		-HTTP Codes:
			1. 400 - Bad Request
				1. JSON: { message: 'User not found', errorCode:  40012}
				2. JSON: { message: 'ID value is not correct', errorCode: 40015}
			2. 200 - OK
				1. JSON { message: 'User is removed' }

## Accounts API
	/accounts
	### POST 
	- Creating a new account
		1. idType {mongo id}
		2. idUser {mongo id}
		3. name {String}
		4. balance {Number}
	- Responses:
		1. HTTP Codes:
			1. 400 - Bad Request
				1. JSON: { message : 'Id type is empty', errorCode: 40019}
				2. JSON: { message : 'Id user is empty', errorCode: 40020}
				3. JSON: { message : 'ID type is not correct', errorCode: 40023}
				4. JSON: { message : 'ID user is not correct', errorCode: 40022}
				5. JSON: { message : 'Name is empty', errorCode: 4006}
				6. JSON: { message : 'Balance is empty', errorCode: 40021}
			2. 200 - OK
				1. JSON: { message : 'Account is created'}

	### GET
	- Getting the accounts
		1. idUser {mongo id}
	- Responses:
		1. HTTP Codes:
			1. 400 - Bad Request
				1. JSON: { message: 'Query is empty', errorCode: 40010}
				2. JSON: { message: 'Query is not setted correctly', errorCode: 4008}
				3. JSON: { message: 'Id user is empty', errorCode: 40020}
				4. JSON: { message: 'ID user is not correct', errorCode: 40022}
			2. 200 - OK
				. JSON: [{"_id", "idType", "name", "balance", "money_date"}]

## Account types API
	/account_types
	### POST
	### GET
	### PUT
	### DELETE
