function HostView(elements) {
    this.elements = elements;
}

HostView.prototype = {
  show: function (element) {
    $.get("../templates/host.html", function(content) {
      element.html(content);
    });
  }
};

function HostController(view) {
    this.view = view;
    var _this = this;
}

HostController.prototype = {};