app.factory('Meals', function() {
  return {
    all: function() {
      var mealString = window.localStorage['meals'];
      if(mealString) {
        return angular.fromJson(mealString);
      }
      return [];
    },
    save: function(meals) {
      window.localStorage['meals'] = angular.toJson(meals);
    }
   
  
  };
});

app.factory('Registrations', function() {
  return {
    all: function() {
      var registrationString = window.localStorage['registrations'];
      if(registrationString) {
        return angular.fromJson(registrationString);
      }
      return [];
    },
    save: function(registrations) {
      window.localStorage['registrations'] = angular.toJson(registrations);
    }
   
  
  };
});
