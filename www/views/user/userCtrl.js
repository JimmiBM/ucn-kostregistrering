app.controller('UserCtrl', function ($scope, $ionicPopup, Users, $filter, $window, $ionicSideMenuDelegate, $ionicModal, $location) {

  var getUserBySSN = function(cpr) {
      return $filter('filter')(Users.all(), {SSN: cpr})[0];
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
    if(user.firstname && user.surname && user.email
    && user.password) {
        return 1;     
    }else {
      return 3;
    }
  }
  
  $scope.showAlert = function(theTitle, theText, closeModal) {
       var alertPopup = $ionicPopup.alert({
         title: theTitle,
         template: theText
       });
       if(closeModal) {
         alertPopup.then(function(res) {
           $scope.modal.hide();
         });
       }
       
      };
 
  $scope.form = {};
  
  $scope.editUser = function(user) {
    
    if($scope.validateUser(user) == 1) {
      if($scope.form.editForm.$valid) {
        window.localStorage['loggedInUser'] = angular.toJson(user);
        Users.save($scope.users);
        $scope.showAlert('Success', 'Informationerne er blevet gemt.', false);
      }else {
        $scope.showAlert('Fejl', 'CPR og/eller vægt i kg skal være i hele tal.', false);
      }
    }else if($scope.validateUser(user) == 2) {
      $scope.showAlert('Fejl', 'CPR og/eller vægt i kg skal være i hele tal.', false);
    }else if($scope.validateUser(user) == 3) {
      $scope.showAlert('Fejl', 'Alle felter skal udfyldes.', false);
    }        
  }
  
  $scope.createUser = function(user) {
    
    if($scope.validateUser(user) == 1) {
      if($scope.form.createForm.$valid) {
        $scope.users.push(angular.copy(user));
        Users.save($scope.users);
        $scope.showAlert('Success', 'Din profil er oprettet og du kan nu logge ind.', true);
      }else {
        $scope.showAlert('Fejl', 'CPR og/eller vægt i kg skal være i hele tal.', false);
      }
      
    }else if($scope.validateUser(user) == 2) {
      $scope.showAlert('Fejl', 'CPR og/eller vægt i kg skal være i hele tal.', false);
    }else if($scope.validateUser(user) == 3) {
      $scope.showAlert('Fejl', 'Alle felter skal udfyldes.', false);
    }
       
  }
  
  $scope.openCreate = function(){
    $scope.userToCreate = {
      "SSN": "", 
      "firstname": "", 
      "surname": "", 
      "email": "", 
      "password": "", 
      "weight": ""
      }
    
    
    $ionicModal.fromTemplateUrl('views/user/createUser.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };
  
  $scope.cancelCreate = function () {
    $scope.modal.hide();
  };
  
  
});
