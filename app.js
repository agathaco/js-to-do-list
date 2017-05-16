var listController = (function () {
	//var todos = [];
	counter = 0;
	return {
		addItem: function (item) {
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
	return {
		getInput: function () {
			return document.querySelector(DOMstrings.inputDescription).value;
		},
		
		addListItem: function () {
			var html, newHtml, element;
			element = DOMstrings.todosContainer;
			html = '<div class="item clearfix"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			newHtml = html.replace('%description%', document.querySelector(DOMstrings.inputDescription).value);
			document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
		},
		
		clearField: function () {
			document.querySelector(DOMstrings.inputDescription).value = '';
			document.querySelector(DOMstrings.inputDescription).focus();
		},

		displayTotalItems: function () {
			var items = listController.returnTotalItems();
			if (items < 2) {
				document.querySelector(DOMstrings.totalItems).textContent = items + ' thing';
			} else {
				document.querySelector(DOMstrings.totalItems).textContent = items + ' things';
			}
		},

		getDOMstrings: function () {
			return DOMstrings;
		}
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
		var input, newItem;
		input = UICtrl.getInput();
		if (document.querySelector(DOM.inputDescription).value !== '') {
			newItem = listCtrl.addItem(input);
			UICtrl.addListItem(newItem);
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