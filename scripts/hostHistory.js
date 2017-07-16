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

function HostHistoryView(elements) {
  this.elements = elements;
  
  var _this = this;
}

HostHistoryView.prototype = {
  show : function (history) {
    this.rebuildList(history);
  },
  
  rebuildList : function (history) {
    var list = this.elements.hostHistory;
    list.html('');
    console.log('rebuilding hostHistory list');
    if (history.length > 0) {
      console.log('aí tem coisa');
      console.log(history.length);
      for (var i = 0; i < history.length; i++) {
        var transaction = history[i];
        // console.log(transaction.pet.name);
        var owner = "Owner: " + transaction.ownerEmail + '<br/>';
        var pet = "Pet: " + transaction.pet.name + '<br/>';
        var home = "Residência: " + transaction.home.name + '<br/>';
        var period = "Período: " + transaction.period.initialDate.toStr() + " - " + transaction.period.finalDate.toStr() + '<br/>';
        var value = "Valor: " + transaction.value.toString() + '<br/>';
        list.append($('<li><p>' + owner + pet + home + period + value + '</p></li>'));
        // list.append($('<li><p>' + owner + pet + '</p></li>'));
      }
    } else {
      var message = 'Você ainda não hospedou nenhum animal.<br>Cheque suas notificações pra ver se há requisições para suas residências!';
      this.elements.hostHistoryContainer.html('');
      this.elements.hostHistoryContainer.append($('<h3>' + message + '</h3>'))
    }
  }
};

function HostHistoryController(user, view) {
  this.user = user;
  this.view = view;
}

HostHistoryController.prototype = {};

$(document).ready(function () {
  var view = new HostHistoryView({
    'hostHistoryContainer' : $('#hostHistoryContainer'),
    'hostHistory' : $('#hostHistory')
  });
  
  var user = findUser();
  
  controller = new HostHistoryController(user, view);
  controller.view.show(user.hostHistory);
});