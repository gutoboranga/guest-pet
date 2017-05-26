/*
 * View
 */
function LoginView(elements) {
    this.elements = elements;

    var _this = this;

    this.loginButtonClicked = new Event(this);
		this.registerScreenButtonClicked = new Event(this);


    // attach listeners to HTML controls
    this.elements.loginButton.click(function (e) {
        _this.loginButtonClicked.notify();
    });
    //this.elements.registerScreenButton.click(function () {
      //  _this.registerScreenButtonClicked.notify();
    //});
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
function LoginController(view) {
    this.view = view;

    var _this = this;

    // Eventos da View para os quais a Controller vai executar uma ação em resposta
    this.view.loginButtonClicked.attach(function (sender, args) {
        _this.login();
    });

    this.view.registerScreenButtonClicked.attach(function () {
        _this.goToRegisterScreen();
    });
    //console.log("deu attach no register");
}

LoginController.prototype = {
	
	login: function () {
		
		var found = 0;
		var i = 0;
		
		while (i < users.length && found == 0) {
			if (users[i].nome == this.view.elements.loginField.val()) {
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
			if (users[i].senha == this.view.elements.passwordField.val()) {	// senha ok
				this.view.setVisible(this.view.elements.userError, false);
				this.view.setVisible(this.view.elements.passwordError, false);
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
    var view = new LoginView({
      'loginField' : $('#loginField'),
      'userError' : $('#userError'),
      'passwordField' : $('#passwordField'),
			'passwordError' : $('#passwordError'),
      'loginButton' : $('#loginButton'),
    });
    var controller = new LoginController(view);
});
