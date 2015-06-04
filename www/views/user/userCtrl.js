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
      $scope.userToEdit = getUserBySSN($scope.loggedInUser.SSN);
  }else{
  	  $ionicSideMenuDelegate.canDragContent(false);
  } 
  
  $scope.validateUser = function(user) {
    if(user.firstname && user.surname && user.SSN && user.email && user.weight
    && user.password) {
      if(Number.isInteger(parseInt(user.SSN)) &&  Number.isInteger(parseInt(user.weight))) {
        return 1;
      }else{
        return 2;
      }
      
    }else {
      return 3;
    }
  }
  
  $scope.showAlert = function(theTitle, theText) {
       var alertPopup = $ionicPopup.alert({
         title: theTitle,
         template: theText
       });
      };
 
  
  $scope.editUser = function(user) {
    
    if($scope.validateUser(user) == 1) {
      window.localStorage['loggedInUser'] = angular.toJson(user);
      Users.save($scope.users);
      $scope.showAlert('Success', 'Informationerne er blevet gemt');
    }else if($scope.validateUser(user) == 2) {
      $scope.showAlert('Fejl', 'CPR og/eller vægt i kg skal være i hele tal');
    }else if($scope.validateUser(user) == 3) {
      $scope.showAlert('Fejl', 'Alle felter skal udfyldes.');
    }        
  }
  
  
  
});
