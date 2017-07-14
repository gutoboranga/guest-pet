const OWNER = 0;
const HOST = 1;

function findUser() {
  
  var i = 0;
  var cookie = document.cookie;
  
  while (i < users.length) {
    if (cookie == users[i].name) {
      return users[i];
    }
    i++;
  }
}

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
  setOptionsClass: function (selected, unselected) {
    selected.attr("class", "user-mode-selected");
    unselected.attr("class", "user-mode");
  },
  
  setContent: function (subController) {
    subController.render(this.elements.contentBody);
  }
};

function HomeController(user, view, ownerController, hostController) {
    this.user = user;
    this.view = view;
    this.ownerController = ownerController;
    this.hostController = hostController;
    
    var _this = this;
    
    _this.view.logoutButtonClicked.attach(function (sender, args) {
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
    if (this.user.isOwnerUser) {
      this.view.setContent(ownerController);
      this.view.setOptionsClass(this.view.elements.ownerButton, this.view.elements.hostButton);
    } else {
      this.view.setContent(hostController);
      this.view.setOptionsClass(this.view.elements.hostButton, this.view.elements.ownerButton);
    }
}

HomeController.prototype = {
  logout: function () {
    console.log("will logout");
    document.cookie = this.user.name + '; expires=Thu, 01-Jan-70 00:00:01 GMT;';
    location.replace("../templates/index.html");
  },
  
  switchUser: function (targetMode) {
    if (targetMode == OWNER) {
      this.view.setContent(this.ownerController);
      this.view.setOptionsClass(this.view.elements.ownerButton, this.view.elements.hostButton);
    } else {
      this.view.setContent(this.hostController);
      this.view.setOptionsClass(this.view.elements.hostButton, this.view.elements.ownerButton);
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
    var user = findUser();
  
    var ownerView = new OwnerView();
    var ownerController = new OwnerController(user, ownerView);
    
    var hostView = new HostView();
    var hostController = new HostController(user, hostView);
    
    var controller = new HomeController(user, view, ownerController, hostController);
});
