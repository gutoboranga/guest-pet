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

function ManageHomesView(elements) {
  this.elements = elements;
  
  var _this = this;
  
  this.addHomeButtonClicked = new Event(this);

  // attach listeners to HTML controls
  this.elements.addHomeButton.click(function () {
      _this.addHomeButtonClicked.notify();
  });
  
  var ul = document.getElementById('homesList');
  
  ul.addEventListener('click', function(e) {
    var target = e.target;
    
    if (target.type != "submit") {
      return;
    }
    
    var homeId = target.id;
    
    while (target && target.parentNode !== ul) {
        target = target.parentNode;
        if(!target) { return; }
    }
    
    if (target.tagName === 'LI') {
      var message = 'Tem certeza que deseja excluir esta residência?';
      
      if (confirm(message)) {
        
        getHomeForId(homeId, function (home) {
          if (home != undefined) {
            del('/home', home, function () {
              location.reload();
            });
          }
        });
      }
    }});
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
        var adress = homes[i].street + ', ' + homes[i].number + '<br/>'
        var capacity = homes[i].capacity + '<br/>'
        
        list.append($('<li>' + image + '<p>' + name + adress + capacity + '</p>' + '<button id="' + homes[i]._id +'">Excluir</button>' +  '</li>'));
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

$(function () {
  getUsers(function (result) {
    var users = result;
    var user = findUser(users);
    
    var view = new ManageHomesView({
      'addHomeButton'	:	$('#addHomeButton'),
      'homesListContainer' : $('#homesListContainer'),
      'homesList' : $('#homesList')
    });
    
    getHomesForUserId(user._id, function (result) {
      user.homes = result;
      // console.log(result);
      controller = new ManageHomesController(user, view);
      controller.view.show(user.homes);
    });
  });
});
