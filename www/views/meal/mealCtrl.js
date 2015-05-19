app.controller('MealCtrl', function ($scope, $rootScope, $timeout, $ionicModal, $ionicLoading, $ionicPopup, Meals, $filter) {

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
 
 

});
