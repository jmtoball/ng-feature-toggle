
/** @ngInject */
export default function (featureToggleProvider, $injector) {
  overrideUIRouterStateFn($injector, featureToggleProvider);

  featureToggleProvider.setFeatures([
          {name: 'test', state: 'off'},
          {name: 'supertest', state: 'on'},
          {name: 'disabledtest', state: 'disabled'}
  ]);

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
        const featureState = featureToggleProvider.getFeatureState(conf.feature || name);
        if (!featureState || featureState === 'off') {
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
