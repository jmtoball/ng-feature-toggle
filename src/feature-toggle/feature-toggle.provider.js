export default class FeatureToggleProvider {
  /** @ngInject */
  constructor() {
    this.features = [
      {name: 'test', state: 'off'},
      {name: 'supertest', state: 'on'},
      {name: 'disabledtest', state: 'disabled'}
    ];
  }

  /**
   *
   * @param featureName
   * @returns {string}
   */
  getFeatureState(featureName) {
    if (this.features && this.features.length > 0) {
      for (const feature of this.features) {
        if (feature.name === featureName) {
          return feature.state;
        }
      }
    }
    return null;
  }

  /**
   *
   * @returns {{isEnabled: isEnabled}}
   */
  $get() {
    return {
      getFeatureState: featureName => this.getFeatureState(featureName)
    };
  }
}
