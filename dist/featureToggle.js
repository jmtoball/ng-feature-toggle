webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (featureToggleProvider, $injector) {
  overrideUIRouterStateFn.$inject = ["$injector", "featureToggleProvider"];
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
      var $stateProvider = $injector.get('$stateProvider');
      // the app uses ui.router, configure it
      var oldStateFn = $stateProvider.state;
      $stateProvider.state = function (name, conf) {
        var featureState = featureToggleProvider.getFeatureState(conf.feature || name);
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
};

/***/ },
/* 2 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (featureToggle, $log) {
  return {
    restrict: 'AE',
    transclude: 'element',
    terminal: true,
    priority: 999,
    link: function link(scope, element, attrs, ctrl, $transclude) {
      var featureEl = void 0;
      var childScope = void 0;
      // Enable for multiple feature
      // const args = attrs.featureToggle.split(/\s+/);
      // const featureName = args[0];
      var featureName = attrs.featureToggle;
      var featureState = featureToggle.getFeatureState(featureName);
      $log.debug(featureState);

      if (featureState === 'on') {
        // $log.debug('%s is on', featureName);
        $transclude(function (featureEl) {
          element.after(featureEl).remove();
        });
      } else if (featureState === 'disabled') {
        // $log.debug('%s is disabled', featureName);
        $transclude(function (featureEl) {
          featureEl[0].disabled = true;
          element.after(featureEl).remove();
        });
      } else {
        // $log.debug('%s should be destroyed', featureName);
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
};

/***/ },
/* 3 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FeatureToggleProvider = function () {
  /** @ngInject */
  function FeatureToggleProvider() {
    _classCallCheck(this, FeatureToggleProvider);

    this.features = [{ name: 'test', state: 'off' }, { name: 'supertest', state: 'on' }, { name: 'disabledtest', state: 'disabled' }];
  }

  /**
   * @returns state =  [off, on, disabled]
   */


  _createClass(FeatureToggleProvider, [{
    key: '$get',
    value: function $get() {
      var _this = this;

      return {
        getFeatureState: function getFeatureState(featureName) {
          var result = _this.features.find(function (feature) {
            return featureName === feature.name;
          });

          return result ? result.state : null;
        },
        getFeatures: function getFeatures() {
          return _this.features;
        },
        replaceFeatures: function replaceFeatures(newFeatures) {
          if (newFeatures instanceof Array) {
            _this.features = newFeatures;
          }
          return _this.features;
        }
      };
    }
  }]);

  return FeatureToggleProvider;
}();

exports.default = FeatureToggleProvider;

/***/ },
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _featureToggle = __webpack_require__(2);

var _featureToggle2 = _interopRequireDefault(_featureToggle);

var _featureToggle3 = __webpack_require__(3);

var _featureToggle4 = _interopRequireDefault(_featureToggle3);

var _featureToggle5 = __webpack_require__(1);

var _featureToggle6 = _interopRequireDefault(_featureToggle5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moduleName = 'featureToggle';

_angular2.default.module(moduleName, []).config(_featureToggle6.default).provider('featureToggle', _featureToggle4.default).directive('featureToggle', _featureToggle2.default);

exports.default = moduleName;

/***/ }
],[5]);