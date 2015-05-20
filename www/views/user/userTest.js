describe('userCtrl', function() {
  beforeEach(module('app'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('$scope.getUserBySSN', function() {
    it('Tests if the SSN is Equal', function() {
      var user = getUserBySSN(1111901213);
      expect(user.SSN == 1111901213)
    });
  });
});