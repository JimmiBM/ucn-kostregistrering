describe("RegistrationCtrl", function() {

    var scope, controller;
    beforeEach(module('App'));

    beforeEach(inject(function (
        $rootScope,
        $controller,
        $ionicModal, 
        $ionicLoading,
        $ionicPopup,
        Meals,
        Registrations,
        $filter,
        $window,
        $ionicSideMenuDelegate) {

            scope = $rootScope.$new();  
        
            controller = $controller('RegistrationCtrl', {
                $scope: scope,
                $rootScope: $rootScope,
                $ionicModal: $ionicModal,
                $ionicLoading: $ionicLoading,
                $ionicPopup: $ionicPopup,
                Meals: Meals,
                Registrations: Registrations,
                $filter: $filter,
                $window: $window,
                $ionicSideMenuDelegate: $ionicSideMenuDelegate
                
            });
    }));
    
    it("should have a scope variable defined", function() {
        expect(scope).toBeDefined();
    });
    
    it("should have at least one registration", function(){
        expect(scope.registrations.length).not.toEqual(0);
    });
    
    it("should be able to find a registered meal from id", function(){
        expect(scope.getRegistrationByID(2).userSSN).toEqual(1234567890);
    });
    
    it("should be able to register a registration", function(){
        var loggedInUserSSN = 1234567890;
        scope.loggedInUser.SSN = 1234567890;
        
        scope.checkToCreateReg();
        expect(scope.getRegistrationByID(scope.registrations.length).userSSN).toEqual(loggedInUserSSN);
    });
    
    it("should be able to add a meal to a registration", function(){
        //check meal arrays length before adding
        var mealLengthBefore = scope.getRegistrationByID(1).meals.length;
        //add meal to registration
        scope.addMealToRegistration(1,1); 
        //check meal arrays length after adding
        var mealLengthAfter = scope.getRegistrationByID(1).meals.length;
        
        expect(mealLengthAfter > mealLengthBefore).toBe(true);
    });
    
    it("should be able to remove a meal from a registration", function(){
        //set registration to remove from
        scope.registration = scope.getRegistrationByID(2); 
        //check meal arrays length before removing
        var mealLengthBefore = scope.registration.meals.length;
        //remove the meal from registration
        scope.removeMealFromRegistration(1); 
        //check meal arrays length after removing
        var mealLengthAfter = scope.registration.meals.length;
        
        expect(mealLengthAfter < mealLengthBefore).toBe(true);
    });
    
});

describe("MealRecommendationCtrl", function() {

    var scope, controller;
    beforeEach(module('App'));

    beforeEach(inject(function (
        $rootScope,
        $controller,
        $ionicModal, 
        $ionicLoading,
        $ionicPopup,
        Meals,
        Registrations,
        $filter,
        $window,
        $ionicSideMenuDelegate) {

            scope = $rootScope.$new();  
        
            controller = $controller('MealRecommendationCtrl', {
                $scope: scope,
                $rootScope: $rootScope,
                $ionicModal: $ionicModal,
                $ionicLoading: $ionicLoading,
                $ionicPopup: $ionicPopup,
                Meals: Meals,
                Registrations: Registrations,
                $filter: $filter,
                $window: $window,
                $ionicSideMenuDelegate: $ionicSideMenuDelegate
                
            });
    }));
    
    it("should have a scope variable defined", function() {
        expect(scope).toBeDefined();
    });
    
    it("should show nightime snacks before 6am", function() {
        var recommendations = scope.getMealRecommendations(5);
        var firstSnackID = recommendations[0].meals[0].id;
        expect(firstSnackID).toEqual(48);
    });
    
    it("should show breakfast before 11am", function() {
        var recommendations = scope.getMealRecommendations(10);
        var firstSnackID = recommendations[0].meals[0].id;
        expect(firstSnackID).toEqual(2);
    });
    
    it("should show lunch before 2pm", function() {
        var recommendations = scope.getMealRecommendations(13);
        var firstSnackID = recommendations[0].meals[0].id;
        expect(firstSnackID).toEqual(28);
    });
    
    it("should show afternoon snack before 5pm", function() {
        var recommendations = scope.getMealRecommendations(16);
        var firstSnackID = recommendations[0].meals[0].id;
        expect(firstSnackID).toEqual(48);
    }); 
    
    it("should show dinner before 8pm", function() {
        var recommendations = scope.getMealRecommendations(19);
        var firstSnackID = recommendations[0].meals[0].id;
        expect(firstSnackID).toEqual(43);
    }); 
    
    it("should show snacks before 11pm", function() {
        var recommendations = scope.getMealRecommendations(23);
        var firstSnackID = recommendations[0].meals[0].id;
        expect(firstSnackID).toEqual(48);
    }); 
    
    it("shouldn't show any registrations if a patient have allready consumed all the protein needed for a day", function() {
        scope.loggedInUser = {"SSN": 3333, "weight": 100};
        window.localStorage['loggedInUser'] = angular.toJson(scope.loggedInUser);
        var today = new Date();
        var weekday=new Array("Søndag","Mandag","Tirsdag","Onsdag","Torsdag","Fredag","Lørdag");
        var monthname=new Array("Januar","Februar","Marts","April","Maj","Juni","Juli","August","September","October","November","December");
        var newRegistration = 
        { 
          "rID": 100, 
          "userSSN": parseInt(scope.loggedInUser.SSN),
          "title": weekday[today.getDay()] + " d. " + today.getDate() + ". " + monthname[today.getMonth()] + " " + today.getFullYear(),
          "date": today,
          "meals": [{ "id": 55, "cat": "snack", "name": "1 spsk. nøddemix", "energy": 710, "protein": 100, "amount": 100 }]
        };
        scope.registrations.push(angular.copy(newRegistration));   
        window.localStorage['registrations'] = angular.toJson(scope.registrations);   
        window.localStorage['chosenRegID'] = angular.toJson(newRegistration.rID);
        
        expect(scope.getMealRecommendations(5).length).toEqual(0);
        
    });
    
    it("should only show one of the snack recommendations if a patient have allready consumed most of the protein needed for a day", function() {
        scope.loggedInUser = {"SSN": 3333, "weight": 100};
        window.localStorage['loggedInUser'] = angular.toJson(scope.loggedInUser);
        var today = new Date();
        var weekday=new Array("Søndag","Mandag","Tirsdag","Onsdag","Torsdag","Fredag","Lørdag");
        var monthname=new Array("Januar","Februar","Marts","April","Maj","Juni","Juli","August","September","October","November","December");
        var newRegistration = 
        { 
          "rID": 100, 
          "userSSN": parseInt(scope.loggedInUser.SSN),
          "title": weekday[today.getDay()] + " d. " + today.getDate() + ". " + monthname[today.getMonth()] + " " + today.getFullYear(),
          "date": today,
          "meals": [{ "id": 55, "cat": "snack", "name": "1 spsk. nøddemix", "energy": 710, "protein": 89, "amount": 100 }]
        };
        scope.registrations.push(angular.copy(newRegistration));   
        window.localStorage['registrations'] = angular.toJson(scope.registrations);   
        window.localStorage['chosenRegID'] = angular.toJson(newRegistration.rID);
        
        expect(scope.getMealRecommendations(5).length).toEqual(1);
    });
    
    it("should show all of the snack recommendations if a patient haven't consumed any of the protein needed for a day", function() {
        scope.loggedInUser = {"SSN": 3333, "weight": 100};
        window.localStorage['loggedInUser'] = angular.toJson(scope.loggedInUser);
        var today = new Date();
        var weekday=new Array("Søndag","Mandag","Tirsdag","Onsdag","Torsdag","Fredag","Lørdag");
        var monthname=new Array("Januar","Februar","Marts","April","Maj","Juni","Juli","August","September","October","November","December");
        var newRegistration = 
        { 
          "rID": 100, 
          "userSSN": parseInt(scope.loggedInUser.SSN),
          "title": weekday[today.getDay()] + " d. " + today.getDate() + ". " + monthname[today.getMonth()] + " " + today.getFullYear(),
          "date": today,
          "meals": [{ "id": 55, "cat": "snack", "name": "1 spsk. nøddemix", "energy": 710, "protein": 0, "amount": 100 }]
        };
        scope.registrations.push(angular.copy(newRegistration));   
        window.localStorage['registrations'] = angular.toJson(scope.registrations);   
        window.localStorage['chosenRegID'] = angular.toJson(newRegistration.rID);
        
        expect(scope.getMealRecommendations(5).length).toEqual(5);
    });
    
    it("shouldn't show any registrations if a patient have allready consumed all the protein needed for a day", function() {
        scope.loggedInUser = {"SSN": 3333, "weight": 100};
        window.localStorage['loggedInUser'] = angular.toJson(scope.loggedInUser);
        var today = new Date();
        var weekday=new Array("Søndag","Mandag","Tirsdag","Onsdag","Torsdag","Fredag","Lørdag");
        var monthname=new Array("Januar","Februar","Marts","April","Maj","Juni","Juli","August","September","October","November","December");
        var newRegistration = 
        { 
          "rID": 100, 
          "userSSN": parseInt(scope.loggedInUser.SSN),
          "title": weekday[today.getDay()] + " d. " + today.getDate() + ". " + monthname[today.getMonth()] + " " + today.getFullYear(),
          "date": today,
          "meals": [{ "id": 55, "cat": "snack", "name": "1 spsk. nøddemix", "energy": 8500, "protein": 0, "amount": 100 }]
        };
        scope.registrations.push(angular.copy(newRegistration));   
        window.localStorage['registrations'] = angular.toJson(scope.registrations);   
        window.localStorage['chosenRegID'] = angular.toJson(newRegistration.rID);
        
        expect(scope.getMealRecommendations(5).length).toEqual(0);
        
    });
    
    it("should only show one of the snack recommendations if a patient have allready consumed most of the energy needed for a day", function() {
        scope.loggedInUser = {"SSN": 3333, "weight": 100};
        window.localStorage['loggedInUser'] = angular.toJson(scope.loggedInUser);
        var today = new Date();
        var weekday=new Array("Søndag","Mandag","Tirsdag","Onsdag","Torsdag","Fredag","Lørdag");
        var monthname=new Array("Januar","Februar","Marts","April","Maj","Juni","Juli","August","September","October","November","December");
        var newRegistration = 
        { 
          "rID": 100, 
          "userSSN": parseInt(scope.loggedInUser.SSN),
          "title": weekday[today.getDay()] + " d. " + today.getDate() + ". " + monthname[today.getMonth()] + " " + today.getFullYear(),
          "date": today,
          "meals": [{ "id": 55, "cat": "snack", "name": "1 spsk. nøddemix", "energy": 7400, "protein": 0, "amount": 100 }]
        };
        scope.registrations.push(angular.copy(newRegistration));   
        window.localStorage['registrations'] = angular.toJson(scope.registrations);   
        window.localStorage['chosenRegID'] = angular.toJson(newRegistration.rID);
        
        expect(scope.getMealRecommendations(5).length).toEqual(1);
    });
    
    it("should show all of the snack recommendations if a patient haven't consumed any of the energy needed for a day", function() {
        scope.loggedInUser = {"SSN": 3333, "weight": 100};
        window.localStorage['loggedInUser'] = angular.toJson(scope.loggedInUser);
        var today = new Date();
        var weekday=new Array("Søndag","Mandag","Tirsdag","Onsdag","Torsdag","Fredag","Lørdag");
        var monthname=new Array("Januar","Februar","Marts","April","Maj","Juni","Juli","August","September","October","November","December");
        var newRegistration = 
        { 
          "rID": 100, 
          "userSSN": parseInt(scope.loggedInUser.SSN),
          "title": weekday[today.getDay()] + " d. " + today.getDate() + ". " + monthname[today.getMonth()] + " " + today.getFullYear(),
          "date": today,
          "meals": [{ "id": 55, "cat": "snack", "name": "1 spsk. nøddemix", "energy": 0, "protein": 0, "amount": 100 }]
        };
        scope.registrations.push(angular.copy(newRegistration));   
        window.localStorage['registrations'] = angular.toJson(scope.registrations);   
        window.localStorage['chosenRegID'] = angular.toJson(newRegistration.rID);
        
        expect(scope.getMealRecommendations(5).length).toEqual(5);
    });
});