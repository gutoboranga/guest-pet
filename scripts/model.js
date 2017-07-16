// import {UserMode} from "enums";

class User {
	constructor(name, email, password, city, birthDate, isHostUser, isOwnerUser, isFiscalUser) {
		this.name = name;
		this.email = email;
		this.password = password;
		this.city = city;
		this.birthDate = birthDate;

		this.isHostUser = isHostUser;
		this.isOwnerUser = isOwnerUser;
		this.isFiscalUser = isFiscalUser;

		// owner attributes
		this.pets = [];
		this.ownerHistory = [];
		this.ownerPoints = [];
		this.ownerPending = [];

		// host attributes
		this.homes = [];
		this.hostHistory = [];
		this.hostPoints = [];
		this.hostPending = [];
	}

    addPet(pet) {
        this.pets.push(pet);
    }
    addHome(home) {
        this.homes.push(home);
    }

    addTransaction(transaction) {
        if (this.email == transaction.ownerEmail) {
            this.ownerHistory.push(transaction);
        }

        else {
            this.hostHistory.push(transaction);
        }
    }
		
		addPending(pendency) {
			if (this.email == pendency.transaction.ownerEmail) {
					this.ownerPending.push(pendency);
			}

			else {
					this.hostPending.push(pendency);
			}
		}
}

class Pet {
	constructor(name, species, size, nature, photo, birthDate) {
		this.name = name;
		this.species = species;
		this.size = size;
		this.nature = nature;
    this.state = 0; // 0 É EM CASA
		this.birthDate = birthDate || 0;
		this.photo = photo;
	}
}

class Home {
	constructor(name, adress, photos, capacity, value, description) {
		this.name = name;
		this.adress = adress;
		this.photos = photos;
		this.capacity = capacity;
		this.value = value;
		this.currentOccupation = 0;
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

class Transaction {
    constructor(ownerEmail, hostEmail, pet, home, period, value) {
        this.ownerEmail = ownerEmail;
        this.hostEmail = hostEmail;
        this.pet = pet;
        this.home = home;
        this.period = period;
        this.value = value;
    }
}

class Period {
		constructor(initialDate, finalDate) {
				this.initialDate = initialDate;
				this.finalDate = finalDate;
		}
}

class Date {
		constructor(day, month, year) {
				this.day = day;
				this.month = month;
				this.year = year;
		}
		
		toStr() {
			return this.day + "/" + this.month + "/" + this.year;
		}
}

// Estados de uma pendência:
// Obs.: só quando estiver COMPLETED, vai virar uma transação e aparecer no histórico

const WAITING_HOST_ANSWER = 0;
const HOST_DECLINED = 1;
const HOST_ACCEPTED_AND_IS_WAITING_FOR_PET = 2;
const PET_IN_HOSTAGE = 3;
const OWNER_WAITING_FOR_PET_DEVOLUTION = 4;
const COMPLETED = 5;

const OWNER = 0;
const HOST = 1;

class Pendency {
	constructor(transaction, status) {
		this.transaction = transaction;
		this.status = status;
	}
	
	message(mode) {
		if (mode == OWNER) {
			switch (this.status) {
				case WAITING_HOST_ANSWER:
					return "Aguardando resposta do host.";
					break;
				case HOST_DECLINED:
					return "O host rejeitou sua proposta.";
					break;
				case HOST_ACCEPTED_AND_IS_WAITING_FOR_PET:
					return "O host está aguardando seu pet.";
					break;
				case PET_IN_HOSTAGE:
					return "Pet está hospedado.";
					break;
				case OWNER_WAITING_FOR_PET_DEVOLUTION:
					return "Busque seu pet na residência da hospedagem.";
					break;
				case COMPLETED:
					return "Transação concluída";
					break;
				default:
					return "";
			}
		} else {
			switch (this.status) {
				case WAITING_HOST_ANSWER:
					return "O owner está aguardando sua resposta.";
					break;
				case HOST_DECLINED:
					return "Você rejeitou a proposta.";
					break;
				case HOST_ACCEPTED_AND_IS_WAITING_FOR_PET:
					return "Aguardando o owner lhe entregar o pet. Já entregou?";
					break;
				case PET_IN_HOSTAGE:
					return "Pet está hospedado.";
					break;
				case OWNER_WAITING_FOR_PET_DEVOLUTION:
					return "Devolva o pet para o dono.";
					break;
				case COMPLETED:
					return "Transação concluída";
					break;
				default:
					return "";
			}
		}
	}
	
	actions(mode) {
		if (mode == OWNER) {
			switch (this.status) {
				case OWNER_WAITING_FOR_PET_DEVOLUTION:
					return '<button id="5">Confirmar recebimento do pet</button>';
					break;
				default:
					return '';
			}
		} else {
			switch (this.status) {
				case WAITING_HOST_ANSWER:
					return '<button id="2">Aceitar</button><button id="1">Rejeitar</button>';
					break;
				case HOST_ACCEPTED_AND_IS_WAITING_FOR_PET:
					return '<button id="3">Confirmar recebimento do pet</button>';
					break;
				default:
					return '';
			}
		}
	}
	
	setStatus(newStatus) {
		this.status = newStatus;
	}
}

var addressLukita = new Adress("Rua Carlos Reverbel", 152, "Canoas", "RS", "Brasil");

var userLukita = new User("Lukita", "lukita@hotmail.com", "123deoliveira4", "Canoas", "17/07/94", false, true, false);
var dogLukita = new Pet("Dog", "Cachorro", "Pequeno", "Alterado", "aaaaa", "2015");
var iguanaLukita = new Pet("Cauboi velho", "Iguana", "Gigante", "Dócil", "aaaaa", "2015");
userLukita.addPet(dogLukita);
userLukita.addPet(iguanaLukita);

var userBoranga = new User("Boranga", "boranguinha@yahoo.com", "12345", "Porto Alegre", "18/07/96", true, false, false);
var adressBoranguinhaPoa = new Adress("Av Venancio Aires", 281, "Porto Alegre", "RS", "Brasil");
var adressboranguinhaPraia = new Adress("Av Praia", 999, "Capão da Canoa", "RS", "Brasil");
var homeBorangaPoa = new Home("Baia", adressBoranguinhaPoa, [], 1, 200, "Apê em poa");
var homeBorangaPraia = new Home("Prainha", adressboranguinhaPraia, [], 5, 50, "Só animais marinhos");
userBoranga.addHome(homeBorangaPraia);
userBoranga.addHome(homeBorangaPoa);


var userJoao = new User("Joao", "joaozinho@gmail", "aaa", "Porto Alegre", "17/07/94", true, false, false);
var adressJoao = new Adress("Luis de Camões", 151, "Porto Alegre", "RS", "Brasil");
var homeJoao = new Home("Lusiadas", adressJoao, [], 1, 100, "Casa da Fufu");
userJoao.addHome(homeJoao);
// console.log(userBoranga);
// console.log(userLukita);

var period = new Period(
	new Date(1,3,2017),
	new Date(1,4,2017)
)

var dogNaPraia = new Transaction(userLukita.email, userBoranga.email, dogLukita, homeBorangaPraia, period, 5);
var dogNaCidade = new Transaction(userLukita.email, userBoranga.email, iguanaLukita, homeBorangaPoa, period, 500);

// userBoranga.addTransaction(dogNaPraia);
// userLukita.addTransaction(dogNaPraia);
//
// userBoranga.addTransaction(dogNaCidade);
// userLukita.addTransaction(dogNaCidade);

var pendencyPraia = new Pendency(dogNaPraia, WAITING_HOST_ANSWER);
var pendencyCidade = new Pendency(dogNaCidade, OWNER_WAITING_FOR_PET_DEVOLUTION);

userLukita.addPending(pendencyPraia);
userBoranga.addPending(pendencyPraia);

userLukita.addPending(pendencyCidade);
userBoranga.addPending(pendencyCidade);

var users = [userBoranga, userLukita, userJoao];
console.log(users);
// console.log(userBoranga);
// userBoranga.addHome(homeBorangaPraia);
// console.log(userBoranga);
// userBoranga.addTransaction(dogNaPraia);
// userLukita.addTransaction(dogNaPraia);
// console.log(userLukita.ownerHistory[0]);
//
