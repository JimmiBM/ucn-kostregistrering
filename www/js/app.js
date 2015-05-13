// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('login', {
    url: "/login",
    templateUrl: "templates/login/login.html",
    controller: 'PatientCtrl'
  })

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.home', {
    url: "/home",
    views: {
      'menuContent': {
        templateUrl: "templates/patient/patientInfo.html"
      }
    }
  })
  .state('app.kost', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/kost/tabs.html"
  })
  .state('app.kost.morgen', {
    url: '/morgen',
    views: {
      'menuContent': {
        templateUrl: 'templates/kost/tab-morgen.html',
        controller: 'KostCtrl'
      }
    }
  })
  .state('app.kost.middag', {
    url: '/middag',
    views: {
      'kosttab-middag': {
        templateUrl: 'templates/kost/tab-middag.html',
        controller: 'KostCtrl'
      }
    }
  })
  .state('app.kost.aften', {
    url: '/aften',
    views: {
      'kosttab-aften': {
        templateUrl: 'templates/kost/tab-aften.html',
        controller: 'KostCtrl'
      }
    }
  })
  .state('app.kost.mellem', {
    url: '/mellem',
    views: {
      'kosttab-mellem': {
        templateUrl: 'templates/kost/tab-mellem.html',
        controller: 'KostCtrl'
      }
    }
  })
  .state('app.kost.drink', {
    url: '/drink',
    views: {
      'kosttab-drink': {
        templateUrl: 'templates/kost/tab-drink.html',
        controller: 'KostCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
