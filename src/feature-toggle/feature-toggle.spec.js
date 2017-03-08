// Test
describe('featureToggle', () => {
  let element;
  let scope;
  let featureToggle;
  let $compile;

  beforeEach(angular.mock.module('featureToggle'));

  beforeEach(angular.mock.inject(($rootScope, _$compile_, _featureToggle_) => {
    featureToggle = _featureToggle_;
    featureToggle.setFeatures([{name: "test", status: "on"}, {name: "super_test", status: "off"}, {name: "disabledtest", status: "disabled"}]);
    $compile = _$compile_;
    scope = $rootScope.$new();
  }));

  function buildElement(featureName, content) {
    element = angular.element(
      `<div feature-toggle="${featureName}">${content}</div>`
    );
    $compile(element)(scope);
    scope.$digest();
  }

  it('should not display any text because OFF', () => {
    buildElement('super_test', 'Some content text');
    expect(element.html()).toBeUndefined();
  });

  it('should not display any text because n.a.', () => {
    buildElement('', 'Some content text');
    expect(element.html()).toBeUndefined();
  });

  // it('should display content with ON', () => {
  //   const content = 'Some content text';
  //   buildElement('test', content);

  //   expect(element.html()).toBe(content);
  // });
});
