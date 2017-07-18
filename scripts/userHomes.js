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

function ListModel() {
    this._list = [];
}

/**
 * The View. View presents the model and provides
 * the UI events. The controller is attached to these
 * events to handle the user interaction.
 */
function ListView(user, model, elements) {
    this.elements = elements;
		this.model = model;
    this.user = user;
		
		var _this = this;

    this.logoutButtonClicked = new Event(this);
    this.ownerBoxClicked = new Event(this);
    this.hostBoxClicked = new Event(this);

    var ul = document.getElementById('list');
    
    ul.addEventListener('click', function(e) {
      var target = e.target;
      
      if (target.type != "submit") {
        return;
      }
      
      var newStatus = target.id;
      var index = target.id;
      
      while (target && target.parentNode !== ul) {
          target = target.parentNode;
          if(!target) { return; }
      }
      if (target.tagName === 'LI') {
        var li_id = target.id;
        
        if (index.toString().length < 10) {
          // quer usar casa mas ainda não disse pra qual pet
          getPetsForUserId(_this.user._id, function (pets) {
            if (pets.length > 0) {
              var tag = '#choosePet' + index.toString();
              data = '<br>Escolha um pet para ir:<br>';
              
              pets.forEach(function (pet, i) {
                data += '<button id="' + pet._id + '">' + pet.name + '</button>  ';
              });
              
              var buttonToHide = "#" + index.toString();
              
              $(buttonToHide).hide();
              $(tag).html(data);
              
            } else {
              var tag = '#choosePet' + index.toString();
              $(tag).html('<br>Você não possui nenhum pet :(<br>');
            }
          });
        // selecionou um pet
        } else {
          var petId = index;
          
          // vai procurar o pet com aquele id
          getPetForId(petId, function (pet) {
            if (pet != undefined) {
              var homeIndex = li_id.split('li')[1];
              var home = _this.model.list[homeIndex];
              var message = 'Tem certeza que deseja solicitar a residência ' + home.name + '?';
              
              if (confirm(message)) {
                
                var transaction = new Transaction(WAITING_HOST_ANSWER,
                                              "aa/mm/yyyy",
                                              "aa/mm/yyyy",
                                              home.value,
                                              pet._id,
                                              home._id,
                                              _this.user._id,
                                              home.userId);
                
                postAjax('/transaction', transaction, function() {
                  location.replace("../templates/home.html");
                });
              }
            }
          });
        }
      }
    });
}

ListView.prototype = {

    setUser: function (user) {
      this.elements.usersHome.text("Residências de " + user.name);
    },

    show : function () {
        this.rebuildList();
    },

    rebuildList : function () {

    		var found = this.model.list;
    		var list = this.elements.list;
    		list.html('');

        if (found.length > 0) {
      		for (var i = 0; i < found.length; i++) {
      			var image = '<img src="../images/guestPetLogo.png" class="profilePicture">';
      			var info = '<p>' + found[i].name + '<br/>' + found[i].city + '<br/>'
             + found[i].currentOccupation + '/' + found[i].capacity + '<br/>'
             + found[i].description + '<br/>' + 'R$' + found[i].value + '/dia';
            var slotToChoosePet = '<div id="' + 'choosePet' + i + '"></div>';
            var button = '<br><br><button id="' + i + '">Solicitar residência</button>';
      			list.append($('<li id="li' + i + '">' + image + info + slotToChoosePet + button + '</p></li>'));
          }
        }

        else {
          list.append($('<li class="searchResult">Nenhuma residência disponível</li>'));
        }
    }
};

/**
 * The Controller. Controller responds to user actions and
 * invokes changes on the model.
 */
function ListController(user, hostUser, view) {
    var _this = this;

    this.user = user;
    this.hostUser = hostUser;
    this.view = view;
		this.list = [];

    this.view.setUser(hostUser);
}

ListController.prototype = {

		search: function () {
      var found = [];
      var _this = this;
      
      getHomesForUserId(this.hostUser._id, function (homes) {
        homes.forEach(function (home, i) {
          if (home.isAvailable()) {
            found.push(home);
          }
          if (i == (homes.length - 1)) {
            _this.view.model.list = found;
        		_this.view.show();
          }
        });
      });
    },

    updateSelected : function (index) {
        this._model.setSelectedIndex(index);
    }
};

function userByName(username) {

  for (var i = 0; i<users.length;i++) {
    if (users[i].name == username) {
      return users[i];
    }
  }
}

$(function () {
  getUsers(function (users) {
    var user = findUser(users);
    
    if(user != undefined) {
      var url = document.location;
      var userName = url.toString().split("=")[1];
      
      getUserByName(userName, function (hostUser) {
        if (hostUser != undefined) {
          var model = new ListModel();
          var view = new ListView(user, model, {
              'usersHome' : $('#title'),
              'list' : $('#list')
          });
          
          var controller = new ListController(user, hostUser, view);
          
          controller.search();
        } else {
          console.log("hostUser undefined @ userHomes.js");
        }
      });
    } else {
      console.log("user undefined @ userHomes.js");
    }
  });
});
