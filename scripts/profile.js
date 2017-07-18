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

function ProfileModel(owner, host) {
  this.owner = owner;
  this.host = host;
};

function ProfileView(elements) {
  this.elements = elements;
  
  this.logoutButtonClicked = new Event(this);
  this.ownerBoxClicked = new Event(this);
  this.hostBoxClicked = new Event(this);
  this.saveChangesButtonClicked = new Event(this);
  
  var _this = this;
  
  this.elements.logoutButton.click(function (e) {
    _this.logoutButtonClicked.notify();
  });
  this.elements.owner.click(function (e) {
    _this.ownerBoxClicked.notify();
  });
  this.elements.host.click(function (e) {
    _this.hostBoxClicked.notify();
  });
  this.elements.saveChangesButton.click(function (e) {
    _this.saveChangesButtonClicked.notify();
  });
}

ProfileView.prototype = {
  setUser: function (user) {
    this.elements.name.text(user.name);
    this.elements.email.text(user.email);
    this.elements.city.text(user.city);
    
    if (user.isOwnerUser) {
      this.elements.owner.prop('checked', true);
    }
    
    if (user.isHostUser) {
      this.elements.host.prop('checked', true);
    }
  }
};

function ProfileController(model, user, view) {
  this.model = model;
  this.user = user;
  this.view = view;
  
  this.view.setUser(user);
  
  var _this = this;
  
  this.view.logoutButtonClicked.attach(function (sender, args) {
    _this.logout();
  });
  
  this.view.ownerBoxClicked.attach(function (sender, args) {
    _this.toggleMode();
  });
  
  this.view.hostBoxClicked.attach(function (sender, args) {
    _this.toggleMode();
  });
  
  this.view.saveChangesButtonClicked.attach(function (sender, args) {
    _this.saveChanges();
  });
}

ProfileController.prototype = {
  logout: function () {
    document.cookie = this.user.name + '; expires=Thu, 01-Jan-70 00:00:01 GMT;';
    location.replace("../templates/index.html");
  },
  
  toggleMode: function() {
    var owner = this.view.elements.owner.is(':checked');
    var host = this.view.elements.host.is(':checked');
    
    if (owner || host) {
      this.model.owner = owner;
      this.model.host = host;
    } else {
      alert('Ao menos um dos tipos de usuário devem ser selecionados. Suas alterações não serão salvas.');
      this.view.elements.owner.prop('checked', this.model.owner);
      this.view.elements.host.prop('checked', this.model.host);
    }
  },
  
  saveChanges : function() {
    var req_body = {
      'userId' : this.user._id,
      'owner' : this.model.owner,
      'host' : this.model.host
    };
    
    put('/userChangeMode', req_body, function () {
      location.reload();
    })
  }
};

$(function () {
  getUsers(function (result) {
    var users = result;
    var user = findUser(users);
    
    getTransactionsForUserId(user._id, HOST, true, function (result) {
      var model = new ProfileModel(user.isOwnerUser, user.isHostUser);
      var view = new ProfileView({
        'name' : $('#name'),
        'email' : $('#email'),
        'city' : $('#city'),
        'owner' : $('#ownerCheckbox'),
        'host' : $('#hostCheckbox'),
        'saveChangesButton' : $('#saveChangesButton'),
        'logoutButton' : $('#logoutButton'),
      });
      
      var controller = new ProfileController(model, user, view);
    });
  });
});
