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
app.service("GroceryService", function ($http){
	var groceryService = {};
	groceryService.groceryItems = [];
	// data received from server
	$http.get("data/server_data.json")
	.success(function(data){
		groceryService.groceryItems = data;
	})
	.error(function(data){
		console.log("Error in getting data from server_data.json");
	})

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
		// send data to server
	};
	
	// delete an item
	groceryService.delete = function (data){
		var index = groceryService.groceryItems.indexOf(data);
		groceryService.groceryItems.splice(index, 1);
	}

	// completed items - checked or unchecked
	groceryService.completed = function (data){
		data.completed = !data.completed;
	}

	return groceryService;
});


//Grocery list Home controller for the whole page
app.controller("HomeCtrl", ["$scope", "GroceryService", function($scope, GroceryService){
	$scope.appTitle = "Grocery List";
	$scope.groceryItems = GroceryService.groceryItems;

	$scope.delete = function (data){
		GroceryService.delete(data);
	}

	$scope.completed = function (data) {
		GroceryService.completed(data);
	}
}]);

//Grocery list items controller for the list of items
app.controller("GroceryListItemCtrl", ["$scope", "$routeParams", "$location", "GroceryService", 
								function($scope, $routeParams, $location, GroceryService){

		// add mew item
		if($routeParams.id == null){	
			$scope.groceryItem = {id:0, completed: false, itemName:"", date: new Date()};
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

