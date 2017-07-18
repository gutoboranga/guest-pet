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

function HostHistoryView(elements) {
  this.elements = elements;
  
  var _this = this;
}

HostHistoryView.prototype = {
  show : function (history) {
    this.rebuildList(history);
  },
  
  rebuildList : function (history) {
    var list = this.elements.hostHistoryList;
    list.html('');
    
    if (history.length > 0) {
      history.forEach(function (transaction, i) {
        var period = "Período: " + transaction.initialDate + " - " + transaction.finalDate + '<br/>';
        var value = "Valor: " + transaction.value.toString() + '<br/>';
        
        getUserById(transaction.ownerId, function (result) {
          var owner = "Owner: " + result.name + '<br/>';
          
          getPetForId(transaction.petId, function (petResult) {
            var pet = "Pet: " + petResult.name + '<br/>';
          
            getHomeForId(transaction.homeId, function (homeResult) {
              var home = "Residência: " + homeResult.name + '<br/>';
              list.append($('<li><p>' + owner + pet + home + period + value + '</p></li>'));
            });
          });
        });
      });
    } else {
      var message = 'Você ainda não hospedou nenhum animal.<br>Cheque suas notificações pra ver se há requisições para suas residências!';
      this.elements.hostHistory.html('');
      this.elements.hostHistory.append($('<h3>' + message + '</h3>'))
    }
  }
};

function HostHistoryController(user, view) {
  this.user = user;
  this.view = view;
}

HostHistoryController.prototype = {};

$(function () {
  getUsers(function (result) {
    var users = result;
    var user = findUser(users);
    
    getTransactionsForUserId(user._id, HOST, true, function (result) {
      var view = new HostHistoryView ({
        'hostHistoryList' : $('#hostHistoryList'),
        'hostHistory' : $('#hostHistory')
      });
      
      controller = new HostHistoryController(user, view);
      controller.view.show(result);
    });
  });
});
