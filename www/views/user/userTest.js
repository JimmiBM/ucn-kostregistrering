describe("UserCtrl", function() {

    var scope, controller;
    beforeEach(module('App'));

    beforeEach(inject(function (
        $rootScope,
        $controller,
        $ionicPopup,
        Users,
        $filter,
        $window,
        $ionicSideMenuDelegate) {

            scope = $rootScope.$new();  
        
            controller = $controller('UserCtrl', {
                $scope: scope,
                $ionicPopup: $ionicPopup,
                Users: Users,
                $filter: $filter,
                $window: $window,
                $ionicSideMenuDelegate: $ionicSideMenuDelegate
                
        });
    }));

    it("should have a scope variable defined", function() {
        expect(scope).toBeDefined();
    });
    
    describe('JavaScript addition operator', function () {
    it('adds two numbers together', function () {
        expect(1 + 2).toEqual(4);
    });
});

    /*it("should have a accounts array", function(){
        expect(scope.accounts.length).toBe(0);
    });

    it("should have types setup", function(){
        expect(scope.accountTypes.length).toBe(3);

    });*/

});

