
/** @ngInject */
export default function (featureToggleProvider, $injector) {
  overrideUIRouterStateFn($injector, featureToggleProvider);

  /**
   * config ui router
   *
   * @param $injector
   * @param featureToggleProvider
   */
  /* @ngInject */
  function overrideUIRouterStateFn($injector, featureToggleProvider) {
    try {
      const $stateProvider = $injector.get('$stateProvider');
      // the app uses ui.router, configure it
      const oldStateFn = $stateProvider.state;

      $stateProvider.state = function (name, conf) {
        const featureStatus = featureToggleProvider.getFeatureStatus(conf.feature || name);
        if (!featureStatus || featureStatus === 'off') {
          try {
            return oldStateFn.call($stateProvider, name, conf);
          } catch (e) {
            return $stateProvider;
          }
        } else {
          return $stateProvider;
        }
      };
    } catch (e) {
        // the app doesnt use ui.router - silent failure
    }
  }
}
