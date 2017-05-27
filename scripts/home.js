const OWNER = 0;
const HOST = 1;

function HomeView(elements) {
    this.elements = elements;
    
    this.logoutButtonClicked = new Event(this);
    this.ownerButtonClicked = new Event(this);
    this.hostButtonClicked = new Event(this);
    
    var _this = this;
        
    this.elements.logoutButton.click(function (e) {
        _this.logoutButtonClicked.notify();
    });
    this.elements.ownerButton.click(function (e) {
        _this.ownerButtonClicked.notify();
    });
    this.elements.hostButton.click(function (e) {
        _this.hostButtonClicked.notify();
    });
}

HomeView.prototype = {
  setContent: function (view) {
    view.show(this.elements.contentBody);
  }
};

function HomeController(user, view, ownerController, hostController) {
    this.user = user;
    this.view = view;
    this.ownerController = ownerController;
    this.hostController = hostController;
    
    var _this = this;
    
    _this.view.logoutButtonClicked.attach(function (sender, args) {
        console.log("will logout");
        _this.logout();
    });
    this.view.ownerButtonClicked.attach(function (sender, args) {
        _this.switchUser(OWNER);
    });
    this.view.hostButtonClicked.attach(function (sender, args) {
        _this.switchUser(HOST);
    });
    
    // no futuro aqui podemos checar qual o tipo do usuário pra iniciar mostrando a view certa.
    // por enquanto mostra owner direto
    this.currentMode = OWNER;
    this.view.setContent(ownerController.view);
}

HomeController.prototype = {
  logout: function () {
    console.log("will logout");
  },
  
  switchUser: function (mode) {
    if (mode == OWNER) {
      this.view.setContent(this.ownerController.view);
    } else {
      this.view.setContent(this.hostController.view);
    }
  }
};

$(function () {
    var view = new HomeView({
      'logoutButton' : $('#logoutButton'),
      'ownerButton' : $('#ownerButton'),
      'hostButton' : $('#hostButton'),
      'contentBody' : $('#contentBody')
    });
    //just for test:
    var user = users[0];
    
    var ownerView = new OwnerView();
    var ownerController = new OwnerController(ownerView);
    
    var hostView = new HostView();
    var hostController = new HostController(hostView);
    
    var controller = new HomeController(user, view, ownerController, hostController);
});