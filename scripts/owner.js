function OwnerView() {
  this.elements = {
    'buttonId' : $('#buttonId'),
    'searchHostContainer' : $('searchHostContainer')
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
      'searchHostContainer' : $('#searchHostContainer')
    };
    
    var _this = this;
    this.elements.buttonId.click(function (e) {
      _this.buttonIdClicked.notify();
    });
  },
  
  show: function (element) {
    var _this = this;
    var content = "";
    
    $.get("../templates/owner.html", function(template) {
      $.get("../templates/searchHosts.html", function(searchComponent) {
        element.html(template);
        $('#searchHostContainer').html(searchComponent)
        
        _this.resetElements();
      });
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