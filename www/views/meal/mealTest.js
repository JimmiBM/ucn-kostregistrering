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
        var blabla = scope.getMealRecommendations(5);
        console.log(blabla);
        var firstSnackID = blabla[0].meals[0].id;
        expect(firstSnackID).toEqual(48);
    });
});