app.controller('UserCtrl', function ($scope, $ionicPopup, Users, $filter, $window, $ionicSideMenuDelegate) {

  var getUserBySSN = function(cpr) {
      return $filter('filter')($scope.users, {SSN: cpr})[0];
  };
  
  var loginUser = function(ssn, password) {
      var user = getUserBySSN(ssn);
      if(user.password === password) {
        window.localStorage['loggedInUser'] = angular.toJson(user);
        $ionicSideMenuDelegate.canDragContent(true);
        $window.location.href = '#/';
      } else {
         $ionicPopup.show({
          title: 'Forkert indtastede oplysninger',
          subTitle: 'Det indtastede cpr nummer <br/>eller kode er forkert!',
          scope: $scope,
          buttons: [
            { text: 'OK' }
          ]
        });
      }
  };
  
  var logoutUser = function() {
      window.localStorage.removeItem('loggedInUser');
      $window.location.href = '#/login';
  };
  
  //$scope.user = angular.fromJson(userAppString);

  // Load or initialize projects
  $scope.users = Users.all();
  
  // data from template
  $scope.data = {};
  
  $scope.loggedInUser = angular.fromJson(window.localStorage['loggedInUser']);
  
  // Called to create a new user
  $scope.newUser = function() {
    createUser();
  };
  
  // Called to get user by SIN
  $scope.getUser = function(cpr) {
    return getUserBySSN(cpr);
  };
  
  $scope.login = function() {
    loginUser($scope.data.SSN, $scope.data.password);
  };

  $scope.logout = function(){
    logoutUser();
  };
  
 if(window.localStorage['loggedInUser']) {
  	  $ionicSideMenuDelegate.canDragContent(true);
  }else{
  	  $ionicSideMenuDelegate.canDragContent(false);
  } 
  
  
});
