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
		var _this = this;

    this.listModified = new Event(this);
    this.searchButtonClicked = new Event(this);
    this.detailsButtonClicked = new Event(this);

    // attach listeners to HTML controls
		this.elements.searchButton.click(function () {
				_this.searchButtonClicked.notify();
		});

}

ListView.prototype = {
    show : function () {
        this.rebuildList();
    },

    rebuildList : function () {
    		var found = this.model.list;
    		var list = this.elements.list;
    		list.html('');

        if (found.length > 0) {
      		for (var i = 0; i < found.length; i++) {
      			var image = '<img src="../images/guestPetLogo.png" class="profilePicture">';
      			var info = '<p>' + found[i].name + '<br/>' + found[i].city + '</p>';
            var button = 'id="button' + i + '"';
            console.log(button);
      			list.append($('<li id="list">' + image + info + '<button type="button" ' + button + ' class="host-details-button">Ver detalhes</button>' + '</li>'));
          }
        } else {
          var place = this.elements.city.val();

          if (place != 'cidade') {
            list.append($('<li class="searchResult">Nenhum host foi encontrado para a sua pesquisa</li>'));
          }
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

    this.view.detailsButtonClicked.attach(function (sender, args) {
        _this.showDetails(args);
    })
}

ListController.prototype = {

    notifyResults: function () {
      var list = this.view.model.list;

      for (var i = 0; i < list.length; i++) {
        var string = '#button'+i;
        var button = $(string);

        button.click(function (e) {
            view.detailsButtonClicked.notify(e);
        });
      }
    },

    showDetails: function(e) {
      var index = e.currentTarget.id.split('button')[1];

      var userName = this.view.model.list[index].name;

      location.replace("../templates/hostProfile.html?="+userName);
    },


		search: function () {
		var found = [];
    // NO FUTURO DEVE PEGAR DO BANCO DE DADOS OS USERS COM ATRIBUTO isHostUser = true

    for (var i = 0; i < users.length; i++) {
      // se for host e da mesma cidade
			if (users[i].isHostUser) {
        // procura nas residências dele se tem alguma com capacidade
        for (var j = 0; j < users[i].homes.length; j++) {
          var home = users[i].homes[j];
          var searcherCity = this.view.elements.city.val();

          if (home.isAvailable() && home.adress.city == searcherCity) {
            found.push(users[i]);
          }
        }
      }
		}

		this.view.model.list = found;
		this.view.rebuildList();
    this.notifyResults();

	},

    updateSelected : function (index) {
        this._model.setSelectedIndex(index);
    }
};

$(function () {
				model = new ListModel();
        view = new ListView(model, {
						'searchButton' : $('#searchButton'),
						'city'	:	$('#city'),
            'list' : $('#list'),
        });
        controller = new ListController(view);
		controller.search();
    view.show();
});
