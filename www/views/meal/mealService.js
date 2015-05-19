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
