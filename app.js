var listController = (function () {
	//var todos = [];
	counter = 0;
	return {
		addItem: function () {
			//todos.push(item);
			counter +=1;
		},

		deleteItem: function (item) {
			counter -=1;
			//var i = todos.indexOf(item);
			//if (i != -1) {
				//todos.splice(i, 1);

			//}
		},
	
		returnTotalItems: function () {
			return counter;
		},
		
		testing: function () {
			//console.log(todos);
			console.log(counter);
		}
	}
})();

var UIController = (function () {
	var DOMstrings = {
		inputDescription: '.add__description',
		inputBtn: '.add__btn',
		todosContainer: '.todos__list',
		container: '.container',
		totalItems: '.total__items'
	};
	var items = listController.returnTotalItems();
	return {
		getInput: function () {
			return document.querySelector(DOMstrings.inputDescription).value;
		},
		
		addListItem: function() {
			var items = listController.returnTotalItems();
			var html, newHtml, element;
			element = DOMstrings.todosContainer;
			var colors = ['#FFBE0B', '#FB5607', '#FF006E', '#8338EC', '#3A86FF'];
			var random_color = colors[Math.floor(Math.random() * colors.length)];
			html = '<div class="item" id="%id%" style="%style%"> <div class="item__description">%description%</div><div class="right"><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			newHtml = html.replace('%description%', document.querySelector(DOMstrings.inputDescription).value);
			newHtml = newHtml.replace('%id%', 'item-' + (items));
			newHtml = newHtml.replace('%style%', 'background-color:' + random_color);
			document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);	
		},
		
		clearField: function () {
			document.querySelector(DOMstrings.inputDescription).value = '';
			document.querySelector(DOMstrings.inputDescription).focus();
		},

		displayTotalItems: function () {
		var items = listController.returnTotalItems();
			if (items == 0) {
				document.querySelector(DOMstrings.totalItems).textContent = 'nothing';
			}
			else if (items == 1){
				document.querySelector(DOMstrings.totalItems).textContent = ' 1 thing';
			}
			else {
				document.querySelector(DOMstrings.totalItems).textContent = items + ' things';
			}
		},

		getDOMstrings: function () {
			return DOMstrings;
		},
		
	};

})();

var controller = (function (listCtrl, UICtrl) {
	var DOM = UICtrl.getDOMstrings();
	var setupEventListeners = function () {
		document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
		document.addEventListener('keypress', function (e) {
			if (e.keyCode === 13 || e.which === 13) {
				ctrlAddItem();
			}
		});
		document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
	};

	var updateTotalItems = function () {
		listController.returnTotalItems();
		UICtrl.displayBudget(budget);
	};

	var ctrlAddItem = function () {
		if (document.querySelector(DOM.inputDescription).value !== '') {
			listCtrl.addItem();
			UICtrl.addListItem();
			UICtrl.clearField();
			UICtrl.displayTotalItems();
		}
	};

	var ctrlDeleteItem = function (e) {
		listCtrl.deleteItem();
		var todo = e.target.parentNode.parentNode.parentNode.parentNode;
			if (e.target && e.target.className === "ion-ios-close-outline") {
				todo.parentNode.removeChild(todo);
			}
		UICtrl.displayTotalItems();
	};

	return {
		init: function () {
			UICtrl.displayTotalItems();
			setupEventListeners();
		}
	};
})(listController, UIController);

controller.init();