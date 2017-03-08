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
      let featureStatus = featureToggle.getFeatureStatus(featureName);

      if (featureStatus) {
        featureStatus = featureStatus.toLowerCase();
      }

      if (featureStatus === 'on') {
        $transclude(featureEl => {
          element.after(featureEl).remove();
        });
      } else if (featureStatus === 'disabled') {
        $transclude(featureEl => {
          featureEl[0].disabled = true;
          featureEl.addClass('disabled');
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
