app.controller('MealCtrl', function ($scope, $rootScope, $ionicModal, $ionicLoading, $ionicPopup, Meals, $filter) {

  // Load or initialize projects
  $scope.meals = Meals.all();
  $scope.loggedInUser = angular.fromJson(window.localStorage['loggedInUser']);

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
  
    
});

app.controller('RegistrationCtrl', function ($scope, $rootScope, $ionicModal, $ionicLoading, $ionicPopup, Meals, Registrations, $filter) {

  $scope.meals = Meals.all();
  $scope.registrations = Registrations.all(); 
  $scope.loggedInUser = angular.fromJson(window.localStorage['loggedInUser']); 
  
  var getMeal = function(ID) {
      return $filter('filter')($scope.meals, {id: ID})[0];
  };
  
  var getRegistration = function(ID) {
      return $filter('filter')($scope.registrations, {rID: ID})[0];
  };
  
  $scope.getRegistrationUser = function(SSN) {
      return $filter('filter')($scope.registrations, {userSSN: parseInt(SSN)});
  };
  
  $scope.loggedInUserRegistrations = $scope.getRegistrationUser($scope.loggedInUser.SSN);
  
  
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
    $ionicLoading.show({ template: 'Tilføjet', noBackdrop: true, duration: 1500 });
  };
  
  $scope.removeMealFromRegistration = function(id) {  
    for(var i = $scope.registration.meals.length - 1; i >= 0; i--) {
      if($scope.registration.meals[i].mID == id) {
         $scope.registration.meals.splice(i, 1);
      }
    } 
  };
  
  $scope.saveRegistration = function(regID) {  
    var registration = getRegistration(regID);
    Registrations.save($scope.registrations);
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
  
  $scope.cancelReg = function () {
    $scope.modal.hide();
  };
  
  $scope.checkToCreateReg = function () {
    var today = new Date();
    var weekday=new Array("Søndag","Mandag","Tirsdag","Onsdag","Torsdag","Fredag","Lørdag");
    var monthname=new Array("Januar","Februar","Marts","April","Maj","Juni","Juli","August","September","October","November","December");
    var userSSN = $scope.loggedInUser.SSN;
    var title = weekday[today.getDay()] + " d. " + today.getDate() + ". " + monthname[today.getMonth()] + " " + today.getFullYear();
    
    var usersRegistrations = $scope.getRegistrationUser(userSSN);

    
    var isThereOneForToday = false;
    if(usersRegistrations.length > 0) {
        for(var i = usersRegistrations.length - 1; i >= 0; i--) {
          console.log(usersRegistrations[i].date)
          if(usersRegistrations[i].title = title) {
            //Der er oprettet, send videre
            console.log("Send videre. Du har en for i dag");
            isThereOneForToday = true;
            break;
          }else {
            //Der er ikke oprettet, opret en og send videre
            console.log("Der er ikke oprettet en, opret nu");
          } //endif            
        } //endfor
      
    }
    
    if(!isThereOneForToday) {
      //opret så send
      var newRegistration = 
        { 
          "rID": $scope.registrations.length+1, 
          "userSSN": parseInt(userSSN),
          "title": weekday[today.getDay()] + " d. " + today.getDate() + ". " + monthname[today.getMonth()] + " " + today.getFullYear(),
          "date": today,
          "meals": []
        };
      

      console.log(newRegistration);
      
      $scope.registrations.push(angular.copy(newRegistration));
      console.log($scope.registrations);
      
      Registrations.save($scope.registrations);
    }else{
      //send, er oprettet
    }
    
  };
 
  
  
});

app.controller('MealRecommendationCtrl', function($scope, Meals, $window, $ionicSideMenuDelegate){
	$scope.userWeight = 100;
	$scope.proteinToday = 75;
	$scope.energyToday = 6000;
	$scope.mealRecommendations = [];
	
	var date = new Date();
	var currentHour = date.getHours();
	console.log(currentHour);
	
	var breakfastRecommendations = angular.fromJson(window.localStorage['breakfastRecommendations']);
	var lunchRecommendations = angular.fromJson(window.localStorage['lunchRecommendations']);
	var dinnerRecommendations = angular.fromJson(window.localStorage['dinnerRecommendations']);
	var snackRecommendations = angular.fromJson(window.localStorage['snackRecommendations']);
	console.log(breakfastRecommendations);
	console.log(lunchRecommendations);
	console.log(dinnerRecommendations);
	console.log(snackRecommendations);
	
	
	if(currentHour > 6 && currentHour < 12)
	{
		breakfastRecommendations.forEach(function(meal){
			$scope.mealRecommendations.push(meal);
		});
	}
	else if(currentHour < 16)
	{
		lunchRecommendations.forEach(function(meal){
			$scope.mealRecommendations.push(meal);
		});
	}
	else if(currentHour < 22)
	{
		dinnerRecommendations.forEach(function(meal){
			$scope.mealRecommendations.push(meal);
		});
	}
	else
	{
		snackRecommendations.forEach(function(meal){
			$scope.mealRecommendations.push(meal);
		});
	}
	
	$scope.energyNeeded = function(energyPerKilo){
		return userWeight * energyPerKil - energyToday;
	}
	
	$scope.proteinNeeded = function(proteinPerKilo){
		return userWeight * proteinPerKilo - proteinToday;
	}
	
	$scope.recommendedBreakfast = function(proteinPerKilo){
		var breakfastProtein = proteinNeeded(proteinPerKilo) / 3;
		$scope.breakfastList.forEach(function(meal){
//			if(meal.protein)
		});
	}
})