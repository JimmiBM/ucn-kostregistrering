var app = angular.module('App', ['ionic']);
//var app = angular.module('App', ['ionic', 'firebase', 'ngRoute']);
app.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/home/home.html'
    })
    .state('login', {
      url: '/login',
      controller: 'UserCtrl',
      templateUrl: 'views/user/login.html'
    })
    .state('nutrition', {
      url: '/myNutrition',
      templateUrl: 'views/nutrition/nutritions.html'
    })
    .state('settings', {
      url: '/settings',
      controller: 'UserCtrl',
      templateUrl: 'views/settings/settings.html'
    })
    .state('edituser', {
      url: '/edituser',
      controller: 'UserCtrl',
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
            controller: 'MealCtrl',
            templateUrl: 'views/meal/breakfast.html'
        }
      }
    })
    .state('meal.dinner', {
      url: '/dinner',
      views: {
          'meal-dinner': {
            controller: 'MealCtrl',
            templateUrl: 'views/meal/dinner.html'
        }
      }
    })
    .state('meal.supper', {
      url: '/supper',
      views: {
         'meal-supper': {
           controller: 'MealCtrl',
           templateUrl: 'views/meal/supper.html'
        }
      }
    })
    .state('meal.snack', {
      url: '/snack',
      views: {
          'meal-snack': {
            controller: 'MealCtrl',
            templateUrl: 'views/meal/snack.html'
        }
      }
    })
    .state('meal.drink', {
      url: '/drink',
      views: {
         'meal-drink': {
           controller: 'MealCtrl',
           templateUrl: 'views/meal/drink.html'
        }
      }
    });

  if(window.localStorage['loggedInUser']) {
  	$urlRouterProvider.otherwise('/');
  }else{
  	$urlRouterProvider.otherwise('/login');
  }
})

app.run(function($ionicPlatform, $location) {
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

  //If first visit, insert standard db
  var firstVisit = localStorage.getItem('firstVisitKostReg');
  if (!firstVisit) {
    console.log("First time!");
     var meals = [
        { "cat": "breakfast", "name": "1 stk. franskbrød smurt", "energy": "330", "protein": "2,5" },
        { "cat": "breakfast", "name": "1 stk. rundstykke smurt", "energy": "550", "protein": "6,5" },
        { "cat": "breakfast", "name": "1/2 stk. rugbrød smurt", "energy": "210", "protein": "1,5" },
        { "cat": "breakfast", "name": "1 pk. kærgården", "energy": "315", "protein": "0" },
        { "cat": "breakfast", "name": "1 pk. lätta", "energy": "170", "protein": "0" },
        { "cat": "breakfast", "name": "1 skive 45+ ost", "energy": "270", "protein": "5,0" },
        { "cat": "breakfast", "name": "1 skive 30+ ost", "energy": "210", "protein": "6,0" },
        { "cat": "breakfast", "name": "1 port. smøreost", "energy": "210", "protein": "1,5" },
		    { "cat": "breakfast", "name": "1 port. skimmelost", "energy": "210", "protein": "1,5" },
        { "cat": "breakfast", "name": "100 ml. havregrød", "energy": "420", "protein": "4,0" },
        { "cat": "breakfast", "name": "100 ml. øllebrød", "energy": "270", "protein": "1,0" },
        { "cat": "breakfast", "name": "1 spsk. piskefløde", "energy": "230", "protein": "0,5" },
        { "cat": "breakfast", "name": "1 tsk. sukker", "energy": "85", "protein": "0" },
        { "cat": "breakfast", "name": "1 tsk. ymerdrys", "energy": "85", "protein": "0" },
        { "cat": "breakfast", "name": "1 dl. cornflakes", "energy": "380", "protein": "2,0" },
        { "cat": "breakfast", "name": "1 dl. havregryn", "energy": "500", "protein": "4,0" },
        { "cat": "breakfast", "name": "1 dl. müsli", "energy": "500", "protein": "4,0" },
        { "cat": "breakfast", "name": "100 ml. ymer", "energy": "300", "protein": "6,0" },
        { "cat": "breakfast", "name": "100 ml. ylette", "energy": "300", "protein": "6,0" },
        { "cat": "breakfast", "name": "100 ml. yoghurt", "energy": "380", "protein": "3,0" },
        { "cat": "breakfast", "name": "100 ml. A-38", "energy": "380", "protein": "3,0" },
        { "cat": "breakfast", "name": "100 ml. Cheasy yoghurt", "energy": "190", "protein": "4,0" },
        { "cat": "breakfast", "name": "1 port. marmelade", "energy": "170", "protein": "0" },
        { "cat": "breakfast", "name": "1 port. honning", "energy": "170", "protein": "0" },
        { "cat": "lunch", "name": "100 ml. suppe, klar", "energy": "150", "protein": "1,5" },
        { "cat": "lunch", "name": "100 ml. suppe, legeret", "energy": "300", "protein": "3,0" },
        { "cat": "lunch", "name": "1 port. lun ret", "energy": "750", "protein": "6,5" },
        { "cat": "lunch", "name": "1/2 stk. rugbrød", "energy": "210", "protein": "1,5" },
        { "cat": "lunch", "name": "1 stk franskbrød", "energy": "340", "protein": "2,5" },
        { "cat": "lunch", "name": "1 stk grovbrød", "energy": "340", "protein": "2,5" },
        { "cat": "lunch", "name": "1 pk. kærgården", "energy": "315", "protein": "0" },
        { "cat": "lunch", "name": "1 pk. lätta", "energy": "170", "protein": "0" },
        { "cat": "lunch", "name": "Pålæg til 1/2 stk. brød", "energy": "170", "protein": "4,0" },
        { "cat": "lunch", "name": "1 port. råkost", "energy": "130", "protein": "0,5" },
        { "cat": "lunch", "name": "1 port. salat", "energy": "130", "protein": "0,5" },
        { "cat": "lunch", "name": "1 tsk. mayonnaise", "energy": "300", "protein": "0" },
        { "cat": "lunch", "name": "1 tsk. remoulade", "energy": "170", "protein": "0" },
        { "cat": "dinner", "name": "1 port. hovedret, lille", "energy": "630", "protein": "7,0" },
        { "cat": "dinner", "name": "1 port. hovedret, medium", "energy": "1300", "protein": "15,0" },
        { "cat": "dinner", "name": "1 port. hovedret, normal", "energy": "1900", "protein": "20,0" },
        { "cat": "dinner", "name": "1 port. dessert", "energy": "1300", "protein": "7,0" },
        { "cat": "dinner", "name": "1 stk. frisk frugt", "energy": "230", "protein": "1,0" },
        { "cat": "dinner", "name": "1 port. frugtgrød", "energy": "420", "protein": "0,4" },
        { "cat": "dinner", "name": "1 port. suppe, legeret 200 ml.", "energy": "600", "protein": "6,0" },
        { "cat": "dinner", "name": "1 port. suppe, klar 200 ml.", "energy": "300", "protein": "3,0" },
        { "cat": "snack", "name": "1 stk. brød med marmelade", "energy": "680", "protein": "2,0" },
        { "cat": "snack", "name": "1 stk. brød med ost", "energy": "710", "protein": "7,0" },
        { "cat": "snack", "name": "1 stk. brød med pålæg", "energy": "710", "protein": "7,0" },
        { "cat": "snack", "name": "1 port. frugt", "energy": "230", "protein": "1,0" },
        { "cat": "snack", "name": "1 stk. kage", "energy": "840", "protein": "2,5" },
        { "cat": "snack", "name": "1 stk. kræmmerhus", "energy": "840", "protein": "2,5" },
        { "cat": "snack", "name": "1 flødebolle, mini", "energy": "150", "protein": "0,5" },
        { "cat": "snack", "name": "1 stk. chokolade á 10 g.", "energy": "210", "protein": "0,5" },
        { "cat": "snack", "name": "1 spsk. nøddemix", "energy": "710", "protein": "3,0" },
        { "cat": "snack", "name": "1 pose chips, 30 g.", "energy": "670", "protein": "1,5" },
        { "cat": "snack", "name": "1 pose saltstænger 30 g.", "energy": "670", "protein": "1,5" },
        { "cat": "snack", "name": "1 stk. / port. alm. is", "energy": "600", "protein": "3,0" },
        { "cat": "snack", "name": "1 port. is, energitæt", "energy": "880", "protein": "4,5" },
        { "cat": "snack", "name": "1 port. frugtgrød", "energy": "420", "protein": "0,5" },
        { "cat": "snack", "name": "1 port. fromage eller trifli", "energy": "1050", "protein": "6,0" },
        { "cat": "snack", "name": "1 spsk. piskefløde", "energy": "230", "protein": "0,5" },
        { "cat": "snack", "name": "1 spsk. flødeskum", "energy": "230", "protein": "0,5" },
        { "cat": "snack", "name": "1 burgerbolle med fyld", "energy": "1260", "protein": "15,0" },
    		{ "cat": "drink", "name": "175 ml. sødmælk", "energy": "460", "protein": "6,0" },
    		{ "cat": "drink", "name": "175 ml. minimælk", "energy": "300", "protein": "6,0" },
    		{ "cat": "drink", "name": "175 ml. skummetmælk", "energy": "250", "protein": "6,0" },
    		{ "cat": "drink", "name": "175 ml. kærnemælk", "energy": "250", "protein": "6,0" },
    		{ "cat": "drink", "name": "175 ml. kakaoskummetmælk", "energy": "420", "protein": "6,0" },
    		{ "cat": "drink", "name": "175 ml. juice", "energy": "340", "protein": "1,0" },
    		{ "cat": "drink", "name": "175 ml. sodavand med sukker", "energy": "300", "protein": "0" },
    		{ "cat": "drink", "name": "175 ml. saftevand med sukker", "energy": "300", "protein": "0" },
    		{ "cat": "drink", "name": "175 ml. lys øl", "energy": "250", "protein": "0,2" },
    		{ "cat": "drink", "name": "175 ml. hvidtøl", "energy": "250", "protein": "0,2" },
    		{ "cat": "drink", "name": "50 ml. piskefløde 38% fedt", "energy": "750", "protein": "1,0" },
    		{ "cat": "drink", "name": "50 ml. kaffefløde 9% fedt", "energy": "230", "protein": "1,5" },
    		{ "cat": "drink", "name": "175 ml. vand", "energy": "0", "protein": "0" },
    		{ "cat": "drink", "name": "175 ml. danskvand", "energy": "0", "protein": "0" },
    		{ "cat": "drink", "name": "175 ml. kaffe", "energy": "0", "protein": "0" },
    		{ "cat": "drink", "name": "175 ml. te", "energy": "0", "protein": "0" },
    		{ "cat": "drink", "name": "175 ml. sodavand uden sukker", "energy": "0", "protein": "0" },
    		{ "cat": "drink", "name": "175 ml. saftevand uden sukker", "energy": "0", "protein": "0" },
    		{ "cat": "drink", "name": "100 ml. Glukose 20%", "energy": "340", "protein": "0" },
    		{ "cat": "drink", "name": "200 ml. Fresubin jucy drink", "energy": "1260", "protein": "8,0" },
    		{ "cat": "drink", "name": "200 ml. Fresubin energi drink", "energy": "1260", "protein": "10,0" },
    		{ "cat": "drink", "name": "125 ml. Nutridrink Compact", "energy": "1260", "protein": "12,0" },
    		{ "cat": "drink", "name": "200 ml. F protein energi drink", "energy": "1260", "protein": "20,0" },
    		{ "cat": "drink", "name": "200 ml. Fresubin 2 kcal drink", "energy": "1680", "protein": "20,0" },
    		{ "cat": "drink", "name": "175 ml. Arla Protin med sukker", "energy": "880", "protein": "10,0" },
    		{ "cat": "drink", "name": "125 ml. Fresubin yocrème", "energy": "800", "protein": "9,5" },
    		{ "cat": "drink", "name": "500 ml. Fresubin HP energi", "energy": "3150", "protein": "40,0" },
    		{ "cat": "drink", "name": "1000 ml. Fresubin complete", "energy": "5040", "protein": "60,0" },
    		{ "cat": "drink", "name": "500 ml. Fresubin energi fiber", "energy": "3150", "protein": "30,0" },
    		{ "cat": "drink", "name": "500 ml. Fresubin original fiber", "energy": "2100", "protein": "20,0" },
    		{ "cat": "drink", "name": "500 ml. Isosource mix", "energy": "2100", "protein": "22,0" },
    		{ "cat": "drink", "name": "500 ml. Survimed OPD", "energy": "2100", "protein": "23,0" },
    		{ "cat": "drink", "name": "500 ml. Nutrison low sodium", "energy": "2100", "protein": "20,0" },
    		{ "cat": "drink", "name": "500 ml. Nutrison concentrated", "energy": "4200", "protein": "40,0" },
    		{ "cat": "drink", "name": "500 ml. Glukose 20%", "energy": "1680", "protein": "0" },
    		{ "cat": "drink", "name": "100 ml. SmofKaniven central", "energy": "460", "protein": "5,0" },
    		{ "cat": "drink", "name": "100 ml. SmofKaniven perifer", "energy": "300", "protein": "3,0" },
    		{ "cat": "drink", "name": "500 ml. Glukose 10%", "energy": "840", "protein": "0" },
    		{ "cat": "drink", "name": "NaCl", "energy": "-", "protein": "-" }
     ];  
     
     var users = [
       {"SSN": "1234561111", "firstname": "Jimmi", "surname": "Noob", "email": "Jimmi@Noob.dk", "password": "divareaper"},
       {"SSN": "2234561113", "firstname": "Henrik", "surname": "SkylderBurgers", "email": "Henrik@burgers.dk", "password": "burgers"},
       {"SSN": "3234561115", "firstname": "Chrisian", "surname": "Kradse", "email": "Kradse@Schachner.dk", "password": "superlamas"},
       {"SSN": "1234567890", "firstname": "Test", "surname": "Test", "email": "Test@Eksempel.dk", "password": "1234"}
     ];
     
     var registrations = [
       {
         "id": 1,
         "userSSN": 1234567890,
         "title": "Tirsdag d. 26/05/2015"
       }

     ];
     
     window.localStorage['users'] = angular.toJson(users);
     window.localStorage['meals'] = angular.toJson(meals);
     localStorage.setItem('firstVisitKostReg', '1');
  }
 
})


app.controller('NavbarCtrl', function ($scope, $ionicSideMenuDelegate) {

  $scope.openMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
});
