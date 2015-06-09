var app = angular.module('App', ['ionic', 'ui.router']);
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
  
  //window.localStorage.clear();

  //If first visit, insert standard db
  var firstVisit = localStorage.getItem('firstVisitKostReg');
  if (!firstVisit) {
    console.log("First time!");
     var meals = [
        { "id": 1, "cat": "breakfast", "name": "1 stk. franskbrød smurt", "energy": 330, "protein": 2.5 },
        { "id": 2, "cat": "breakfast", "name": "1 stk. rundstykke smurt", "energy": 550, "protein": 6.5 },
        { "id": 3, "cat": "breakfast", "name": "1/2 stk. rugbrød smurt", "energy": 210, "protein": 1.5 },
        { "id": 4, "cat": "breakfast", "name": "1 pk. kærgården", "energy": 315, "protein": 0 },
        { "id": 5, "cat": "breakfast", "name": "1 pk. lätta", "energy": 170, "protein": 0 },
        { "id": 6, "cat": "breakfast", "name": "1 skive 45+ ost", "energy": 270, "protein": 5 },
        { "id": 7, "cat": "breakfast", "name": "1 skive 30+ ost", "energy": 210, "protein": 6 },
        { "id": 8, "cat": "breakfast", "name": "1 port. smøreost", "energy": 210, "protein": 1.5 },
		{ "id": 9, "cat": "breakfast", "name": "1 port. skimmelost", "energy": 210, "protein": 1.5 },
        { "id": 10, "cat": "breakfast", "name": "100 ml. havregrød", "energy": 420, "protein": 4 },
        { "id": 12, "cat": "breakfast", "name": "100 ml. øllebrød", "energy": 270, "protein": 1 },
        { "id": 13, "cat": "breakfast", "name": "1 spsk. piskefløde", "energy": 230, "protein": 0.5 },
        { "id": 14, "cat": "breakfast", "name": "1 tsk. sukker", "energy": 85, "protein": 0 },
        { "id": 15, "cat": "breakfast", "name": "1 tsk. ymerdrys", "energy": 85, "protein": 0 },
        { "id": 16, "cat": "breakfast", "name": "1 dl. cornflakes", "energy": 380, "protein": 2 },
        { "id": 17, "cat": "breakfast", "name": "1 dl. havregryn", "energy": 500, "protein": 4 },
        { "id": 18, "cat": "breakfast", "name": "1 dl. müsli", "energy": 500, "protein": 4 },
        { "id": 19, "cat": "breakfast", "name": "100 ml. ymer", "energy": 300, "protein": 6 },
        { "id": 20, "cat": "breakfast", "name": "100 ml. ylette", "energy": 300, "protein": 6 },
        { "id": 21, "cat": "breakfast", "name": "100 ml. yoghurt", "energy": 380, "protein": 3 },
        { "id": 22, "cat": "breakfast", "name": "100 ml. A-38", "energy": 380, "protein": 3 },
        { "id": 23, "cat": "breakfast", "name": "100 ml. Cheasy yoghurt", "energy": 190, "protein": 4 },
        { "id": 24, "cat": "breakfast", "name": "1 port. marmelade", "energy": 170, "protein": 0 },
        { "id": 25, "cat": "breakfast", "name": "1 port. honning", "energy": 170, "protein": 0 },
        { "id": 26, "cat": "lunch", "name": "100 ml. suppe, klar", "energy": 150, "protein": 1.5 },
        { "id": 27, "cat": "lunch", "name": "100 ml. suppe, legeret", "energy": 300, "protein": 3 },
        { "id": 28, "cat": "lunch", "name": "1 port. lun ret", "energy": 750, "protein": 6.5 },
        { "id": 29, "cat": "lunch", "name": "1/2 stk. rugbrød", "energy": 210, "protein": 1.5 },
        { "id": 30, "cat": "lunch", "name": "1 stk franskbrød", "energy": 340, "protein": 2.5 },
        { "id": 31, "cat": "lunch", "name": "1 stk grovbrød", "energy": 340, "protein": 2.5 },
        { "id": 32, "cat": "lunch", "name": "1 pk. kærgården", "energy": 315, "protein": 0 },
        { "id": 33, "cat": "lunch", "name": "1 pk. lätta", "energy": 170, "protein": 0 },
        { "id": 34, "cat": "lunch", "name": "Pålæg til 1/2 stk. brød", "energy": 170, "protein": 4 },
        { "id": 35, "cat": "lunch", "name": "1 port. råkost", "energy": 130, "protein": 0.5 },
        { "id": 36, "cat": "lunch", "name": "1 port. salat", "energy": 130, "protein": 0.5 },
        { "id": 37, "cat": "lunch", "name": "1 tsk. mayonnaise", "energy": 300, "protein": 0 },
        { "id": 38, "cat": "lunch", "name": "1 tsk. remoulade", "energy": 170, "protein": 0 },
        { "id": 39, "cat": "dinner", "name": "1 port. hovedret, lille", "energy": 630, "protein": 7 },
        { "id": 40, "cat": "dinner", "name": "1 port. hovedret, medium", "energy": 1300, "protein": 15 },
        { "id": 41, "cat": "dinner", "name": "1 port. hovedret, normal", "energy": 1900, "protein": 20 },
        { "id": 42, "cat": "dinner", "name": "1 port. dessert", "energy": 1300, "protein": 7 },
        { "id": 43, "cat": "dinner", "name": "1 stk. frisk frugt", "energy": 230, "protein": 1 },
        { "id": 44, "cat": "dinner", "name": "1 port. frugtgrød", "energy": 420, "protein": 0.4 },
        { "id": 45, "cat": "dinner", "name": "1 port. suppe, legeret 200 ml.", "energy": 600, "protein": 6 },
        { "id": 46, "cat": "dinner", "name": "1 port. suppe, klar 200 ml.", "energy": 300, "protein": 3 },
        { "id": 47, "cat": "snack", "name": "1 stk. brød med marmelade", "energy": 680, "protein": 2 },
        { "id": 48, "cat": "snack", "name": "1 stk. brød med ost", "energy": 710, "protein": 7 },
        { "id": 49, "cat": "snack", "name": "1 stk. brød med pålæg", "energy": 710, "protein": 7 },
        { "id": 50, "cat": "snack", "name": "1 port. frugt", "energy": 230, "protein": 1 },
        { "id": 51, "cat": "snack", "name": "1 stk. kage", "energy": 840, "protein": 2.5 },
        { "id": 52, "cat": "snack", "name": "1 stk. kræmmerhus", "energy": 840, "protein": 2.5 },
        { "id": 53, "cat": "snack", "name": "1 flødebolle, mini", "energy": 150, "protein": 0.5 },
        { "id": 54, "cat": "snack", "name": "1 stk. chokolade á 10 g.", "energy": 210, "protein": 0.5 },
        { "id": 55, "cat": "snack", "name": "1 spsk. nøddemix", "energy": 710, "protein": 3 },
        { "id": 56, "cat": "snack", "name": "1 pose chips, 30 g.", "energy": 670, "protein": 1.5 },
        { "id": 57, "cat": "snack", "name": "1 pose saltstænger 30 g.", "energy": 670, "protein": 1.5 },
        { "id": 58, "cat": "snack", "name": "1 stk. / port. alm. is", "energy": 600, "protein": 3 },
        { "id": 59, "cat": "snack", "name": "1 port. is, energitæt", "energy": 880, "protein": 4.5 },
        { "id": 60, "cat": "snack", "name": "1 port. frugtgrød", "energy": 420, "protein": 0.5 },
        { "id": 61, "cat": "snack", "name": "1 port. fromage eller trifli", "energy": 1050, "protein": 6 },
        { "id": 62, "cat": "snack", "name": "1 spsk. piskefløde", "energy": 230, "protein": 0.5 },
        { "id": 63, "cat": "snack", "name": "1 spsk. flødeskum", "energy": 230, "protein": 0.5 },
        { "id": 64, "cat": "snack", "name": "1 burgerbolle med fyld", "energy": 1260, "protein": 15 },
      	{ "id": 65, "cat": "drink", "name": "175 ml. sødmælk", "energy": 460, "protein": 6 },
      	{ "id": 66, "cat": "drink", "name": "175 ml. minimælk", "energy": 300, "protein": 6 },
      	{ "id": 67, "cat": "drink", "name": "175 ml. skummetmælk", "energy": 250, "protein": 6 },
      	{ "id": 68, "cat": "drink", "name": "175 ml. kærnemælk", "energy": 250, "protein": 6 },
      	{ "id": 69, "cat": "drink", "name": "175 ml. kakaoskummetmælk", "energy": 420, "protein": 6 },
      	{ "id": 70, "cat": "drink", "name": "175 ml. juice", "energy": 340, "protein": 1 },
      	{ "id": 71, "cat": "drink", "name": "175 ml. sodavand med sukker", "energy": 300, "protein": 0 },
      	{ "id": 72, "cat": "drink", "name": "175 ml. saftevand med sukker", "energy": 300, "protein": 0 },
      	{ "id": 73, "cat": "drink", "name": "175 ml. lys øl", "energy": 250, "protein": 0.2 },
      	{ "id": 74, "cat": "drink", "name": "175 ml. hvidtøl", "energy": 250, "protein": 0.2 },
      	{ "id": 75, "cat": "drink", "name": "50 ml. piskefløde 38% fedt", "energy": 750, "protein": 1 },
      	{ "id": 76, "cat": "drink", "name": "50 ml. kaffefløde 9% fedt", "energy": 230, "protein": 1.5 },
      	{ "id": 77, "cat": "drink", "name": "175 ml. vand", "energy": 0, "protein": 0 },
      	{ "id": 78, "cat": "drink", "name": "175 ml. danskvand", "energy": 0, "protein": 0 },
      	{ "id": 79, "cat": "drink", "name": "175 ml. kaffe", "energy": 0, "protein": 0 },
      	{ "id": 80, "cat": "drink", "name": "175 ml. te", "energy": 0, "protein": 0 },
      	{ "id": 81, "cat": "drink", "name": "175 ml. sodavand uden sukker", "energy": 0, "protein": 0 },
      	{ "id": 82, "cat": "drink", "name": "175 ml. saftevand uden sukker", "energy": 0, "protein": 0 },
      	{ "id": 83, "cat": "drink", "name": "100 ml. Glukose 20%", "energy": 340, "protein": 0 },
      	{ "id": 84, "cat": "drink", "name": "200 ml. Fresubin jucy drink", "energy": 1260, "protein": 8 },
      	{ "id": 85, "cat": "drink", "name": "200 ml. Fresubin energi drink", "energy": 1260, "protein": 10 },
      	{ "id": 86, "cat": "drink", "name": "125 ml. Nutridrink Compact", "energy": 1260, "protein": 12 },
      	{ "id": 87, "cat": "drink", "name": "200 ml. F protein energi drink", "energy": 1260, "protein": 20 },
      	{ "id": 88, "cat": "drink", "name": "200 ml. Fresubin 2 kcal drink", "energy": 1680, "protein": 20 },
      	{ "id": 89, "cat": "drink", "name": "175 ml. Arla Protin med sukker", "energy": 880, "protein": 10 },
      	{ "id": 90, "cat": "drink", "name": "125 ml. Fresubin yocrème", "energy": 800, "protein": 9.5 },
      	{ "id": 91, "cat": "drink", "name": "500 ml. Fresubin HP energi", "energy": 3150, "protein": 40 },
      	{ "id": 92, "cat": "drink", "name": "1000 ml. Fresubin complete", "energy": 5040, "protein": 60 },
      	{ "id": 93, "cat": "drink", "name": "500 ml. Fresubin energi fiber", "energy": 3150, "protein": 30 },
      	{ "id": 94, "cat": "drink", "name": "500 ml. Fresubin original fiber", "energy": 2100, "protein": 20 },
      	{ "id": 95, "cat": "drink", "name": "500 ml. Isosource mix", "energy": 2100, "protein": 22 },
      	{ "id": 96, "cat": "drink", "name": "500 ml. Survimed OPD", "energy": 2100, "protein": 23 },
      	{ "id": 97, "cat": "drink", "name": "500 ml. Nutrison low sodium", "energy": 2100, "protein": 20 },
      	{ "id": 98, "cat": "drink", "name": "500 ml. Nutrison concentrated", "energy": 4200, "protein": 40 },
      	{ "id": 99, "cat": "drink", "name": "500 ml. Glukose 20%", "energy": 1680, "protein": 0 },
      	{ "id": 100, "cat": "drink", "name": "100 ml. SmofKaniven central", "energy": 460, "protein": 5 },
      	{ "id": 101, "cat": "drink", "name": "100 ml. SmofKaniven perifer", "energy": 300, "protein": 3 },
      	{ "id": 102, "cat": "drink", "name": "500 ml. Glukose 10%", "energy": 840, "protein": 0 },
      	{ "id": 103, "cat": "drink", "name": "NaCl", "energy": 0, "protein": 0 }
     ];  
     
     var users = [
        {"SSN": "1234561111", "firstname": "Jimmi", "surname": "Noob", "email": "Jimmi@Noob.dk", "password": "divareaper", "weight": "70"},
        {"SSN": "2234561113", "firstname": "Henrik", "surname": "SkylderBurgers", "email": "Henrik@burgers.dk", "password": "burgers", "weight": "70"},
        {"SSN": "3234561115", "firstname": "Chrisian", "surname": "Kradse", "email": "Kradse@Schachner.dk", "password": "superlamas", "weight": "70"},
        {"SSN": "1234567890", "firstname": "Test", "surname": "Test", "email": "Test@Eksempel.dk", "password": "1234", "weight": "80"}
     ];
     
     var registrations = [
       {
         "rID":1,
         "userSSN":123434345,
         "title":"Tirsdag d. 26/05/2015",
         "date":"Thu May 28 2015 10:02:58 GMT+0200 (Romance Summer Time)",
         "meals":[
           {"mID":1,"id":1,"cat":"breakfast","name":"1 stk. franskbrød smurt","energy":"330","protein":"2,5","amount":100},
           {"mID":2,"id":65,"cat":"drink","name":"175 ml. sødmælk","energy":"460","protein":"6,0","amount":75},
           {"mID":3,"id":26,"cat":"lunch","name":"100 ml. suppe, legeret","energy":"300","protein":"3,0","amount":100},
           {"mID":4,"id":77,"cat":"drink","name":"175 ml. vand","energy":"0","protein":"0","amount":70},
           {"mID":5,"id":40,"cat":"dinner","name":"1 port. hovedret, medium","energy":"1300","protein":"15,0","amount":80},
           {"mID":6,"id":82,"cat":"drink","name":"175 ml. saftevand uden sukker","energy":"0","protein":"0","amount":100}
           ]
         },
       {
         "rID":2,
         "userSSN":1234567890,
         "title":"Mandag d. 25. Maj 2015",
         "date":"2015-05-25T09:31:47.222Z",
         "meals":[
           {"mID":1,"id":1,"cat":"breakfast","name":"1 stk. franskbrød smurt","energy":"330","protein":"2,5","amount":100},
           {"mID":2,"id":65,"cat":"drink","name":"175 ml. sødmælk","energy":"460","protein":"6,0","amount":75},
           {"mID":3,"id":26,"cat":"lunch","name":"100 ml. suppe, legeret","energy":"300","protein":"3,0","amount":100}
         ]
       },
       {
         "rID":3,
         "userSSN":1234567890,
         "title":"Tirsdag d. 26. Maj 2015",
         "date":"2015-05-26T09:31:47.222Z",
         "meals":[]
       },
       {
         "rID":4,
         "userSSN":1234567890,
         "title":"Onsdag d. 27. Maj 2015",
         "date":"2015-05-27T09:31:47.222Z",
         "meals":[]
       }
   ];

        var breakfastRecommendations = [
    {
      "recID": 1,
      "meals": [
        { "id": 2, "cat": "breakfast", "name": "1 stk. rundstykke smurt", "energy": 550, "protein": 6.5 },
        { "id": 7, "cat": "breakfast", "name": "1 skive 30+ ost", "energy": 210, "protein": 6 },
        { "id": 24, "cat": "breakfast", "name": "1 port. marmelade", "energy": 170, "protein": 0 },
        { "id": 23, "cat": "breakfast", "name": "100 ml. Cheasy yoghurt", "energy": 190, "protein": 4 }	
    ]},
    { 
      "recID": 2,
      "meals": [ 
        { "id": 17, "cat": "breakfast", "name": "1 dl. havregryn", "energy": 500, "protein": 4 },
        { "id": 21, "cat": "breakfast", "name": "100 ml. yoghurt", "energy": 380, "protein": 3 },
        { "id": 2, "cat": "breakfast", "name": "1 stk. rundstykke smurt", "energy": 550, "protein": 6.5 }, 
        { "id": 6, "cat": "breakfast", "name": "1 skive 45+ ost", "energy": 270, "protein": 5 }
    ]},
    {
      "recID": 3,
      "meals": [ 
        {"id": 10, "cat": "breakfast", "name": "100ml havregrød", "energy": 330, "protein": 2.5 },
        {"id": 10, "cat": "breakfast", "name": "100ml havregrød", "energy": 330, "protein": 2.5 },
        {"id": 170, "cat": "drink", "name": "175ml skummet mælk", "energy": 250, "protein": 6},
        { "id": 50, "cat": "snack", "name": "1 port. frugt", "energy": 230, "protein": 1 }
    ]},
    {
      "recID": 4,
      "meals": [ 
        { "id": 69, "cat": "drink", "name": "175 ml. kakaoskummetmælk", "energy": 420, "protein": 6 },
        { "id": 2, "cat": "breakfast", "name": "1 stk. rundstykke smurt", "energy": 550, "protein": 6.5 },
        { "id": 6, "cat": "breakfast", "name": "1 skive 45+ ost", "energy": 270, "protein": 5 }
    ]},
    {
      "recID": 5,
      "meals": [
        { "id": 2, "cat": "breakfast", "name": "1 stk. rundstykke smurt", "energy": 550, "protein": 6.5 }, 
        {"mID":1,"id":1,"cat":"breakfast","name":"1 stk. franskbrød smurt","energy":"330","protein":"2,5","amount":100},
        {"id": 170, "cat": "drink", "name": "175ml skummet mælk", "energy": 250, "protein": 6}
    ]}];
    
    var lunchRecommendations = [
    {
      "recID": 1,
      "meals": [ 
        { "id": 28, "cat": "lunch", "name": "1 port. lun ret", "energy": 750, "protein": 6.5 },
        { "id": 34, "cat": "lunch", "name": "Pålæg til 1/2 stk. brød", "energy": 170, "protein": 4 },
        { "id": 34, "cat": "lunch", "name": "Pålæg til 1/2 stk. brød", "energy": 170, "protein": 4 },
        { "id": 29, "cat": "lunch", "name": "1/2 stk. rugbrød", "energy": 210, "protein": 1.5 },
        { "id": 29, "cat": "lunch", "name": "1/2 stk. rugbrød", "energy": 210, "protein": 1.5 }
    ]},
    {
    "recID": 2,
    "meals": [ 
        { "id": 27, "cat": "lunch", "name": "100 ml. suppe, legeret", "energy": 300, "protein": 3 },
        { "id": 31, "cat": "lunch", "name": "1 stk grovbrød", "energy": 340, "protein": 2.5 },
        { "id": 30, "cat": "lunch", "name": "1 stk franskbrød", "energy": 340, "protein": 2.5 },
        { "id": 32, "cat": "lunch", "name": "1 pk. kærgården", "energy": 315, "protein": 0 },
        { "id": 34, "cat": "lunch", "name": "Pålæg til 1/2 stk. brød", "energy": 170, "protein": 4 },
        { "id": 34, "cat": "lunch", "name": "Pålæg til 1/2 stk. brød", "energy": 170, "protein": 4 }
    ]},
    {
      "recID": 3,
      "meals": [ 
        { "id": 31, "cat": "lunch", "name": "1 stk grovbrød", "energy": 340, "protein": 2.5 },
        { "id": 1, "cat": "breakfast", "name": "1 stk. franskbrød smurt", "energy": 330, "protein": 2.5 },
        { "id": 34, "cat": "lunch", "name": "Pålæg til 1/2 stk. brød", "energy": 170, "protein": 4 },
        { "id": 34, "cat": "lunch", "name": "Pålæg til 1/2 stk. brød", "energy": 170, "protein": 4 },
        { "id": 67, "cat": "drink", "name": "175 ml. skummetmælk", "energy": 250, "protein": 6 }
    ]},
    {
      "recID": 4,
      "meals": [ 
        { "id": 28, "cat": "lunch", "name": "1 port. lun ret", "energy": 750, "protein": 6.5 },
        { "id": 28, "cat": "lunch", "name": "1 port. lun ret", "energy": 750, "protein": 6.5 },
        { "id": 36, "cat": "lunch", "name": "1 port. salat", "energy": 130, "protein": 0.5 },
        { "id": 36, "cat": "lunch", "name": "1 port. salat", "energy": 130, "protein": 0.5 },
        { "id": 67, "cat": "drink", "name": "175 ml. skummetmælk", "energy": 250, "protein": 6 }
    ]},
    {
      "recID": 5,
      "meals": [ 
        { "id": 26, "cat": "lunch", "name": "100 ml. suppe, klar", "energy": 150, "protein": 1.5 },
        { "id": 94, "cat": "drink", "name": "500 ml. Fresubin original fiber", "energy": 2100, "protein": 20 },
        { "id": 36, "cat": "lunch", "name": "1 port. salat", "energy": 130, "protein": 0.5 }
    ]}];
    
    var afternoonSnackRecommendations = [
    {
      "recID": 1,
      "meals": [
        { "id": 1, "cat": "breakfast", "name": "1 stk. franskbrød smurt", "energy": 330, "protein": 2.5 },
    	{ "id": 1, "cat": "breakfast", "name": "1 stk. franskbrød smurt", "energy": 330, "protein": 2.5 },
    	{ "id": 1, "cat": "breakfast", "name": "1 stk. franskbrød smurt", "energy": 330, "protein": 2.5 },
    	{ "id": 90, "cat": "drink", "name": "125 ml. Fresubin yocrème", "energy": 800, "protein": 9.5 }
	   ]}];
    
    var dinnerRecommendations = [
    {
    "recID": 1,
    "meals": [ 
        { "id": 43, "cat": "dinner", "name": "1 stk. frisk frugt", "energy": 230, "protein": 1 },
        { "id": 43, "cat": "dinner", "name": "1 stk. frisk frugt", "energy": 230, "protein": 1 },
        { "id": 42, "cat": "dinner", "name": "1 port. dessert", "energy": 1300, "protein": 7 },
        { "id": 69, "cat": "drink", "name": "175 ml. kakaoskummetmælk", "energy": 420, "protein": 6 }
    ]},
    {
      "recID": 2,
      "meals": [ 
        { "id": 43, "cat": "dinner", "name": "1 stk. frisk frugt", "energy": 230, "protein": 1 },
        { "id": 42, "cat": "dinner", "name": "1 port. dessert", "energy": 1300, "protein": 7 },
        { "id": 55, "cat": "snack", "name": "1 spsk. nøddemix", "energy": 710, "protein": 3 },
        { "id": 69, "cat": "drink", "name": "175 ml. kakaoskummetmælk", "energy": 420, "protein": 6 }
    ]},
    {
      "recID": 3,
      "meals": [ 
        { "id": 39, "cat": "dinner", "name": "1 port. hovedret, lille", "energy": 630, "protein": 7 },
        { "id": 43, "cat": "dinner", "name": "1 stk. frisk frugt", "energy": 230, "protein": 1 },
        { "id": 43, "cat": "dinner", "name": "1 stk. frisk frugt", "energy": 230, "protein": 1 },
        { "id": 43, "cat": "dinner", "name": "1 stk. frisk frugt", "energy": 230, "protein": 1 },
        { "id": 66, "cat": "drink", "name": "175 ml. minimælk", "energy": 300, "protein": 6 }
    ]},
    {
      "recID": 4,
      "meals": [ 
        { "id": 39, "cat": "dinner", "name": "1 port. hovedret, lille", "energy": 630, "protein": 7 },
        { "id": 42, "cat": "dinner", "name": "1 port. dessert", "energy": 1300, "protein": 7 },
        { "id": 70, "cat": "drink", "name": "175 ml. juice", "energy": 340, "protein": 1 }
    ]},
    {
      "recID": 5,
      "meals": [ 
        { "id": 40, "cat": "dinner", "name": "1 port. hovedret, medium", "energy": 1300, "protein": 15 },
        { "id": 43, "cat": "dinner", "name": "1 stk. frisk frugt", "energy": 230, "protein": 1 },
        { "id": 82, "cat": "drink", "name": "175 ml. saftevand uden sukker", "energy": 0, "protein": 0 },
    ]}];
    
    var snackRecommendations = [
    {
      "recID": 1,
      "meals": [
        { "id": 48, "cat": "snack", "name": "1 stk. brød med ost", "energy": 710, "protein": 7 },
        { "id": 66, "cat": "drink", "name": "175 ml. minimælk", "energy": 300, "protein": 6 },
    ]},
    {
      "recID": 2,
      "totalProtein": 10.5,
      "meals": [ 
        { "id": 47, "cat": "snack", "name": "1 stk. brød med marmelade", "energy": 680, "protein": 2 },
        { "id": 69, "cat": "drink", "name": "175 ml. kakaoskummetmælk", "energy": 420, "protein": 6 },
        { "id": 51, "cat": "snack", "name": "1 stk. kage", "energy": 840, "protein": 2.5 }
    ]},
    {
      "recID": 3,
      "totalProtein": 12,
      "meals": [ 
        { "id": 61, "cat": "snack", "name": "1 port. fromage eller trifli", "energy": 1050, "protein": 6 },
        { "id": 69, "cat": "drink", "name": "175 ml. kakaoskummetmælk", "energy": 420, "protein": 6 }
    ]},
    {
      "recID": 4,
      "totalProtein": 15,
      "meals": [ 
        { "id": 64, "cat": "snack", "name": "1 burgerbolle med fyld", "energy": 1260, "protein": 15 },
        { "id": 71, "cat": "drink", "name": "175 ml. sodavand med sukker", "energy": 300, "protein": 0 }
    ]},
    {
      "recID": 5,
      "totalProtein": 20,
      "meals": [ 
        { "id": 87, "cat": "drink", "name": "200 ml. F protein energi drink", "energy": 1260, "protein": 20 },
    ]}];

	
	  var nightSnackRecommendations = [
    {
      "recID": 1,
      "meals": [
        { "id": 64, "cat": "snack", "name": "1 burgerbolle med fyld", "energy": 1260, "protein": 15 },
		    { "id": 70, "cat": "drink", "name": "175 ml. juice", "energy": 340, "protein": 1 }
	   ]}];
   
     window.localStorage['meals'] = angular.toJson(meals);
     window.localStorage['users'] = angular.toJson(users);
     window.localStorage['registrations'] = angular.toJson(registrations);
     window.localStorage['breakfastRecommendations'] = angular.toJson(breakfastRecommendations);
     window.localStorage['lunchRecommendations'] = angular.toJson(lunchRecommendations);
     window.localStorage['afternoonSnackRecommendations'] = angular.toJson(afternoonSnackRecommendations);
     window.localStorage['dinnerRecommendations'] = angular.toJson(dinnerRecommendations);
     window.localStorage['nightSnackRecommendations'] = angular.toJson(nightSnackRecommendations);
     window.localStorage['snackRecommendations'] = angular.toJson(snackRecommendations);

     localStorage.setItem('firstVisitKostReg', '1');
  } 
})


app.controller('NavbarCtrl', function ($scope, $ionicSideMenuDelegate) {
  $scope.openMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
});

