angular.module('App').controller('HomeCtrl', function ($scope, $http, $timeout, $ionicModal, $ionicLoading, $ionicPopup, EventsService) {

  $scope.loggedInUser = angular.fromJson(window.localStorage['loggedInUser']);

});
