function OwnerView() {
  // this.elements = [title];
}

OwnerView.prototype = {
  show: function (element) {
    $.get("../templates/owner.html", function(content) {
      element.html(content);
    });
  }
};

function OwnerController(view) {
    this.view = view;
    var _this = this;
}

OwnerController.prototype = {};