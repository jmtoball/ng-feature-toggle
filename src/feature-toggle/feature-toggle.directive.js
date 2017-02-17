/** @ngInject */
export default function (featureToggle, $log) {
  const ddo = {
    restrict: 'AE',
    transclude: 'element',
    terminal: true,
    priority: 999,
    link
  };

  return ddo;

    /**
     *
     * @param scope
     * @param element
     * @param attrs
     * @param ctrl
     * @param $transclude
     */
  function link(scope, element, attrs, ctrl, $transclude) {
    let featureEl;
    let childScope;
    // Enable for multiple feature
    // const args = attrs.featureToggle.split(/\s+/);
    // const featureName = args[0];
    const featureName = attrs.featureToggle;
    $log.debug('Checking if feature should be disabled %s', featureName);
    const featureState = featureToggle.getFeatureState(featureName);
    $log.debug('featurestate is %s', featureState);
    if (featureState === 'on') {
      $log.debug('feature is on');
      childScope = scope.$new();
      $transclude(childScope, clone => {
        featureEl = clone;
        element.after(featureEl).remove();
      });
    } else if (!featureState || featureState === 'off') {
      $log.debug('Feature should be disabled %s', featureName);
      if (childScope) {
        childScope.$destroy();
        childScope = null;
      }
      if (featureEl) {
        featureEl.after(element).remove();
        featureEl = null;
      }
    }
  }
}
