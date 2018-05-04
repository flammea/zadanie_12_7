// KLASA KANBAN CARD
function Card(id, name, columnId) {
	var self = this;
	
	this.id = id;
	this.columnId = columnId;
	this.name = name || 'No name given';
	this.element = createCard();

	function createCard() {
		var card = $('<li class="card"></li>');
		var cardDeleteBtn = $('<button class="btn-delete">x</button>');
		var cardDescription = $('<p class="card-description"></p>');
		var cardEditBtn = $('<button class="btn-edit"><i class="fas fa-pencil-alt"></i></button>');

		cardDeleteBtn.click(function(){
			self.removeCard();
		});
		cardEditBtn.click(function() {
			self.editCard();
		});
		
		card.append(cardDeleteBtn)
			.append(cardEditBtn);
		cardDescription.text(self.name);
		card.append(cardDescription);
		card.data('id', self.id);
		return card;
	}
}
Card.prototype = {
	removeCard: function() {
    	var self = this;
    	$.ajax({
      		url: baseUrl + '/card/' + self.id,
      		method: 'DELETE',
      		success: function(){
        		self.element.remove();
      		}
    	});
	},
	editCard: function() {
	  	var self = this;
	  	var newText = prompt('New card text');

	  	$.ajax({
	  		url: baseUrl + '/card/' + self.id,
	  		method: 'PUT',
	  		data: {
	  			name: newText,
	  			bootcamp_kanban_column_id: self.columnId
	  		},
	  		success: function(response) {
	  			self.element.find(".card-description").text(newText);
	  		}
	  	});
	}
}