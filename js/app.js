var app = angular.module("GroceryListApp", []);

//Grocery list Home controller for the whole page
app.controller("HomeCtrl", ["$scope", function($scope){
	$scope.appTitle = "Grocery List";
}]);

//Grocery list items controller for the list of items
app.controller("GroceryListItemsCtrl", ["$scope", function(scope){
	$scope.items = [{completed: false, name:"Sugar"},
					{completed: false, name:"Tea"},
					{completed: false, name:"Coffee"}]
}]);