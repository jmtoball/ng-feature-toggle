export default class FeatureToggleProvider {
  /** @ngInject */
  constructor() {
    this.features = [];
  }

  getFeatureStatus(featureName) {
    let feature = null;
    for (let i = 0; i < this.features.length; i++) {
      if (featureName === this.features[i].name) {
        feature = this.features[i].status;
        break;
      }
    }
    return feature;
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
