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

function NotificationsView(elements) {
    this.elements = elements;
}

NotificationsView.prototype = {
  render: function() {
    this.elements.notificationsContainer.html('bla bla bla');
    this.elements.notificationsList.html('<li>meuzovinho</li>');
    var list = this.elements.notificationsList;
    list.html('');
    
    list.append($('<li>meuzovinho</li>'));
    list.append($('<li>meuzumbago</li>'));
    list.append($('<li>meus testículos</li>'));
    
    console.log(list);
  }
};

function NotificationsController(user, view) {
    this.user = user;
    this.view = view;
    
    this.view.render();
}

NotificationsController.prototype = {
  logout: function () {
      console.log("will logout");
  }
};

$(document).ready(function () {
  var view = new NotificationsView({
    'notificationsContainer' : $('#notificationsContainer'),
    'notificationsList' : $('notificationsList')
  });
  
  var user = findUser();
  var controller = new NotificationsController(user, view);
});
