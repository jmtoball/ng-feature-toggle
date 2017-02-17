/** @ngInject */
export default function (featureToggle, $log) {
  return {
    restrict: 'AE',
    transclude: 'element',
    terminal: true,
    priority: 999,
    link: (scope, element, attrs, ctrl, $transclude) => {
      let featureEl;
      let childScope;
      // Enable for multiple feature
      // const args = attrs.featureToggle.split(/\s+/);
      // const featureName = args[0];
      const featureName = attrs.featureToggle;
      const featureState = featureToggle.getFeatureState(featureName);
      $log.debug(featureState);

      if (featureState === 'on') {
        // $log.debug('%s is on', featureName);
        childScope = scope.$new();
        $transclude(featureEl => {
          element.after(featureEl).remove();
        });
      } else if (featureState === 'disabled') {
        // $log.debug('%s is disabled', featureName);
        childScope = scope.$new();
        $transclude(featureEl => {
          featureEl[0].disabled = true;
          element.after(featureEl).remove();
        });
      } else {
        // $log.debug('%s should be destroyed', featureName);
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
  };
}
