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

function CreateHomeView(elements) {
    this.elements = elements;

    var _this = this;

    this.createHomeButtonClicked = new Event(this);
    this.goBackButtonClicked = new Event(this);

    // attach listeners to HTML controls
    this.elements.createHomeButton.click(function (e) {
        _this.createHomeButtonClicked.notify();
    });
    
    this.elements.goBackButton.click(function (e) {
        _this.goBackButtonClicked.notify();
    });
}

CreateHomeView.prototype = {
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
function CreateHomeController(user, view) {
    this.user = user;
    this.view = view;

    var _this = this;

    // Eventos da View para os quais a Controller vai executar uma ação em resposta
    this.view.createHomeButtonClicked.attach(function (sender, args) {
        _this.createHome();
    });

    this.view.goBackButtonClicked.attach(function () {
        _this.goBack();
    });
}

CreateHomeController.prototype = {
  isValid: function (howShouldNotBe, field, errorField) {
    if (field == howShouldNotBe) {
      this.view.setVisible(errorField, true);
      this.view.setText(errorField, "Insira " + howShouldNotBe + " corretamente");
      return 0;
    }
    this.view.setVisible(errorField, false);
    return 1;
  },
  
	createHome: function () {
    var name = this.view.elements.homeNameField.val();
    var description = this.view.elements.homeDescriptionField.val();
    var capacity = this.view.elements.homeCapacityField.val();
    var value = this.view.elements.homeValueField.val();
    var street = this.view.elements.homeStreetField.val();
    var number = this.view.elements.homeNumberField.val();
    var city = this.view.elements.homeCityField.val();
    var state = this.view.elements.homeStateField.val();
    var country = this.view.elements.homeCountryField.val();
    
    if (this.isValid("nome", name, this.view.elements.homeNameFieldError)
        && this.isValid("descrição", description, this.view.elements.homeDescriptionFieldError)
        && this.isValid("capacidade", capacity, this.view.elements.homeCapacityFieldError)
        && this.isValid("valor", value, this.view.elements.homeValueFieldError)
        && this.isValid("rua", street, this.view.elements.homeStreetFieldError)
        && this.isValid("número", number, this.view.elements.homeNumberFieldError)
        && this.isValid("cidade", city, this.view.elements.homeCityFieldError)
        && this.isValid("estado", state, this.view.elements.homeStateFieldError)
        && this.isValid("país", country, this.view.elements.homeCountryFieldError)) {
          
          // var adress = new Adress(street, number, city, state, country);
          var home = new Home(name, street, number, city, state, country, "photos", capacity, value, description, this.user._id);
          
          // post('/home', home, 'POST');
          postAjax('/home', home, function () {
            window.location.replace("../templates/home.html");
          });
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
    
    var createHomeView = new CreateHomeView({
      'goBackButton' : $('goBackButton'),

      'homeNameField' : $('#homeNameField'),
      'homeCapacityField' : $('#homeCapacityField'),
      'homeValueField' : $('#homeValueField'),
      'homeDescriptionField' : $('#homeDescriptionField'),
      'homeStreetField' : $('#homeStreetField'),
      'homeNumberField' : $('#homeNumberField'),
      'homeCityField' : $('#homeCityField'),
      'homeStateField' : $('#homeStateField'),
      'homeCountryField' : $('#homeCountryField'),
      'createHomeButton' : $('#createHomeButton'),
      
      'homeNameFieldError' : $('#homeNameFieldError'),
      'homeCapacityFieldError' : $('#homeCapacityFieldError'),
      'homeValueFieldError' : $('#homeValueFieldErro'),
      'homeDescriptionFieldError' : $('#homeDescriptionFieldError'),
      'homeStreetFieldError' : $('#homeStreetFieldError'),
      'homeNumberFieldError' : $('#homeNumberFieldError'),
      'homeCityFieldError' : $('#homeCityFieldError'),
      'homeStateFieldError' : $('#homeStateFieldError'),
      'homeCountryFieldError' : $('#homeCountryFieldError'),
    });
    
    var createHomeController = new CreateHomeController(user, createHomeView);
  });
});
