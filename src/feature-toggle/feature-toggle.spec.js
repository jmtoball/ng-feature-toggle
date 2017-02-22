// Test
describe('featureToggle', () => {
  let element;
  let scope;
  let featureToggle;

  beforeEach(angular.mock.module('featureToggle'));

  beforeEach(angular.mock.inject(($rootScope, $compile, _featureToggle_) => {
    featureToggle = _featureToggle_;
    featureToggle.setFeatures([{name: "test", state: "on"}, {name: "supertest", state: "off"}, {name: "disabledtest", state: "disabled"}]);
    element = angular.element(
      '<div feature-toggle="supertest">Some text</div>'
    );

    scope = $rootScope.$new();
    $compile(element)(scope);
    scope.$digest();
  }));

  it('should not display any text', () => {
    expect(element.html()).toBeUndefined();
  });
});
