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

function ManagePetsView(elements) {
  this.elements = elements;
  
  var _this = this;
  
  this.addButtonClicked = new Event(this);

  // attach listeners to HTML controls
  this.elements.addButton.click(function () {
      _this.addButtonClicked.notify();
  });
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
        
        list.append($('<li>' + image + '<p>' + name + species + nature + '</p></li>'));
        console.log(list);
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

$(document).ready(function () {
  var view = new ManagePetsView({
    'addButton'	:	$('#addButton'),
    'petsListContainer' : $('#petsListContainer'),
    'petsList' : $('#petsList')
  });
  
  var user = findUser();
  
  controller = new ManagePetsController(user, view);
  controller.view.show(user.pets);
});