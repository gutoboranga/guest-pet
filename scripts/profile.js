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

function ProfileView(elements) {
    this.elements = elements;

    this.logoutButtonClicked = new Event(this);
    this.ownerBoxClicked = new Event(this);
    this.hostBoxClicked = new Event(this);

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

}

ProfileView.prototype = {
  setUser: function (user) {
    this.elements.name.text(user.name);
    this.elements.email.text(user.email);
    this.elements.city.text(user.city);
    console.log(user);

    if (user.isOwnerUser) {
      this.elements.owner.prop('checked', true);
    }

    if (user.isHostUser) {
      this.elements.host.prop('checked', true);
    }
  }
};

function ProfileController(user, view) {
    this.user = user;
    this.view = view;

    this.view.setUser(user);

    var _this = this;

    _this.view.logoutButtonClicked.attach(function (sender, args) {
                                          _this.logout();
                                          });

    _this.view.ownerBoxClicked.attach(function (sender, args) {
                                          _this.toggleOwner();
                                          });

    _this.view.hostBoxClicked.attach(function (sender, args) {
                                          _this.toggleHost();
                                          });
}

ProfileController.prototype = {
logout: function () {
    console.log("will logout");
    document.cookie = this.user.name + '; expires=Thu, 01-Jan-70 00:00:01 GMT;';
    location.replace("../templates/index.html");
},

// essas funçoes tao implementadas mas precisam da persistencia de dados pra funcionarem mesmo
toggleOwner: function() {

  if (this.view.elements.owner.is(':checked')) {
    this.user.isOwnerUser = true;
  }

  else {
    this.user.isOwnerUser = false;
  }
},

toggleHost: function() {
  if (this.view.elements.host.is(':checked')) {
    this.user.isHostUser = true;
  }

  else {
    this.user.isHostUser = false;
  }
}

};

$(function () {
  var view = new ProfileView({
                          'name' : $('#name'),
                          'email' : $('#email'),
                          'city' : $('#city'),
                          'owner' : $('#ownerCheckbox'),
                          'host' : $('#hostCheckbox'),
                          'logoutButton' : $('#logoutButton'),
                          });
  var user = findUser();
  var controller = new ProfileController(user, view);
  });
