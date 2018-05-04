function Column(id, name) {
	var self = this;
	
	this.id = id;
	this.name = name || 'No name given';
	this.element = createColumn();

	function createColumn() {
		// TWORZENIE NOWYCH WĘZŁÓW
		var column = $('<div class="column"></div>');
		var columnTitle = $('<h2 class="column-title">' + self.name + '</h2>');
		var columnEditTitle = $('<button class="btn-edit"><i class="fas fa-pencil-alt"></i></button>');
		var columnCardList = $('<ul class="card-list"></ul>');
		var columnDelete = $('<button class="btn-delete">x</button>');
		var columnAddCard = $('<button class="column-add-card">Dodaj kartę</button>');
		
		// PODPINANIE ODPOWIEDNICH ZDARZEŃ POD WĘZŁY
		columnDelete.click(function() {
			self.deleteColumn();
		});

		columnEditTitle.click(function() {
			self.editTitle();
		});
		
		columnAddCard.click(function(event) {
			var cardName = prompt("Enter the name of the card");
			event.preventDefault();
			$.ajax({
			    url: baseUrl + '/card',
			    method: 'POST',
			    data: {
			    name: cardName,
			    bootcamp_kanban_column_id: self.id
			    },
			    success: function(response) {
			        var card = new Card(response.id, cardName);
			        self.createCard(card);
			    }
			});		
		});
			
			// KONSTRUOWANIE ELEMENTU KOLUMNY
		column.append(columnTitle)
			.append(columnEditTitle)
			.append(columnDelete)
			.append(columnAddCard)
			.append(columnCardList);
			column.data('id', self.id);
			return column;
		}
	}
	Column.prototype = {
		createCard: function(card) {
			this.element.children('ul').append(card.element);
		},
		deleteColumn: function() {
	    	var self = this;
		    $.ajax({
		      	url: baseUrl + '/column/' + self.id,
		      	method: 'DELETE',
		      	success: function(response){
		        	self.element.remove();
		    	}
    		});
 		},
 		editTitle: function() {
	    	var self = this;
	    	var newTitle = prompt('New column title');
		    $.ajax({
		      	url: baseUrl + '/column/' + self.id,
		      	method: 'PUT',
		      	data: {
		  			name: newTitle
		  		},
		      	success: function(response) {
	  				self.element.find(".column-title").text(newTitle);
	  			}
    		});
 		}
}
