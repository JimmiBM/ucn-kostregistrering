angular.module('App').factory('Users', function() {
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
    newProject: function(projectTitle) {
      // Add a new project
      return {
        title: projectTitle,
        tasks: []
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
