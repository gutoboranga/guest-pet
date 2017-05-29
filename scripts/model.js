class User {
	constructor(nome, email, senha, city) {
		this.nome = nome;
		this.email = email;
		this.senha = senha;
		this.city = city;
	}
}

var boranga = new User("Baranga", "baranguinha@yahoo", "12345", "porto alegre");
var pimenta = new User("Little Pepper", "pimentinha@bol", "54321", "porto alegre");
var flach = new User("Armless John", "mcflachinho@rnf", "roller", "roller city");

var users = [boranga, pimenta, flach];
