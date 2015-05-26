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
        
    
        it('adds two numbers together', function () {
            expect(1 + 2).toEqual(3);
        });
        
       

});

