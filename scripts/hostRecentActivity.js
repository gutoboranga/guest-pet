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
        
      var req_body = {
        'transactionId' : _this.userPendencies[index]._id,
        'newStatus' : newStatus
      };
      
      put('/transactionNewStatus', req_body, function () {
        getTransactions(function (result) {
          location.reload();
        });
      });
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
      activity.forEach(function (transaction, i) {
        var period = "Período: " + transaction.initialDate + " - " + transaction.finalDate + '<br/>';
        var value = "Valor: " + transaction.value.toString() + '<br/>';
        var status = "<b>Status:</b> " + transaction.message(HOST);
        var actions = transaction.actions(HOST);
        
        getUserById(transaction.ownerId, function (result) {
          var host = "Owner: " + result.name + '<br/>';
          
          getPetForId(transaction.petId, function (petResult) {
            var pet = "Pet: " + petResult.name + '<br/>';
          
            getHomeForId(transaction.homeId, function (homeResult) {
              var home = "Residência: " + homeResult.name + '<br/>';
              list.append($('<li id="' + i + '"><p>' + host + pet + home + period + value + status + actions + '</p></li>'));
            });
          });
        });
      });
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
    
    getTransactionsForUserId(user._id, HOST, false, function (result) {
      var view = new HostRecentActivityView({
        'hostRecentActivityList' : $('#hostRecentActivityList'),
        'hostRecentActivity' : $('#hostRecentActivity')
      }, result);
      
      controller = new HostRecentActivityController(user, view);
      controller.view.show();
    });
  });
});
