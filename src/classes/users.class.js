/*jshint esversion: 6 */
var User = mongoose.model('User', userSchema);
module.exports = User;




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
			this.password = passwor;
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