describe("MealCtrl", function() {

    var scope, controller;
    beforeEach(module('App'));

    beforeEach(inject(function (
        $rootScope,
        $controller,
        $ionicModal, 
        $ionicLoading,
        $ionicPopup,
        Meals,
        $filter,
        $window,
        $ionicSideMenuDelegate) {

            scope = $rootScope.$new();  
        
            controller = $controller('MealCtrl', {
                $scope: scope,
                $rootScope: $rootScope,
                $ionicModal: $ionicModal,
                $ionicLoading: $ionicLoading,
                $ionicPopup: $ionicPopup,
                Meals: Meals,
                $filter: $filter,
                $window: $window,
                $ionicSideMenuDelegate: $ionicSideMenuDelegate
                
            });
    }));
    
    it("should have a scope variable defined", function() {
        expect(scope).toBeDefined();
    });
    
    it("should have at least one registration", function(){
        expect(scope.Registrations.length).not.toEqual(0);
    });
    
    it("should be able to find a registered meal from id", function(){
        expect(scope.getRegistrationByID(1).userSSN).toEqual(1234567890);
    });
    
    it("should be able to register a meal registration", function(){
        scope.data = {};
        scope.data.userSSN = 1234567890;
        
        scope.createRegistration();
        expect(scope.getRegistrationByID(scope.Regisrations.All.count-1).userSSN).toEqual(1234567890);
    });
});

