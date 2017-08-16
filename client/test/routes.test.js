describe('Routes testing', () => {
  var state, httpMock, $rootScope;

  beforeEach(module('main'));

  beforeEach(inject(function (_$rootScope_, $httpBackend, _$state_) {
    state = _$state_;
    state.transitionTo('map');
    $rootScope = _$rootScope_;
    httpMock = $httpBackend;
    httpMock.expectGET('pages/map.html');
  }));

  afterEach(function () {
    httpMock.verifyNoOutstandingExpectation();
    httpMock.verifyNoOutstandingRequest();
  });

  it('sets state to map', function () {
    $rootScope.$apply();
    console.log(state.current);
    expect(state.current.name).toBe('map');
  });
});
