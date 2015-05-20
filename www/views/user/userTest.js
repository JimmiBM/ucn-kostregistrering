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
    var bruger = scope.getUserBySSN(1234567890);
    expect(bruger.SSN == 1234567890);
  })
  
  it('vi tester om det er det samme fornavn', function()
  {
    var bruger = scope.getUserByFirstname(Test);
    expect(bruger.firstname == Test);
  })
  
  it('vi tester om det er det samme efternavn', function()
  {
    var bruger = scope.getUserBySurname(Test);
    expect(bruger.lastname == Test);
  })
  
  it('vi tester om det er det samme e-mail', function()
  {
    var bruger = scope.getUserByEmail(Test@Eksempel.dk);
    expect(bruger.email == Test@Eksempel.dk);
  })
}
})