function OwnerView() {
  this.elements = {
    'buttonId' : $('#buttonId')
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
      'buttonId' : $('#buttonId')
    };
    
    var _this = this;
    this.elements.buttonId.click(function (e) {
      _this.buttonIdClicked.notify();
    });
  },
  
  show: function (element) {
    var _this = this;
    
    $.get("../templates/owner.html", function(content) {
      element.html(content);
      
      _this.resetElements();
    });
  }
};

function OwnerController(view) {
    this.view = view;
    var _this = this;
    
    _this.view.buttonIdClicked.attach(function (sender, args) {
        _this.printSomething();
    });
}

OwnerController.prototype = {
  printSomething: function () {
    console.log("something");
  }
};