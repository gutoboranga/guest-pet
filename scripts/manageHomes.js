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

function ManageHomesView(elements) {
  this.elements = elements;
  
  var _this = this;
  
  this.addHomeButtonClicked = new Event(this);

  // attach listeners to HTML controls
  this.elements.addHomeButton.click(function () {
      _this.addHomeButtonClicked.notify();
  });
}

ManageHomesView.prototype = {
  show : function (homes) {
    this.rebuildList(homes);
  },
  
  rebuildList : function (homes) {
    var list = this.elements.homesList;
    list.html('');
    
    if (homes.length > 0) {
      for (var i = 0; i < homes.length; i++) {
        var image = '<img src="../images/guestPetLogo.png" class="profilePicture">';
        var name = homes[i].name + '<br/>'
        var adress = homes[i].adress.street + ', ' + homes[i].adress.number + '<br/>'
        var nature = homes[i].capacity + '<br/>'
        
        list.append($('<li>' + image + '<p>' + name + adress + nature + '</p></li>'));
      }
    } else {
      var message = 'Você ainda não possui residência cadastrada.<br>Utilize o botão Adicionar para cadastrar novas.';
      this.elements.homesListContainer.html('');
      this.elements.homesListContainer.append($('<h3>' + message + '</h3>'))
    }
  }
};

function ManageHomesController(user, view) {
  this.user = user;
  this.view = view;
  
  var _this = this;
  
  this.view.addHomeButtonClicked.attach(function (sender, args) {
      _this.createHome();
  });
}

ManageHomesController.prototype = {
  createHome: function () {
    window.location.replace("../templates/createHome.html");
  }
};

$(document).ready(function () {
  var view = new ManageHomesView({
    'addHomeButton'	:	$('#addHomeButton'),
    'homesListContainer' : $('#homesListContainer'),
    'homesList' : $('#homesList')
  });
  
  var user = findUser();
  
  controller = new ManageHomesController(user, view);
  controller.view.show(user.homes);
});