class User {
	constructor(nome, email, senha) {
		this.nome = nome;
		this.email = email;
		this.senha = senha;
	}
}

var boranga = new User("Baranga", "baranguinha@yahoo", "12345");
var pimenta = new User("Little Pepper", "pimentinha@bol", "54321");
var flach = new User("Armless John", "mcflachinho@rnf", "roller");

var users = [boranga, pimenta, flach];
