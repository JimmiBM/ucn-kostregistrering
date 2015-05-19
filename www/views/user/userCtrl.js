app.controller('UserCtrl', function ($scope, $timeout, $ionicModal, $ionicLoading, $ionicPopup) {


  var createUser = function() {
    var newUser = Users.newUser();
    $scope.users.push(newUser);
    Users.save($scope.users);
    //$scope.selectUser(newUser, $scope.users.length-1);
  }


  // Load or initialize projects
  $scope.users = Users.all();

  // Grab the last active, or the first project
  //$scope.activeProject = $scope.projects[Projects.getLastActiveIndex()];

  // Called to create a new project
  $scope.newUser = function() {
    createUser();
  };

  // Called to select the given project
  /*$scope.selectProject = function(project, index) {
    $scope.activeProject = project;
    Projects.setLastActiveIndex(index);
    $ionicSideMenuDelegate.toggleLeft(false);
  };*/

  // Create our modal
  /*$ionicModal.fromTemplateUrl('new-task.html', function(modal) {
    $scope.taskModal = modal;
  }, {
    scope: $scope
  });

  $scope.createTask = function(task) {
    if(!$scope.activeProject || !task) {
      return;
    }
    $scope.activeProject.tasks.push({
      title: task.title
    });
    $scope.taskModal.hide();

    // Inefficient, but save all the projects
    Projects.save($scope.projects);

    task.title = "";
  };

  $scope.newTask = function() {
    $scope.taskModal.show();
  };

  $scope.closeNewTask = function() {
    $scope.taskModal.hide();
  }

  $scope.toggleProjects = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };*/



});
