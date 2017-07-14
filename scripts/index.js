/*
 * View: Responsável por mostrar coisas e pela interação do usuário (que disparam eventos)
 */
function IndexView(elements) {
    this.elements = elements;
    
    this.homeButtonClicked = new Event(this);
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
    this.elements.homeButton.click(function () {
        _this.homeButtonClicked.notify();
    });
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
function IndexController(view) {
    this.view = view;
    var _this = this;
    
    // Eventos da View para os quais a Controller vai executar uma ação em resposta
    _this.view.homeButtonClicked.attach(function (sender, args) {
        console.log("will go home");
        _this.goToPage("home");
    });
    _this.view.aboutButtonClicked.attach(function (sender, args) {
        console.log("will go about");
        _this.goToPage("about");
    });
    _this.view.registerButtonClicked.attach(function (sender, args) {
        console.log("will go register");
        _this.goToPage("register");
    });
    _this.view.loginButtonClicked.attach(function (sender, args) {
        console.log("will go login");
        _this.goToPage("login");
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
    var view = new IndexView({
      'homeButton' : $('#homeButton'),
      'aboutButton' : $('#aboutButton'),
      'registerButton' : $('#registerButton'),
      'loginButton' : $('#loginButton')
    });
    var controller = new IndexController(view);
});