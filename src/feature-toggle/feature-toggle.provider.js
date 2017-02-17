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
   * @returns {{featureToggle: state}}
   */
  $get() {
    return {
      getFeatureState: featureName => {
        const result = this.features.find(feature => {
          return featureName === feature.name;
        });

        return result ? result.state : null;
      }
    };
  }
}
