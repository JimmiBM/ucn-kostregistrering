angular.module('starter.controllers')

.controller('MealCtrl', ['$scope', '$http', function($scope){

	$scope.meals = mealService.getAllMeals();

}]);