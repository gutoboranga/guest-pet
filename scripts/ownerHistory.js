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
      for (var i = 0; i < history.length; i++) {
        var transaction = history[i];
        
        var host = "Host: " + transaction.hostEmail + '<br/>';
        var pet = "Pet: " + transaction.pet.name + '<br/>';
        var home = "Residência: " + transaction.home.name + '<br/>';
        var period = "Período: " + transaction.period.initialDate.toStr() + " - " + transaction.period.finalDate.toStr() + '<br/>';
        var value = "Valor: " + transaction.value.toString() + '<br/>';
        
        list.append($('<li><p>' + host + pet + home + period + value + '</p></li>'));
      }
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
    
    var view = new OwnerHistoryView({
      'ownerHistoryList' : $('#ownerHistoryList'),
      'ownerHistory' : $('#ownerHistory')
    });
    
    controller = new OwnerHistoryController(user, view);
    controller.view.show(user.ownerHistory);
  });
});
