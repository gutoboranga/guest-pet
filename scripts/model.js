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
		
		setAttributesFromJson(json) {
			this._id = json._id;
			
			this.name = json.name;
			this.email = json.email;
			this.password = json.password;
			this.city = json.city;
			this.birthDate = json.birthDate;

			this.isHostUser = (json.isHostUser === "true");
			this.isOwnerUser = (json.isOwnerUser === "true");
			this.isFiscalUser = (json.isFiscalUser === "true");
		}
}

class Pet {
	constructor(name, species, size, nature, photo, birthDate, userId) {
		this.name = name;
		this.species = species;
		this.size = size;
		this.nature = nature;
    this.state = 0; // 0 É EM CASA
		this.birthDate = birthDate || 0;
		this.photo = photo;
		this.userId = userId;
	}
	
	setAttributesFromJson(json) {
		this._id = json._id;
		
		this.name = json.name;
		this.species = json.species;
		this.size = json.size;
		this.nature = json.nature;
    this.state = parseInt(json.state); // 0 É EM CASA
		this.birthDate = json.birthDate || 0;
		this.photo = json.photo;
		this.userId = json.userId;
	}
}

class Home {
	constructor(name, street, number, city, state, country, photos, capacity, value, description, userId) {
		this.name = name;
		this.street = street;
		this.number = number;
		this.city = city;
		this.state = state;
		this.country = country;
		this.photos = photos;
		this.capacity = capacity;
		this.value = value;
		this.currentOccupation = 0;
		this.description = description;
		this.userId = userId;
	}
	
	setAttributesFromJson(json) {
		this._id = json._id;
		
		this.name = json.name;
		this.street = json.street;
		this.number = parseInt(json.number);
		this.city = json.city;
		this.state = json.state;
		this.country = json.country;
		this.photos = json.photos;
		this.capacity = json.capacity;
		this.value = parseInt(json.value);
		this.currentOccupation = parseInt(json.currentOccupation);
		this.description = json.description;
		this.userId = json.userId;
	}

	isAvailable() {
		return (this.capacity > this.currentOccupation);
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

// Estados de uma transação:
// Obs.: só quando estiver COMPLETED, vai aparecer no histórico

const WAITING_HOST_ANSWER = 0;
const HOST_DECLINED = 1;
const HOST_ACCEPTED_AND_IS_WAITING_FOR_PET = 2;
const PET_IN_HOSTAGE = 3;
const OWNER_WAITING_FOR_PET_DEVOLUTION = 4;
const COMPLETED = 5;

const OWNER = 0;
const HOST = 1;

class Transaction {
    constructor(status, initialDate, finalDate, value, petId, homeId, ownerId, hostId) {
			this.status = status;
			
      this.initialDate = initialDate;
			this.finalDate = finalDate;
			
      this.value = value;
			this.petId = petId;
      this.homeId = homeId;
			this.ownerId = ownerId;
			this.hostId = hostId;
    }
		
		setAttributesFromJson(json) {
			this._id = json._id;
			this.status = parseInt(json.status);
      
			this.initialDate = json.initialDate;
			this.finalDate = json.finalDate;
			
      this.value = parseInt(json.value);
			this.petId = json.petId;
      this.homeId = json.homeId;
			this.ownerId = json.ownerId;
			this.hostId = json.hostId;
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
						return '<br><button id="5">Confirmar recebimento do pet</button>';
						break;
					case PET_IN_HOSTAGE:
						return '<br><button id="4">Encerrar hospedagem</button>';
						break;
					default:
						return '';
				}
			} else {
				switch (this.status) {
					case WAITING_HOST_ANSWER:
						return '<br><button id="2">Aceitar</button><button id="1">Rejeitar</button>';
						break;
					case HOST_ACCEPTED_AND_IS_WAITING_FOR_PET:
						return '<br><button id="3">Confirmar recebimento do pet</button>';
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

// class Pendency {
// 	constructor(transaction, status) {
// 		this.transaction = transaction;
// 		this.status = status;
// 	}
//
//
// }

// var addressLukita = new Adress("Rua Carlos Reverbel", 152, "Canoas", "RS", "Brasil");
//
// var userLukita = new User("Lukita", "lukita@hotmail.com", "123deoliveira4", "Canoas", "17/07/94", false, true, false);
// var dogLukita = new Pet("Dog", "Cachorro", "Pequeno", "Alterado", "aaaaa", "2015");
// var iguanaLukita = new Pet("Cauboi velho", "Iguana", "Gigante", "Dócil", "aaaaa", "2015");
// userLukita.addPet(dogLukita);
// userLukita.addPet(iguanaLukita);
//
// var userBoranga = new User("Boranga", "boranguinha@yahoo.com", "12345", "Porto Alegre", "18/07/96", true, false, false);
// var adressBoranguinhaPoa = new Adress("Av Venancio Aires", 281, "Porto Alegre", "RS", "Brasil");
// var adressboranguinhaPraia = new Adress("Av Praia", 999, "Capão da Canoa", "RS", "Brasil");
// var homeBorangaPoa = new Home("Baia", adressBoranguinhaPoa, [], 1, 200, "Apê em poa");
// var homeBorangaPraia = new Home("Prainha", adressboranguinhaPraia, [], 5, 50, "Só animais marinhos");
// userBoranga.addHome(homeBorangaPraia);
// userBoranga.addHome(homeBorangaPoa);
//
//
// var userJoao = new User("Joao", "joaozinho@gmail", "aaa", "Porto Alegre", "17/07/94", true, false, false);
// var adressJoao = new Adress("Luis de Camões", 151, "Porto Alegre", "RS", "Brasil");
// var homeJoao = new Home("Lusiadas", adressJoao, [], 1, 100, "Casa da Fufu");
// userJoao.addHome(homeJoao);
// console.log(userBoranga);
// console.log(userLukita);

// var period = new Period(
// 	new Date(1,3,2017),
// 	new Date(1,4,2017)
// )
//
// var dogNaPraia = new Transaction(userLukita.email, userBoranga.email, dogLukita, homeBorangaPraia, period, 5);
// var dogNaCidade = new Transaction(userLukita.email, userBoranga.email, iguanaLukita, homeBorangaPoa, period, 500);

// userBoranga.addTransaction(dogNaPraia);
// userLukita.addTransaction(dogNaPraia);
//
// userBoranga.addTransaction(dogNaCidade);
// userLukita.addTransaction(dogNaCidade);

// var pendencyPraia = new Pendency(dogNaPraia, WAITING_HOST_ANSWER);
// var pendencyCidade = new Pendency(dogNaCidade, OWNER_WAITING_FOR_PET_DEVOLUTION);
//
// userLukita.addPending(pendencyPraia);
// userBoranga.addPending(pendencyPraia);
//
// userLukita.addPending(pendencyCidade);
// userBoranga.addPending(pendencyCidade);

// var users = [userBoranga, userLukita, userJoao];
// console.log(users);
// console.log(userBoranga);
// userBoranga.addHome(homeBorangaPraia);
// console.log(userBoranga);
// userBoranga.addTransaction(dogNaPraia);
// userLukita.addTransaction(dogNaPraia);
// console.log(userLukita.ownerHistory[0]);
//

// REST & DB

function post(path, params, method) {
    method = method || "POST"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
         }
    }
    document.body.appendChild(form);
    form.submit();
}

function put(path, params, callback) {
    $.ajax({
    url: path, // your api url
    method: 'PUT', // method is any HTTP method
    data: params, // data as js object
    success: function() {
			callback();
		}
	});
}

function postAjax(path, params, callback) {
    $.ajax({
    url: path, // your api url
    method: 'POST', // method is any HTTP method
    data: params, // data as js object
    success: function() {
			callback();
		}
	});
}

function del(path, params, callback) {
	$.ajax({
		url: path, // your api url
		method: 'DELETE', // method is any HTTP method
		data: params, // data as js object
		success: function() {
			callback();
		}
	});
}


function get(path) {
	var xmlHttp = new XMLHttpRequest();
	// xmlHttp.onreadystatechange = function() {
	// 	if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {}
	// }
	xmlHttp.open("GET", path, true); // true for asynchronous
	xmlHttp.send(null);
}

function getUsers(callback) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			var result = JSON.parse(xmlHttp.response);
			var users = [];
			
			for(var i = 0; i < result.length; i ++) {
				var user = new User();
				user.setAttributesFromJson(result[i]);
				users.push(user);
			}
			
			callback(users);
		}
	}
	xmlHttp.open("GET", "/users", true); // true for asynchronous
	xmlHttp.send(null);
}

function getUserById(id, callback) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			var result = JSON.parse(xmlHttp.response);
			var hasCalledBack = false;
			
			for(var i = 0; i < result.length; i ++) {
				var user = new User();
				user.setAttributesFromJson(result[i]);
				
				if (user._id == id) {
					hasCalledBack = true;
					callback(user);
				}
			}
			if (!hasCalledBack) {
				callback(undefined);
			}
		}
	}
	xmlHttp.open("GET", "/users", true); // true for asynchronous
	xmlHttp.send(null);
}

function getUserByName(name, callback) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			var result = JSON.parse(xmlHttp.response);
			var hasCalledBack = false;
			
			for(var i = 0; i < result.length; i ++) {
				var user = new User();
				user.setAttributesFromJson(result[i]);
				
				if (user.name == name) {
					hasCalledBack = true;
					callback(user);
				}
			}
			if (!hasCalledBack) {
				callback(undefined);
			}
		}
	}
	xmlHttp.open("GET", "/users", true); // true for asynchronous
	xmlHttp.send(null);
}

function getPets(callback) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			var result = JSON.parse(xmlHttp.response);
			var pets = [];
			
			for(var i = 0; i < result.length; i ++) {
				var pet = new Pet();
				pet.setAttributesFromJson(result[i]);
				pets.push(pet);
			}
			
			callback(pets);
		}
	}
	xmlHttp.open("GET", "/pets", true); // true for asynchronous
	xmlHttp.send(null);
}

function getPetsForUserId(id, callback) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			var result = JSON.parse(xmlHttp.response);
			var pets = [];
			
			for(var i = 0; i < result.length; i ++) {
				var pet = new Pet();
				pet.setAttributesFromJson(result[i]);

				if(pet.userId == id) {
					pets.push(pet);
				}
			}
			
			callback(pets);
		}
	}
	xmlHttp.open("GET", "/pets", true); // true for asynchronous
	xmlHttp.send(null);
}

function getPetForId(id, callback) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			var result = JSON.parse(xmlHttp.response);
			var hasCalledBack = false;
			
			for(var i = 0; i < result.length; i ++) {
				var pet = new Pet();
				pet.setAttributesFromJson(result[i]);
				
				if(pet._id == id) {
					hasCalledBack = true;
					callback(pet);
				}
			}
			if (!hasCalledBack) {
				callback(undefined);
			}
		}
	}
	xmlHttp.open("GET", "/pets", true); // true for asynchronous
	xmlHttp.send(null);
}

function getHomesForUserId(id, callback) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			var result = JSON.parse(xmlHttp.response);
			var homes = [];
			// console.log(xmlHttp.response);
			
			for(var i = 0; i < result.length; i ++) {
				var home = new Home();
				home.setAttributesFromJson(result[i]);

				if(home.userId == id) {
					homes.push(home);
				}
			}
			callback(homes);
		}
	}
	xmlHttp.open("GET", "/homes", true); // true for asynchronous
	xmlHttp.send(null);
}

function getHomeForId(id, callback) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			var result = JSON.parse(xmlHttp.response);
			var hasCalledBack = false;

			for(var i = 0; i < result.length; i ++) {
				var home = new Home();
				home.setAttributesFromJson(result[i]);
				if(home._id == id) {
					hasCalledBack = true;
					callback(home);
				}
			}
			if (!hasCalledBack) {
				callback(undefined);
			}
		}
	}
	xmlHttp.open("GET", "/homes", true); // true for asynchronous
	xmlHttp.send(null);
}

function getUsersWithAvailableHomesInCity(city, callback) {
	found = [];
	
	getUsers(function (users) {
		users.forEach(function (user, i) {
			getHomesForUserId(user._id, function (homes) {
				if (user.isHostUser && homes.length > 0) {
					homes.forEach(function (home, j) {
						if (home.isAvailable() && home.city == city) {
							found.push(user);
						}
						if (j == (homes.length - 1) && i == (users.length - 1)) {
							callback(found);
						}
					});
				} else {
					if (i == (users.length - 1)) {
						callback(found);
					}
				}
			});
		});
	});
}

function getTransactionsForUserId(id, mode, completed, callback) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
		var transactions = [];
		
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			var result = JSON.parse(xmlHttp.response);
			
			for(var i = 0; i < result.length; i ++) {
				var transaction = new Transaction();
				transaction.setAttributesFromJson(result[i]);
				
				if (completed == (transaction.status == COMPLETED)) {
					if (mode == OWNER) {
						if (transaction.ownerId == id) {
							transactions.push(transaction);
						}
					} else {
						if (transaction.hostId == id) {
							transactions.push(transaction);
						}
					}
				}
			}
			callback(transactions);
		}
	}
	xmlHttp.open("GET", "/transactions", true); // true for asynchronous
	xmlHttp.send(null);
}

function getTransactions(callback) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
		var transactions = [];
		
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			var result = JSON.parse(xmlHttp.response);
			
			for(var i = 0; i < result.length; i ++) {
				var transaction = new Transaction();
				transaction.setAttributesFromJson(result[i]);
				transactions.push(transaction);
			}
			callback(transactions);
		}
	}
	xmlHttp.open("GET", "/transactions", true); // true for asynchronous
	xmlHttp.send(null);
}