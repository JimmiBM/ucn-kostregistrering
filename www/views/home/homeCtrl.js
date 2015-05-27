angular.module('App').controller('HomeCtrl', function ($scope, $http, $timeout, $ionicModal, $ionicLoading, $ionicPopup) {

  $scope.loggedInUser = angular.fromJson(window.localStorage['loggedInUser']);
  

});
