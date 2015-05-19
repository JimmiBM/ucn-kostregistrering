app.controller('MealCtrl', function ($scope, $rootScope, $timeout, $ionicModal, $ionicLoading, $ionicPopup, Meals, $filter) {

  var createUser = function() {
    var newUser = Users.newUser();
    $scope.users.push(newUser);
    Users.save($scope.users);
    //$scope.selectUser(newUser, $scope.users.length-1);
  };

  //TODO: Ændre cpr til sin
  var getUserBySSN = function(cpr) {
      $filter('filter')($scope.users, {cpr: 1111901213})[0];
  };
  
  var loginUser = function(ssn, password) {
      var user = getUserBySSN(ssn);
      if(user.password == password) {
        console.log('YES');
      } else {
        console.log('FUCK NOOOOOO!');
      }
  };

  // Load or initialize projects
  $scope.users = Users.all();
  
  // data from template
  $scope.data = {};

 
  // Called to create a new user
  $scope.newUser = function() {
    createUser();
  };
  
  // Called to get user by SIN
  $scope.getUser = function(cpr) {
    getUserBySSN(cpr);
  };
  
  $scope.login = function() {
    loginUser($scope.data.SSN, $scope.data.password);
  }

});
