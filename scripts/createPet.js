function findUser(users) {
  
  var i = 0;
  var cookie = document.cookie;
  
  while (i < users.length) {
    if (cookie == users[i].name) {
      return users[i];
    }
    i++;
  }
}

function CreatePetView(elements) {
    this.elements = elements;

    var _this = this;

    this.createPetButtonClicked = new Event(this);
    this.goBackButtonClicked = new Event(this);

    // attach listeners to HTML controls
    this.elements.createPetButton.click(function (e) {
        _this.createPetButtonClicked.notify();
    });
    
    this.elements.goBackButton.click(function (e) {
        _this.goBackButtonClicked.notify();
    });
}

CreatePetView.prototype = {
    setVisible: function (element, visible) {
        if (visible) {
          element.show();
        } else {
          element.hide();
        }
    },

    setText: function (element, text) {
      element.text(text);
    }
};

/*
 * Controller
 */
function CreatePetController(user, view) {
    this.user = user;
    this.view = view;

    var _this = this;

    // Eventos da View para os quais a Controller vai executar uma ação em resposta
    this.view.createPetButtonClicked.attach(function (sender, args) {
        _this.createPet();
    });

    this.view.goBackButtonClicked.attach(function () {
        _this.goBack();
    });
}

CreatePetController.prototype = {
	
	createPet: function () {
    var name = this.view.elements.petNameField.val();
    var species = this.view.elements.petSpeciesField.val();
    var size = this.view.elements.petSizeField.val();
    var nature = this.view.elements.petNatureField.val();
    
    if (name == "nome") {
      this.view.setVisible(this.view.elements.petNameFieldError, true);
      this.view.setText(this.view.elements.petNameFieldError, "Insira um nome válido");
    
    } else if (species == "espécie") {
      this.view.setVisible(this.view.elements.petSpeciesFieldError, true);
      this.view.setText(this.view.elements.petSpeciesFieldError, "Insira uma espécie válida");
    }
    
    else if (size == "porte") {
      this.view.setVisible(this.view.elements.petSizeFieldError, true);
      this.view.setText(this.view.elements.petSizeFieldError, "Insira um porte válido");
    }
    
    else if (nature == "natureza") {
      this.view.setVisible(this.view.elements.petNatureFieldError, true);
      this.view.setText(this.view.elements.petNatureFieldError, "Insira uma natureza válida");
    
    } else {
      var pet = new Pet(name, species, size, nature, "photo", "01/01/01", this.user._id);
      // console.log(pet);
      
      // post('/pet', pet, 'POST');
      postAjax('/pet', pet, function () {
        window.location.replace("../templates/home.html");
      });
      
      // window.location.replace("../templates/home.html");
    }
	},

  goBack: function () {
		window.location.replace("../templates/home.html");
	}
};

$(function () {
  getUsers(function (result) {
    var users = result;
    var user = findUser(users);
    
    var createPetView = new CreatePetView({
      'goBackButton' : $('goBackButton'),
      
      'petNameField' : $('#petNameField'),
      'petSpeciesField' : $('#petSpeciesField'),
      'petSizeField' : $('#petSizeField'),
      'petNatureField' : $('#petNatureField'),
      'petBirthDateField' : $('#petBirthDateField'),
      'createPetButton' : $('#createPetButton'),
      
      'petNameFieldError' : $('#petNameFieldError'),
      'petSpeciesFieldError' : $('#petSpeciesFieldError'),
      'petSizeFieldError' : $('#petSizeFieldError'),
      'petNatureFieldError' : $('#petNatureFieldError'),
      'petBirthDateFieldError' : $('#petBirthDateFieldError')
    });
    
    var createPetController = new CreatePetController(user, createPetView);
  });
});
