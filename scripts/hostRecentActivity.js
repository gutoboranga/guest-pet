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

function HostRecentActivityView(elements, pendencies) {
  this.elements = elements;
  this.userPendencies = pendencies;
  
  var _this = this;
  
  var ul = document.getElementById('hostRecentActivityList');
  
  ul.addEventListener('click', function(e) {
    var target = e.target;
    
    if (target.type != "submit") {
      return;
    }
    
    var newStatus = target.id;
    var index;
    
    while (target && target.parentNode !== ul) {
        target = target.parentNode;
        if(!target) { return; }
    }
    if (target.tagName === 'LI'){
        index = target.id;
        _this.userPendencies[index].setStatus(parseInt(newStatus)); // acho que vai ter que acessar bd pra atualizar estado no user host também
        _this.show();
    }
  });
}

HostRecentActivityView.prototype = {
  show : function () {
    this.rebuildList(this.userPendencies);
  },
  
  rebuildList : function (activity) {
    var list = this.elements.hostRecentActivityList;
    list.html('');
    
    if (activity.length > 0) {
      for (var i = 0; i < activity.length; i++) {
        var pendency = activity[i];
        var transaction = pendency.transaction;
        
        var owner = "Owner: " + transaction.ownerEmail + '<br/>';
        var pet = "Pet: " + transaction.pet.name + '<br/>';
        var home = "Residência: " + transaction.home.name + '<br/>';
        var period = "Período: " + transaction.period.initialDate.toStr() + " - " + transaction.period.finalDate.toStr() + '<br/>';
        var value = "Valor: " + transaction.value.toString() + '<br/>';
        var status = "<b>Status:</b> " + pendency.message(HOST);
        var actions = pendency.actions(HOST);
        
        list.append($('<li id="' + i + '"><p>' + owner + pet + home + period + value + status + actions + '</p></li>'));
      }
    } else {
      var message = 'Você não possui nenhuma transação em andamento';
      this.elements.hostRecentActivity.html('');
      this.elements.hostRecentActivity.append($('<h3>' + message + '</h3>'))
    }
  }
};

function HostRecentActivityController(user, view) {
  this.user = user;
  this.view = view;
  
  var _this = this;
}

HostRecentActivityController.prototype = {};

$(function () {
  getUsers(function (result) {
    var users = result;
    var user = findUser(users);
    
    var view = new HostRecentActivityView({
      'hostRecentActivityList' : $('#hostRecentActivityList'),
      'hostRecentActivity' : $('#hostRecentActivity')
    }, user.hostPending);
    
    controller = new HostRecentActivityController(user, view);
    controller.view.show();
  });
});
