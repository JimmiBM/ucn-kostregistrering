angular.module('starter.controllers')

.controller('PatientCtrl', ['$scope', '$http', function($scope){

	$scope.login = function () {
		$location.path('/home' );
	};

}]);