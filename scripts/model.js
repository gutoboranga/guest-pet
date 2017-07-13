class User {
	constructor(nome, email, senha, city, birthDate, isHostUser, isOwnerUser, isFiscalUser) {
		this.nome = nome;
		this.email = email;
		this.senha = senha;
		this.birthDate = birthDate;
		
		this.isHostUser = isHostUser;
		this.isOwnerUser = isOwnerUser;
		this.isFiscalUser = isFiscalUser;
		
		// owner attributes
		this.pets = pets;
		this.ownerHistory = ownerHistory;
		this.ownerPoints = ownerPoints;
		
		// host attributes
		this.homes = homes;
		this.hostHistory = hostHistory;
		this.hostPoints = hostPoints;
	}
}

class Pet {
	constructor(name, species, size, nature, state, photo, birthDate) {
		this.name = name;
		this.species = species;
		this.size = size;
		this.nature = nature;
		this.state = state;
		this.birthDate = birthDate || 0;
		this.photo = photo;
	}
}

class Home {
	constructor(name, adress, photos, capacity, currentOccupation, description) {
		this.name = name;
		this.adress = adress;
		this.photos = photos;
		this.capacity = capacity;
		this.currentOccupation = currentOccupation;
		this.description = description;
	}
}

class Adress {
	constructor(street, number, city, state, country) {
		this.street = street;
		this.number = number;
		this.city = city;
		this.state = state;
		this.country = country;
	}
}

var boranga = new User("Baranga", "baranguinha@yahoo", "12345", "porto alegre");
var pimenta = new User("Little Pepper", "pimentinha@bol", "54321", "porto alegre");
var flach = new User("Armless John", "mcflachinho@rnf", "roller", "roller city");

var users = [boranga, pimenta, flach];
