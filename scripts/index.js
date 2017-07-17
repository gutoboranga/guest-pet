function hasUserInCookies(users) {
  var i = 0;
  var cookie = document.cookie;
  var found = false;

  while (i < users.length) {
    if (cookie == users[i].name) {
      found = true;
    }
    i++;
  }
  return found;
}

/*
 * View: Responsável por mostrar coisas e pela interação do usuário (que disparam eventos)
 */
function IndexView(elements) {
    this.elements = elements;
    
    this.aboutButtonClicked = new Event(this);
    this.registerButtonClicked = new Event(this);
    this.loginButtonClicked = new Event(this);
    
    var _this = this;
    
    //
    // Abaixo faz o link dos listeners aos elementos HTML que a view recebeu na inicialização
    //
    // Ao clicar no botão home, por exemplo, dispara uma notificação, que é
    // escutada pelo Controller, que tomará as ações necessárias
    //
    this.elements.aboutButton.click(function () {
        _this.aboutButtonClicked.notify();
    });
    this.elements.registerButton.click(function () {
        _this.registerButtonClicked.notify();
    });
    this.elements.loginButton.click(function (e) {
        _this.loginButtonClicked.notify();
    });
}

//
// IndexView.prototype indica as funções que a View terá.
//
// Neste caso, IndexView não possui nenhuma função, pois ela é estática.
//
IndexView.prototype = {};

/*
 * Controller: Gerencia os eventos (manda na porra toda)
 */
function IndexController(users, view) {
    this.users = users;
    this.view = view;
    var _this = this;
    
    // Eventos da View para os quais a Controller vai executar uma ação em resposta
    _this.view.aboutButtonClicked.attach(function (sender, args) {
        _this.goToPage("about");
    });
    _this.view.registerButtonClicked.attach(function (sender, args) {
        _this.goToPage("register");
    });
    _this.view.loginButtonClicked.attach(function (sender, args) {
        var destinationPage = "login";
        
        if (hasUserInCookies(_this.users)) {
          destinationPage = "home";
        }
        _this.goToPage(destinationPage);
    });
}

//
// IndexController, por sua vez possui uma ação apenas, que é ir para outras
// páginas, quando algum botão/link é clicado
//
IndexController.prototype = {
  goToPage: function (page) {
    window.location.replace("../templates/" + page + ".html");
  }
};

//
// Aqui termina a declaração da View e Controller Index
//
// Instancia uma View e uma Controller para que o fluxo comece
//

$(function () {
  getUsers(function (result) {
    var users = result;
    
    var view = new IndexView({
      'aboutButton' : $('#aboutButton'),
      'registerButton' : $('#registerButton'),
      'loginButton' : $('#loginButton')
    });

    var controller = new IndexController(users, view);
  });
});