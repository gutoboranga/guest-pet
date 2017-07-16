
function RegisterView(elements) {
    this.elements = elements;

    var _this = this;

    this.registerButtonClicked = new Event(this);
    this.closeButtonClicked = new Event(this);

    // attach listeners to HTML controls
    this.elements.registerButton.click(function (e) {
        _this.registerButtonClicked.notify();
    });
    this.elements.closeButton.click(function () {
        _this.closeButtonClicked.notify();
    });
}

RegisterView.prototype = {
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
function RegisterController(view) {
    this.view = view;

    var _this = this;

    // Eventos da View para os quais a Controller vai executar uma ação em resposta
    this.view.registerButtonClicked.attach(function (sender, args) {
        _this.registerUser();
    });

    this.view.closeButtonClicked.attach(function () {
        _this.goBack();
    });
    //console.log("deu attach no register");
}

RegisterController.prototype = {
  checkName: function () {
    var nameField = this.view.elements.nameField;
    var nameError = this.view.elements.nameError;

  	if (nameField.val() == "nome") {
      this.view.setVisible(nameError, true);
      this.view.setText(nameError, "Insira um nome válido");
  		return 0;
  	}

  	if (nameField.val().length < 3) {
      this.view.setVisible(nameError, true);
      this.view.setText(nameError, "Nome muito curto");
  		return 0;
  	}

  	this.view.setVisible(nameError, false);
  	return 1;
  },

  checkEmail: function () {
  	var emailField = this.view.elements.emailField;
  	var emailError = this.view.elements.emailError;

  	if (emailField.val() == "email") {
      this.view.setVisible(emailError, true);
      this.view.setText(emailError, "Insira um e-mail válido");
  		return 0;
  	}

    this.view.setVisible(emailError, false);
		return 1;
  },
  
  checkCity: function () {
  	var cityField = this.view.elements.cityField;
  	var cityError = this.view.elements.cityError;

  	if (cityField.val() == "cidade") {
      this.view.setVisible(cityError, true);
      this.view.setText(cityError, "Insira uma cidade válida");
  		return 0;
  	}

    this.view.setVisible(cityError, false);
		return 1;
  },

  checkPasswordConsistency: function () {
    var passwordField = this.view.elements.passwordField;
    var confirmPasswordField = this.view.elements.confirmPasswordField;
  	var passwordError = this.view.elements.passwordError;

  	if (passwordField.val() == confirmPasswordField.val()) {
      this.view.setVisible(passwordError, false);
  		return 1;
  	}

    this.view.setVisible(passwordError, true);
    this.view.setText(passwordError, "As senhas não conferem!");
		return 0;
  },

  checkPasswordLength: function () {
    var passwordField = this.view.elements.passwordField;
  	var passwordError = this.view.elements.passwordError;

  	if (passwordField.val().length > 5) {
      this.view.setVisible(passwordError, false);
  		return 1;
  	}

    this.view.setVisible(passwordError, true);
    this.view.setText(passwordError, "A senha deve ter mais de 5 caracteres");
		return 0;
  },
  
  checkUserModeCheckbox: function () {
    if (this.view.elements.isOwnerCheckbox.is(':checked') ||
        this.view.elements.isHostCheckbox.is(':checked')) {
        this.view.setText(this.view.elements.checkBoxError, "");
        this.view.setVisible(this.view.elements.checkBoxError, true);
        return 1;
      } else {
        this.view.setText(this.view.elements.checkBoxError, "Selecione ao menos 1 dos modos de usuário.");
        this.view.setVisible(this.view.elements.checkBoxError, true);
        return 0;
      }
  },

  registerUser: function () {
  	
    if (this.checkName() && this.checkEmail() && this.checkCity() && this.checkUserModeCheckbox() && this.checkPasswordLength() && this.checkPasswordConsistency()) {
      var name = this.view.elements.nameField.val();
      var email = this.view.elements.emailField.val();
      var city = this.view.elements.cityField.val();
      var password = this.view.elements.passwordField.val();
      var birthDate = "00/00/00";
      var isHostUser = this.view.elements.passwordField.val();
      var isOwnerUser = this.view.elements.isOwnerCheckbox.is(':checked');
      var isHostUser = this.view.elements.isHostCheckbox.is(':checked');
      var isFiscalUser = false;
    
  		var user = new User(
        name,
        email,
        password,
        city,
        birthDate,
        isHostUser,
        isOwnerUser,
        isFiscalUser
      );
      
      // USER CRIADO, SÓ FALTA BOTAR NO BD
      
      window.location.replace("../templates/home.html");
    }
  },

  goBack: function () {
    window.location.replace("../templates/index.html");
  }
};

$(function () {
  var view = new RegisterView({
    'nameField' : $('#nameField'),
    'nameError' : $('#nameError'),
    'emailField' : $('#emailField'),
    'emailError' : $('#emailError'),
    'cityField' : $('#cityField'),
    'cityError' : $('#cityError'),
    'passwordField' : $('#passwordField'),
    'passwordError' : $('#passwordError'),
    'confirmPasswordField' : $('#confirmPasswordField'),
    'isOwnerCheckbox' : $('#isOwnerCheckbox'),
    'isHostCheckbox' : $('#isHostCheckbox'),
    'checkBoxError' : $('#checkBoxError'),
    'cityError' : $('#cityError'),
    'registerButton' : $('#registerButton'),
    'closeButton' : $('#closeButton')
  });
  var controller = new RegisterController(view);
});
