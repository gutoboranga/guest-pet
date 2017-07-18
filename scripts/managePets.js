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

function ManagePetsView(elements) {
  this.elements = elements;
  
  var _this = this;
  
  this.addButtonClicked = new Event(this);

  // attach listeners to HTML controls
  this.elements.addButton.click(function () {
      _this.addButtonClicked.notify();
  });
  
  var ul = document.getElementById('petsList');
  
  ul.addEventListener('click', function(e) {
    var target = e.target;
    
    if (target.type != "submit") {
      return;
    }
    
    var petId = target.id;
    
    while (target && target.parentNode !== ul) {
        target = target.parentNode;
        if(!target) { return; }
    }
    
    if (target.tagName === 'LI') {
      var message = 'Tem certeza que deseja excluir este pet?';
      
      if (confirm(message)) {
        
        getPetForId(petId, function (pet) {
          if (pet != undefined) {
            del('/pet', pet, function () {
              location.reload();
            });
          }
        });
      }
    }});
}

ManagePetsView.prototype = {
  show : function (pets) {
    this.rebuildList(pets);
  },
  
  rebuildList : function (pets) {
    var list = this.elements.petsList;
    list.html('');
    
    if (pets.length > 0) {
      for (var i = 0; i < pets.length; i++) {
        var image = '<img src="../images/guestPetLogo.png" class="profilePicture">';
        var name = pets[i].name + '<br/>'
        var species = pets[i].species + '<br/>'
        var nature = pets[i].nature + '<br/>'
        
        // console.log();
        list.append($('<li>' + image + '<p>' + name + species + nature + '</p>' + '<button id="' + pets[i]._id +'">Excluir</button>' +  '</li>'));
      }
    } else {
      var message = 'Você ainda não possui nenhum pet cadastrado.<br>Utilize o botão Adicionar pra cadastrar novos pets.';
      this.elements.petsListContainer.html('');
      this.elements.petsListContainer.append($('<h3>' + message + '</h3>'))
    }
  }
};

function ManagePetsController(user, view) {
  this.user = user;
  this.view = view;
  
  var _this = this;
  
  this.view.addButtonClicked.attach(function (sender, args) {
      _this.createPet();
  });
}

ManagePetsController.prototype = {
  createPet: function () {
    window.location.replace("../templates/createPet.html");
  }
};

$(function () {
  getUsers(function (result) {
    var users = result;
    
    var view = new ManagePetsView({
      'addButton'	:	$('#addButton'),
      'petsListContainer' : $('#petsListContainer'),
      'petsList' : $('#petsList')
    });
    
    var user = findUser(users);
    
    getPetsForUserId(user._id, function (result) {
      user.pets = result;
      controller = new ManagePetsController(user, view);
      controller.view.show(user.pets);
    });
  });
});
