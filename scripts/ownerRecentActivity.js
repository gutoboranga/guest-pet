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

function OwnerRecentActivityView(elements, pendencies) {
  this.elements = elements;
  this.userPendencies = pendencies;
  
  var _this = this;
  
  var ul = document.getElementById('ownerRecentActivityList');
  
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
        // console.log("tentou meter no banco, vamos ver");
        getTransactions(function (result) {
          // console.log(result);
          location.reload();
        });
      });
    }
  });
}

OwnerRecentActivityView.prototype = {
  show : function () {
    this.rebuildList(this.userPendencies);
  },
  
  rebuildList : function (activity) {
    
    var list = this.elements.ownerRecentActivityList;
    list.html('');
    
    if (activity.length > 0) {
      activity.forEach(function (transaction, i) {
        var transaction = activity[i];
        
        var period = "Período: " + transaction.initialDate + " - " + transaction.finalDate + '<br/>';
        var value = "Valor: " + transaction.value.toString() + '<br/>';
        var status = "<b>Status:</b> " + transaction.message(OWNER);
        var actions = transaction.actions(OWNER);
        
        getUserById(transaction.hostId, function (result) {
          var host = "Host: " + result.name + '<br/>';
          
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
      this.elements.ownerRecentActivity.html('');
      this.elements.ownerRecentActivity.append($('<h3>' + message + '</h3>'))
    }
  }
};

function OwnerRecentActivityController(user, view) {
  this.user = user;
  this.view = view;
  
  var _this = this;
}

OwnerRecentActivityController.prototype = {};

$(function () {
  getUsers(function (result) {
    var users = result;
    var user = findUser(users);
    
    getTransactionsForUserId(user._id, OWNER, false, function (result) {
      // console.log(result);
      var view = new OwnerRecentActivityView({
        'ownerRecentActivityList' : $('#ownerRecentActivityList'),
        'ownerRecentActivity' : $('#ownerRecentActivity')
      }, result);
      
      controller = new OwnerRecentActivityController(user, view);
      controller.view.show();
    });
  });
});
