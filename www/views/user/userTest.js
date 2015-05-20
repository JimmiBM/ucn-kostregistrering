describe('userCtrl', function()
{
  var scope;
  // ny controller før hver test
  beforeEach(angular.mock.module('app'));
  beforeEach(angular.mock.module(function($rootScope, $controller) 
  {
    //tom scope
    scope = $rootScope.$new();
    // lav controlleren
    $controller('userCtrl', {$scope: scope});
  }
    ));

  //testen her
  it('vi tester om det er det samme SSN nummer', function()
  {
    var bruger = scope.getUserBySSN(1234561111);
    expect(bruger.SSN == 1234561111);
  })
}
})