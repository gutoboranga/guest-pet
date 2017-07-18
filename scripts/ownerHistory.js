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

function OwnerHistoryView(elements) {
  this.elements = elements;
  
  var _this = this;
}

OwnerHistoryView.prototype = {
  show : function (history) {
    this.rebuildList(history);
  },
  
  rebuildList : function (history) {
    var list = this.elements.ownerHistoryList;
    list.html('');
    
    if (history.length > 0) {
      history.forEach(function (transaction, i) {
        var period = "Período: " + transaction.initialDate + " - " + transaction.finalDate + '<br/>';
        var value = "Valor: " + transaction.value.toString() + '<br/>';
        
        getUserById(transaction.hostId, function (result) {
          var host = "Host: " + result.name + '<br/>';
          
          getPetForId(transaction.petId, function (petResult) {
            var pet = "Pet: " + petResult.name + '<br/>';
          
            getHomeForId(transaction.homeId, function (homeResult) {
              var home = "Residência: " + homeResult.name + '<br/>';
              list.append($('<li><p>' + host + pet + home + period + value + '</p></li>'));
            });
          });
        });
      });
    } else {
      var message = 'Você ainda não hospedou seus pets em nenhuma residência.<br>Utilize a busca acima para começar a desfrutar das vantagens de GuestPet!';
      this.elements.ownerHistory.html('');
      this.elements.ownerHistory.append($('<h3>' + message + '</h3>'))
    }
  }
};

function OwnerHistoryController(user, view) {
  this.user = user;
  this.view = view;
}

OwnerHistoryController.prototype = {};

$(function () {
  getUsers(function (result) {
    var users = result;
    var user = findUser(users);
    
    getTransactionsForUserId(user._id, OWNER, true, function (result) {
      var view = new OwnerHistoryView({
        'ownerHistoryList' : $('#ownerHistoryList'),
        'ownerHistory' : $('#ownerHistory')
      });
      
      controller = new OwnerHistoryController(user, view);
      controller.view.show(result);
    });
  });
});
