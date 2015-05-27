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
  
  var getMeal = function(ID) {
      return $filter('filter')($scope.meals, {id: ID})[0];
  };
  
  $scope.getMealByID = function(ID) {
    return getMeal(ID);
  };
  
  $scope.openRegs = function(){
    $ionicModal.fromTemplateUrl('views/meal/kostregistrering.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };
  
});

app.controller('RegistrationCtrl', function ($scope, $rootScope, $ionicModal, $ionicLoading, $ionicPopup, Meals, Registrations, $filter) {

  $scope.meals = Meals.all();
  $scope.registrations = Registrations.all(); 
  
  var getMeal = function(ID) {
      return $filter('filter')($scope.meals, {id: ID})[0];
  };
  
  var getRegistration = function(ID) {
      return $filter('filter')($scope.registrations, {rID: ID})[0];
  };
  
  $scope.getRegistrationByID = function(ID) {
    return getRegistration(ID);
  };
  
  $scope.registration = getRegistration(1);
  
  $scope.addMealToRegistration = function(regID, mealID) {
    
    var registration = getRegistration(regID);
    var meal = getMeal(mealID);
    meal.amount = 0;
    meal.mID = registration.meals.length+1;
    registration.meals.push(angular.copy(meal));
    Registrations.save($scope.registrations);
  };
 
  
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
