var app = angular.module("GroceryListApp", ["ngRoute"]);

// Route provider
app.config(function ($routeProvider){
	$routeProvider
		.when("/", {
			templateUrl: "views/groceryList.html", 
			controller: "GroceryListItemsCtrl"
		})
		.when("/addItem", {
			templateUrl: "views/addItem.html", 
			controller: "GroceryListItemsCtrl"
		})
		.otherwise({
			redirectTo:"/"
		})
});

//Grocery list Home controller for the whole page
app.controller("HomeCtrl", ["$scope", function($scope){
	$scope.appTitle = "Grocery List";
}]);

//Grocery list items controller for the list of items
app.controller("GroceryListItemsCtrl", ["$scope", function($scope){
	$scope.items = [{completed: false, name:"Sugar", date: "2018-09-14"},
					{completed: false, name:"Tea", date: "2018-09-15"},
					{completed: false, name:"Coffee", date: "2018-09-18"}]
}]);