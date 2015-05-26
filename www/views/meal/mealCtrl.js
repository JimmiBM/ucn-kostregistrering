app.controller('MealCtrl', function ($scope, $rootScope, $ionicModal, $ionicLoading, $ionicPopup, Meals, $filter) {

  // Load or initialize projects
  $scope.meals = Meals.all();

  //
  $scope.breakfastList = [];
  $scope.lunchList = [];
  $scope.dinnerList = [];
  $scope.snackList = [];
  $scope.drinkList = [];

  $scope.meals.forEach(function(meal) {
    if(meal.cat == "breakfast"){
      $scope.breakfastList.push(meal);
    }
    if(meal.cat == "lunch"){
      $scope.lunchList.push(meal);
    }
    if(meal.cat == "dinner"){
      $scope.dinnerList.push(meal);
    }
    if(meal.cat == "snack"){
      $scope.snackList.push(meal);
    }
    if(meal.cat == "drink"){
      $scope.drinkList.push(meal);
    }       
   
  });
  
  // min and max for amount
  $scope.amount = 0;
  var min = 0;
  var max = 100;

  $scope.increment = function(amount) {
    if ($scope.amount < max) { 
    $scope.amount++;
    }
  };
  $scope.decrement = function(amount) {
    if ($scope.amount <= min) { return; }
    $scope.amount--;
  };
});
