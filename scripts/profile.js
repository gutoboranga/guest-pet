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

    var _this = this;

    this.elements.logoutButton.click(function (e) {
                                     _this.logoutButtonClicked.notify();
                                     });
}

ProfileView.prototype = {
  setUser: function (user) {
    this.elements.name.text(user.name);
    this.elements.email.text(user.email);
    this.elements.city.text(user.city);
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
}

ProfileController.prototype = {
logout: function () {
    console.log("will logout");
    document.cookie = this.user.name + '; expires=Thu, 01-Jan-70 00:00:01 GMT;';
    location.replace("../templates/index.html");
}
};

$(function () {
  var view = new ProfileView({
                          'name' : $('#name'),
                          'email' : $('#email'),
                          'city' : $('#city'),
                          'logoutButton' : $('#logoutButton'),
                          });
  var user = findUser();
  console.log(user);
  var controller = new ProfileController(user, view);
  });
