/*
 * View
 */
function LoginView(elements) {
    this.elements = elements;

    var _this = this;

    this.loginButtonClicked = new Event(this);
		this.registerButtonClicked = new Event(this);

    // attach listeners to HTML controls
    this.elements.loginButton.click(function (e) {
        _this.loginButtonClicked.notify();
    });
    this.elements.registerButton.click(function () {
       _this.registerButtonClicked.notify();
    });
}

LoginView.prototype = {
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
function LoginController(users, view) {
    this.users = users;
    this.view = view;

    var _this = this;

    // Eventos da View para os quais a Controller vai executar uma ação em resposta
    this.view.loginButtonClicked.attach(function (sender, args) {
        _this.login();
    });

    this.view.registerButtonClicked.attach(function () {
        _this.goToRegisterScreen();
    });
    //console.log("deu attach no register");
}

LoginController.prototype = {

	login: function () {
		var found = 0;
		var i = 0;
    
		while (i < this.users.length && found == 0) {
      // console.log(this.users[i].name);
			if (this.users[i].name == this.view.elements.loginField.val()) {
				found = 1;
			}
			i++;
		}

		if (found == 0) { // nao achou
			this.view.setText(this.view.elements.userError, "Usuário não cadastrado");
			this.view.setVisible(this.view.elements.userError, true);
			this.view.setVisible(this.view.elements.passwordError, false);
		}

		else {	// achou

			i--;	// corrige o i que foi a mais
			if (this.users[i].password == this.view.elements.passwordField.val()) {	// senha ok
				this.view.setVisible(this.view.elements.userError, false);
				this.view.setVisible(this.view.elements.passwordError, false);
        document.cookie = this.users[i].name;
				window.location.replace("../templates/home.html");
			}

			else {	// senha errada
					this.view.setVisible(this.view.elements.passwordError, true);
					this.view.setText(this.view.elements.passwordError, "Senha incorreta");
					this.view.setVisible(this.view.elements.userError, false);
				}
		}

	},

  goToRegisterScreen: function () {
		window.location.replace("../templates/register.html");
	}
};

$(function () {
  getUsers(function (result) {
    var users = result;
    // console.log(users);
    
    var view = new LoginView({
      'loginField' : $('#loginField'),
      'userError' : $('#userError'),
      'passwordField' : $('#passwordField'),
      'passwordError' : $('#passwordError'),
      'loginButton' : $('#loginButton'),
      'registerButton' : $('#registerButton')
    });
    var controller = new LoginController(users, view);
  });
});
