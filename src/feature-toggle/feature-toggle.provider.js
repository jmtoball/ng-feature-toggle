export default class FeatureToggleProvider {
  /** @ngInject */
  constructor() {
    this.features = [];
  }

  getFeatureState(featureName) {
    const result = this.features.find(feature => {
      return featureName === feature.name;
    });

    return result ? result.state : null;
  }

  getFeatures() {
    return this.features;
  }

  setFeatures(features) {
    if (features instanceof Array) {
      this.features = features;
    }
    return this.features;
  }

  /**
   * @returns state =  [off, on, disabled]
   */
  $get() {
    return {
      getFeatures: () => this.getFeatures(),
      getFeatureState: featureName => this.getFeatureState(featureName),
      setFeatures: features => this.setFeatures(features)
    };
  }
}
