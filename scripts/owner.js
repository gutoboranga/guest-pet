function OwnerView(elements) {
    this.elements = elements;
    
    // this.loginButtonClicked = new Event(this);
    //
    // var _this = this;
    //
    // this.elements.loginButton.click(function (e) {
    //     _this.loginButtonClicked.notify();
    // });
}

OwnerView.prototype = {
  show: function () {
    return "<h1>Isso aqui é coisa do owner</h1>";
  }
};

function OwnerController(view) {
    this.view = view;
    var _this = this;
    
    // _this.view.homeButtonClicked.attach(function (sender, args) {
    //     console.log("will go home");
    //     _this.goToPage("home");
    // });
}

OwnerController.prototype = {
  // goToPage: function (page) {
  //   window.location.replace("../templates/" + page + ".html");
  // }
};