function HostView() {
  this.elements = {
    'hostRecentActivityContainer' : $('#hostRecentActivityContainer'),
    'manageHomesContainer' : $('#manageHomesContainer'),
    'hostHistoryContainer' : $('#hostHistoryContainer')
  };
  
  var _this = this;
}

HostView.prototype = {
  // esta função refaz o link entre os elementos do html e as ações
  resetElements: function () {
    this.elements = {
      'hostRecentActivityContainer' : $('#hostRecentActivityContainer'),
      'manageHomesContainer' : $('#manageHomesContainer'),
      'hostHistoryContainer' : $('#hostHistoryContainer')
    };
  },
  
  render: function (element, hasHostContent) {
    var _this = this;
    
    if (hasHostContent) {
      var content = "";
      
      $.get("../templates/host.html", function(template) {
        element.html(template);
        
        $.get("../templates/hostRecentActivity.html", function(recentActivity) {
          $('#hostRecentActivityContainer').html(recentActivity)
        });
        
        $.get("../templates/manageHomes.html", function(manageHomesComponent) {
          $('#manageHomesContainer').html(manageHomesComponent)
        });
        
        $.get("../templates/hostHistory.html", function(historyComponent) {
          $('#hostHistoryContainer').html(historyComponent)
        });
        
        _this.resetElements();
      });
    } else {
      $.get("../templates/mode-not-available.html", function(template) {
        element.html('<h1>Host</h1>');
        element.append(template);
        _this.resetElements();
      });
    }
  }
};

function HostController(user, view) {
    this.user = user;
    this.view = view;
    var _this = this;
}

HostController.prototype = {
  render: function (element) {
    this.view.render(element, this.user.isHostUser);
  }
};