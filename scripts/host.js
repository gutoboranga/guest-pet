function HostView(elements) {
    this.elements = elements;
    
    // this.loginButtonClicked = new Event(this);
    
    // var _this = this;
        
    // this.elements.loginButton.click(function (e) {
    //     _this.loginButtonClicked.notify();
    // });
}

HostView.prototype = {
  show: function () {
    return "<h1>host, porra</h1>";
  }
};

function HostController(view) {
    this.view = view;
    var _this = this;
    
    // _this.view.homeButtonClicked.attach(function (sender, args) {
    //     console.log("will go home");
    //     _this.goToPage("home");
    // });
}

HostController.prototype = {
  // goToPage: function (page) {
  //   window.location.replace("../templates/" + page + ".html");
  // }
};