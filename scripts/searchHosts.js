// model

function ListModel() {
    this._list = [];
}

/**
 * The View. View presents the model and provides
 * the UI events. The controller is attached to these
 * events to handle the user interaction.
 */
function ListView(model, elements) {
    this.elements = elements;
		this.model = model;
		console.log(elements);
		var _this = this;

    this.listModified = new Event(this);
    this.searchButtonClicked = new Event(this);

    // attach listeners to HTML controls
		this.elements.searchButton.click(function () {
				_this.searchButtonClicked.notify();
		});
	
  //  this.elements.list.change(function (e) {
  //      _this.listModified.notify({ index : e.target.selectedIndex });
  //  });
	
}

ListView.prototype = {  
    show : function () {
        this.rebuildList();
    },

    rebuildList : function () {
		var found = this.model.list;
		var list = this.elements.list;
		list.html('');
			for (var i = 0; i < found.length; i++) {
					var image = '<img src="../images/guestPetLogo.png" class="profilePicture">';
					var info = '<p>' + found[i].nome + '<br/>' + found[i].email + '</p>';
					list.append($('<li>' + image + info + '</li>'));
        }
    }
};

/**
 * The Controller. Controller responds to user actions and
 * invokes changes on the model.
 */
function ListController(view) {
    this.view = view;
    this.list = [];

    var _this = this;

    this.view.listModified.attach(function (sender, args) {
        _this.updateSelected(args.index);
    });
		
    this.view.searchButtonClicked.attach(function () {
        _this.search();
    });
}

ListController.prototype = {

		search: function () {
		var found = [];
		for (var i = 0; i < users.length; i++) {
			if (users[i].email == this.view.elements.city.val()) {
				found.push(users[i]);
			}
		}
			
		this.view.model.list = found;
		
		this.view.rebuildList();
	},
	
    updateSelected : function (index) {
        this._model.setSelectedIndex(index);
    }
};


$(function () {
	model = new ListModel();
        view = new ListView(model, {
			'searchButton' : $('#searchButton'),
			'city'	:$('#city'),
            		'list' : $('#list'),
        });
        controller = new ListController(view);
	controller.search();
    	view.show();
});
