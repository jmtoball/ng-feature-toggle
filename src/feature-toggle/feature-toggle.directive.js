/** @ngInject */
export default function (featureToggle) {
  return {
    restrict: 'AE',
    transclude: 'element',
    terminal: true,
    priority: 999,
    link: (scope, element, attrs, ctrl, $transclude) => {
      let featureEl;
      let childScope;

      const featureName = attrs.featureToggle;
      let featureState = featureToggle.getFeatureState(featureName);
      if (featureState) {
        featureState = featureState.toLowerCase();
      }

      if (featureState === 'on') {
        $transclude(featureEl => {
          element.after(featureEl).remove();
        });
      } else if (featureState === 'disabled') {
        $transclude(featureEl => {
          featureEl[0].disabled = true;
          element.after(featureEl).remove();
        });
      } else {
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
