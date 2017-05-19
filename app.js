var listController = (function() {
    counter = 3;
    return {
        addItem: function() {
            counter += 1;
        },
        deleteItem: function(item) {
            counter -= 1;
        },
        returnTotalItems: function() {
            return counter;
        },
    }
})();
var UIController = (function() {
    var DOMstrings = {
        inputDescription: '.add__description',
        inputBtn: '.add__btn',
        todosContainer: '.todos__list',
        container: '.container',
        totalItems: '.total__items',
        addField: '.add'
    };
    var items = listController.returnTotalItems();
    return {
        getInput: function() {
            return document.querySelector(DOMstrings.inputDescription).value;
        },
        addListItem: function() {
            var items = listController.returnTotalItems();
            var html, newHtml, element;
            element = DOMstrings.todosContainer;
            var colors = ['#FFBE0B', '#FB5607', '#FF006E', '#8338EC', '#3A86FF'];
            var gradients = [
            'linear-gradient(to bottom, rgba(255,190,11, 1) 0%, rgba(255,190,11, 0.8) 100%)', 
            'linear-gradient(to bottom, rgba(251, 86, 7, 1) 0%, rgba(251, 86, 7, 0.8) 100%)',
            'linear-gradient(to bottom, rgba(255,0,110, 1) 0%, rgba(255,0,110, 0.8) 100%)',
            'linear-gradient(to bottom, rgba(131, 56, 236, 1) 0%, rgba(131, 56, 236, 0.8) 100%)',
            'linear-gradient(to bottom, rgba(58,134,255, 1) 0%, rgba(58,134,255, 0.8) 100%)'
             ]
            var random_gradient = gradients[Math.floor(Math.random() * gradients.length)];
            html = '<div class="item" style="%style%"> <div class="item__description">%description%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-trash-outline"></i></button></div></div>';
            newHtml = html.replace('%description%', document.querySelector(DOMstrings.inputDescription).value);
            newHtml = newHtml.replace('%style%', 'background:' + random_gradient) ;
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
        clearField: function() {
            document.querySelector(DOMstrings.inputDescription).value = '';
            document.querySelector(DOMstrings.inputDescription).focus();
        },
        displayTotalItems: function() {
            var items = listController.returnTotalItems();
            if (items == 0) {
                document.querySelector(DOMstrings.totalItems).textContent = 'nothing';
            } else if (items == 1) {
                document.querySelector(DOMstrings.totalItems).textContent = ' 1 thing';
            } else {
                document.querySelector(DOMstrings.totalItems).textContent = items + ' things';
            }
        },
        displayDate: function () {
        	var mydate = new Date();
    		var year = mydate.getYear();
    		if (year < 1000) {
        		year+=1900;
    		}
            var day = mydate.getDay();
            var month = mydate.getMonth();
            var daym = mydate.getDate();
            if (daym < 10) {
            	daym = "0" + daym;
            }
            var dayarray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            var montharray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            var today = dayarray[day] + " "+ daym + " "+ montharray[month] + " " + year;
            document.getElementById('date').innerHTML = today;
        },

        getDOMstrings: function() {
            return DOMstrings;
        },
    };
})();
var controller = (function(listCtrl, UICtrl) {
    var DOM = UICtrl.getDOMstrings();
    var setupEventListeners = function() {
   		document.querySelector(DOM.inputBtn).addEventListener('click', showAddField);
        document.addEventListener('keypress', function(e) {
            if (e.keyCode === 13 || e.which === 13) {
                ctrlAddItem();
            }
        });
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
    };
    var updateTotalItems = function() {
        listController.returnTotalItems();
        UICtrl.displayBudget(budget);
    };
    var ctrlAddItem = function() {
        if (document.querySelector(DOM.inputDescription).value !== '') {
            listCtrl.addItem();
            UICtrl.addListItem();
            UICtrl.clearField();
            UICtrl.displayTotalItems();
        }
    };
    var showAddField = function() {
        document.querySelector(DOM.addField).style.display = 'block';
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem)
        document.querySelector(DOM.inputDescription).focus();
    }
    var ctrlDeleteItem = function(e) {
        var todo = e.target.parentNode.parentNode.parentNode;
        if (e.target && e.target.className === "ion-ios-trash-outline") {
            todo.parentNode.removeChild(todo);
            listCtrl.deleteItem();
        }
        UICtrl.displayTotalItems();
    };
    var alert = function() {
    	console.log('This is a test!');
    }
    return {
        init: function() {
            UICtrl.displayTotalItems();
            UICtrl.displayDate();
            setupEventListeners(); 
        },
    };
})(listController, UIController);
controller.init();