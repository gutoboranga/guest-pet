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
	
	isAvailable() {
		return (this.capacity - this.currentOccupation) > 0;
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
