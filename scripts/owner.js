function OwnerView() {
  this.elements = {
    'buttonId' : $('#buttonId'),
    'searchHostContainer' : $('#searchHostContainer'),
    'managePetsContainer' : $('#managePetsContainer'),
    'ownerHistoryContainer' : $('#ownerHistoryContainer'),
  };
  
  var _this = this;
  
  this.buttonIdClicked = new Event(this);
  
  this.elements.buttonId.click(function (e) {
    _this.buttonIdClicked.notify();
  });
}

OwnerView.prototype = {
  // esta função refaz o link entre os elementos do html e as ações
  resetElements: function () {
    this.elements = {
      'buttonId' : $('#buttonId'),
      'searchHostContainer' : $('#searchHostContainer'),
      'managePetsContainer' : $('#managePetsContainer'),
      'ownerHistoryContainer' : $('#ownerHistoryContainer'),
    };
    
    var _this = this;
    this.elements.buttonId.click(function (e) {
      _this.buttonIdClicked.notify();
    });
  },
  
  render: function (element, hasOwnerContent) {
    var _this = this;
    
    if (hasOwnerContent) {
      var content = "";
      
      $.get("../templates/owner.html", function(template) {
        element.html(template);
        
        $.get("../templates/searchHosts.html", function(searchComponent) {
          $('#searchHostContainer').html(searchComponent)
        });
        
        $.get("../templates/managePets.html", function(managePetsComponent) {
          $('#managePetsContainer').html(managePetsComponent)
        });
        
        $.get("../templates/ownerHistory.html", function(historyComponent) {
          $('#ownerHistoryContainer').html(historyComponent)
        });
        
        _this.resetElements();
      });
      
    } else {
      $.get("../templates/mode-not-available.html", function(template) {
        element.html('<h1>Owner</h1>');
        element.append(template);
        _this.resetElements();
      });
    }
  }
};

function OwnerController(user, view) {
    this.user = user;
    this.view = view;
    var _this = this;
    
    _this.view.buttonIdClicked.attach(function (sender, args) {
        _this.printSomething();
    });
}

OwnerController.prototype = {
  printSomething: function () {
    console.log("something");
  },
  
  render: function (element) {
    this.view.render(element, this.user.isOwnerUser);
  }
};