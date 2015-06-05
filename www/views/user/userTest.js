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

    it('adds two numbers together', function () {
        expect(1 + 2).toEqual(3);
    });
    
    it("There should be a users array containing at least 1 user", function(){
        expect(scope.users.length).not.toBe(0);
    });
    
    it("should find the user with the correct SSN", function(){
        expect(scope.getUser(1234567890).SSN).toMatch("1234567890");
    });
        
    it("When logging in with test user there should be a loggedInUser saved in local storage", function(){
        scope.data = {
            SSN: '1234567890',
            password: '1234'
        };

        scope.login();
        expect(angular.fromJson(window.localStorage['loggedInUser']).SSN).toMatch("1234567890");
    }); 
    

//    it("should have types setup", function(){
//        expect(scope.accountTypes.length).toBe(3);
//
//    });

});

