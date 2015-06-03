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

app.controller('RegistrationCtrl', function ($scope, $rootScope, $ionicModal, $ionicLoading, $ionicPopup, Meals, Registrations, $filter, $location, $state) {

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
  
  $scope.registration = $scope.getRegistrationByID(window.localStorage['chosenRegID']); 
  
  $scope.addMealToRegistration = function(regID, mealID) {
    
    var registration = getRegistration(regID);
    var meal = getMeal(mealID);
    meal.amount = 0;
    meal.mID = registration.meals.length+1;
    registration.meals.push(meal);
    Registrations.save($scope.registrations);
    $ionicLoading.show({ template: 'Tilføjet', noBackdrop: true, duration: 400 });
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
    
    $scope.modal.hide();
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
          if(usersRegistrations[i].title == title) {
            //Der er oprettet, send videre
            isThereOneForToday = true;
            
            window.localStorage['chosenRegID'] = angular.toJson(usersRegistrations[i].rID);           
            $location.path("/meal/breakfast");
            
            break;
          }           
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
      
      $scope.registrations.push(angular.copy(newRegistration));      
      Registrations.save($scope.registrations);
      window.localStorage['chosenRegID'] = angular.toJson(newRegistration.rID);    
      $location.path("/meal/breakfast");
    }
    
  };
  
  $scope.goToReg = function(rID) {
    window.localStorage['chosenRegID'] = angular.toJson(rID);    
      $location.path("/meal/breakfast");
  };
 
  
  
});

app.controller('MealRecommendationCtrl', function($scope, Meals, $window, $ionicSideMenuDelegate, Registrations, $filter){
	var loggedInUser = angular.fromJson(window.localStorage['loggedInUser']);
  var registrations = Registrations.all();//get all registrations
  var userRegistrations = $filter('filter')(registrations, {userSSN: parseInt(loggedInUser.SSN)});//Find registrations belonging to loggedinuser
  var userWeight = loggedInUser.weight;
	var energyToday = 0;
  var proteinToday = 0;
  //Get the hour of the day
	var date = new Date();
	var currentHour = date.getHours();
	
  //Get the recommendations
	var breakfastRecommendations = angular.fromJson(window.localStorage['breakfastRecommendations']);
	var lunchRecommendations = angular.fromJson(window.localStorage['lunchRecommendations']);
	var dinnerRecommendations = angular.fromJson(window.localStorage['dinnerRecommendations']);
	var snackRecommendations = angular.fromJson(window.localStorage['snackRecommendations']);
	$scope.mealRecommendations = [];
	$scope.mealName = "";
  
  //Get the registration from today
  var getTodaysReg = function(){
    var today = new Date();
    var weekday=new Array("Søndag","Mandag","Tirsdag","Onsdag","Torsdag","Fredag","Lørdag");
    var monthname=new Array("Januar","Februar","Marts","April","Maj","Juni","Juli","August","September","October","November","December");
    var userSSN = loggedInUser.SSN;
    var title = weekday[today.getDay()] + " d. " + today.getDate() + ". " + monthname[today.getMonth()] + " " + today.getFullYear();
    
    var todaysReg = {};
    if(userRegistrations.length > 0) {
      for(var i = userRegistrations.length - 1; i >= 0; i--) {
        if(userRegistrations[i].title == title) {
          todaysReg = userRegistrations[i];
          break;
        }
      } //endfor
    }
      return todaysReg;
  };
  var todaysReg = getTodaysReg();
  
  //Calculate how much protein have been consumed today
  var proteinConsumedToday = function(){
    var protein = 0;
    if(todaysReg.meals != undefined && todaysReg.meals.length > 0) {
      todaysReg.meals.forEach(function(meal){
        protein += meal.protein * meal.amount / 100;
      });
    }
    return protein;
  };
  proteinToday = proteinConsumedToday();
  
  $scope.mealEnergy = function(meals){
    var energy = 0;
    if(meals != undefined){
      meals.forEach(function(meal){
        energy += meal.energy;
      });
    }
    return energy;
  };
	
  //Calculate how much more energy and protein is needed today
	$scope.energyNeeded = function(energyPerKilo){
		return userWeight * energyPerKilo - energyToday;
	};
	
	$scope.proteinNeeded = function(proteinPerKilo){
		return userWeight * proteinPerKilo - proteinToday;
	};
  
	//Select recommendations to show depending on the hour of the day
	if(currentHour > 6 && currentHour < 12)
	{
    $scope.mealName = "Morgenmad";
    breakfastRecommendations.forEach(function(meal){
      //recommend breakfast meals that supply up to a little over a third of the remaining requirement of the day
      if(meal.totalProtein < $scope.proteinNeeded(1) * 0.4){
			  $scope.mealRecommendations.push(meal);
      }
		});
	}
	else if(currentHour < 16)
	{
    $scope.mealName = "Middagsmad";
    lunchRecommendations.forEach(function(meal){
      //recommend lunch meals that supply up to a little over half of the remaining requirement of the day
      if(meal.totalProtein < $scope.proteinNeeded(1) * 0.6){
			  $scope.mealRecommendations.push(meal);
      }
		});
	}
	else if(currentHour < 22)
	{
    $scope.mealName = "Aftensmad";
		dinnerRecommendations.forEach(function(meal){
      //recommend dinner meals that supply up to a little over the remaining requirement of the day
      if(meal.totalProtein < $scope.proteinNeeded(1) * 1.1){
			  $scope.mealRecommendations.push(meal);
      }
    });
	}
	else
	{
    $scope.mealName = "Mellemmåltid";
		snackRecommendations.forEach(function(meal){
			//recommend snacks that supply up to the remaining requirement of the day
      if(meal.totalProtein < $scope.proteinNeeded(1)){
			  $scope.mealRecommendations.push(meal);
      }
		});
	}
});