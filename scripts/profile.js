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

var user = findUser();
console.log(user);
$(document).ready(function(){
$('#name').text(user.name);
                  $('#email').text(user.email);
                  $('#city').text(user.city);
                  });

/*const OWNER = 0;
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
setOptionsClass: function (selected, unselected) {
    selected.attr("class", "user-mode-selected");
    unselected.attr("class", "user-mode");
},
    
setContent: function (container) {
    container.show(this.elements.contentBody);
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
    this.currentMode = OWNER;
    this.view.setContent(ownerController.view);
    this.view.setOptionsClass(this.view.elements.ownerButton, this.view.elements.hostButton);
}

HomeController.prototype = {
logout: function () {
    console.log("will logout");
},
    
switchUser: function (targetMode) {
    if (targetMode == OWNER) {
        this.view.setContent(this.ownerController.view);
        this.view.setOptionsClass(this.view.elements.ownerButton, this.view.elements.hostButton);
    } else {
        this.view.setContent(this.hostController.view);
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
  var user = users[0];
  
  var ownerView = new OwnerView();
  var ownerController = new OwnerController(ownerView);
  
  var hostView = new HostView();
  var hostController = new HostController(hostView);
  
  var controller = new HomeController(user, view, ownerController, hostController);
  });*/
