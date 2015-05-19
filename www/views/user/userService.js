app.factory('Users', function() {
  return {
    all: function() {
      var userString = window.localStorage['users'];
      if(userString) {
        return angular.fromJson(userString);
      }
      return [];
    },
    save: function(users) {
      window.localStorage['users'] = angular.toJson(users);
    },
    newUser: function() {
      return {
        cpr: 1111901213,
        firstname: "Jens",
        surname: "Jensen",
        email: "jens@jensen.dk",
        password: "123456"
      };
    },
    getLastActiveIndex: function() {
      return parseInt(window.localStorage['lastActiveProject']) || 0;
    },
    setLastActiveIndex: function(index) {
      window.localStorage['lastActiveProject'] = index;
    }
  }
});
