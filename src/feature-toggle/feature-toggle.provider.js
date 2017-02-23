export default class FeatureToggleProvider {
  /** @ngInject */
  constructor() {
    this.features = [];
  }

  getFeatureStatus(featureName) {
    const result = this.features.find(feature => {
      return featureName === feature.name;
    });

    return result ? result.status : null;
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
   * @returns status =  [off, on, disabled]
   */
  $get() {
    return {
      getFeatures: () => this.getFeatures(),
      getFeatureStatus: featureName => this.getFeatureStatus(featureName),
      setFeatures: features => this.setFeatures(features)
    };
  }
}
