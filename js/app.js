var app = angular.module("GroceryListApp", ["ngRoute"]);

// Route provider
app.config(function ($routeProvider){
	$routeProvider
		.when("/", {
			templateUrl: "views/groceryList.html", 
			controller: "HomeCtrl"
		})
		.when("/addItem", {
			templateUrl: "views/addItem.html", 
			controller: "GroceryListItemCtrl"
		})
		.when("/addItem/edit/:id", {
			templateUrl: "views/addItem.html", 
			controller: "GroceryListItemCtrl"
		})
		.otherwise({
			redirectTo:"/"
		})
});

// services
app.service("GroceryService", function (){
	var groceryService = {};
	groceryService.groceryItems = [
		{id: 1, completed: true, itemName: 'Sugar', date:'2018-09-14'},
		{id: 2, completed: true, itemName: 'Milk', date:'2018-09-14'},
		{id: 3, completed: true, itemName: 'Tea', date:'2018-09-15'},
		{id: 4, completed: true, itemName: 'Coffee', date:'2018-09-18'},
		{id: 5, completed: true, itemName: 'Bread', date:'2018-09-18'},
	];

// get grocery item by it's id
	groceryService.findById = function (data) {
		for (var item in groceryService.groceryItems) {
			if(groceryService.groceryItems[item].id === data){
				return groceryService.groceryItems[item];
			}
		}
	}

// get new id for the new grocery item
	groceryService.getNewId = function (){
	 	if(groceryService.newId){
	 		groceryService.newId++;
	 		return groceryService.newId;
	 	}
	 	else {
	 		var maxId = _.max(groceryService.groceryItems, function(data){ return data.id;})
	 		groceryService.newId = maxId.id + 1;
	 		return groceryService.newId;
 		}
	 };

// add or update the grocery item
	groceryService.save = function (data) {
		var updatedItem = groceryService.findById(data.id);
		if (updatedItem) {
			updatedItem.itemName = data.itemName;
			updatedItem.completed = data.completed;
			updatedItem.date = data.date;
		}
		else {
			data.id = groceryService.getNewId();
			groceryService.groceryItems.push(data);
		}
		console.log(groceryService.groceryItems);
	};
	
	return groceryService;
});


//Grocery list Home controller for the whole page
app.controller("HomeCtrl", ["$scope", "GroceryService", function($scope, GroceryService){
	$scope.appTitle = "Grocery List";
	$scope.groceryItems = GroceryService.groceryItems;
}]);

//Grocery list items controller for the list of items
app.controller("GroceryListItemCtrl", ["$scope", "$routeParams", "$location", "GroceryService", 
								function($scope, $routeParams, $location, GroceryService){

		// add mew item
		if($routeParams.id == null){	
			$scope.groceryItem = {id:0, completed: true, itemName:"", date: new Date()};
		}
		// edit existing
		else{
			$scope.groceryItem	= _.clone(GroceryService.findById(parseInt($routeParams.id)));
		}

		$scope.save = function () {
			console.log($scope.groceryItem);
			GroceryService.save($scope.groceryItem);
			$location.path("/");
		}
}]);

