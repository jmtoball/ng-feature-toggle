import angular from 'angular';

import featureToggleDirective from './feature-toggle/feature-toggle.directive';
import featureToggleProvider from './feature-toggle/feature-toggle.provider';
import featureToggleConfig from './feature-toggle/feature-toggle.config';

const moduleName = 'featureToggle';

angular
  .module(moduleName, [])
  .config(featureToggleConfig)
  .provider('featureToggle', featureToggleProvider)
  .directive('featureToggle', featureToggleDirective)
  ;

export default moduleName;

