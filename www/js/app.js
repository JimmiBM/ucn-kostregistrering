angular.module('App', ['ionic', 'firebase'])

.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/home/home.html'
    })
    .state('nutrition', {
      url: '/myNutrition',
      templateUrl: 'views/nutrition/nutritions.html'
    })
    .state('settings', {
      url: '/settings',
      templateUrl: 'views/settings/settings.html'
    })
    .state('edituser', {
      url: '/edituser',
      templateUrl: 'views/user/editUser.html'
    })
    .state('meal', {
      abstract: true,
      url: '/meal',
      templateUrl: 'views/meal/meal.html'
    })
    .state('meal.breakfast', {
      url: '/breakfast',
      views: {
          'meal-breakfast': {
          templateUrl: 'views/meal/breakfast.html'
        }
      }
    })
    .state('meal.dinner', {
      url: '/dinner',
      views: {
          'meal-dinner': {
          templateUrl: 'views/meal/dinner.html'
        }
      }
    })
    .state('meal.supper', {
      url: '/supper',
      views: {
         'meal-supper': {
          templateUrl: 'views/meal/supper.html'
        }
      }
    })
    .state('meal.snack', {
      url: '/snack',
      views: {
          'meal-snack': {
          templateUrl: 'views/meal/snack.html'
        }
      }
    });

  $urlRouterProvider.otherwise('/');
})

.run(function($ionicPlatform, $location) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

 
})

.factory('EventsService', function ($firebase) {
  var firebase = new Firebase('https://ionic-in-action-demo.firebaseio.com/events');
  var service = $firebase(firebase);
  return service;
})

.factory('MenuService', function ($firebase) {
  var firebase = new Firebase('https://ionic-in-action-demo.firebaseio.com/menu');
  var service = $firebase(firebase);
  return service;
})

.controller('NavbarCtrl', function ($scope, $ionicSideMenuDelegate) {

  $scope.openMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
});
