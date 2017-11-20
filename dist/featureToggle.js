/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ['featureToggleProvider', '$injector', function (featureToggleProvider, $injector) {
  overrideUIRouterStateFn($injector, featureToggleProvider);

  /**
   * config ui router
   *
   * @param $injector
   * @param featureToggleProvider
   */
  function overrideUIRouterStateFn($injector, featureToggleProvider) {
    try {
      var $stateProvider = $injector.get('$stateProvider');
      // the app uses ui.router, configure it
      var oldStateFn = $stateProvider.state;

      $stateProvider.state = function (name, conf) {
        var featureStatus = featureToggleProvider.getFeatureStatus(conf.feature || name);
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
}];

/***/ },
/* 1 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ['featureToggle', function (featureToggle) {
  return {
    restrict: 'AE',
    transclude: 'element',
    terminal: true,
    priority: 999,
    link: function link(scope, element, attrs, ctrl, $transclude) {
      var featureEl = void 0;
      var childScope = void 0;
      var featureName = attrs.featureToggle;
      var featureStatus = featureToggle.getFeatureStatus(featureName);

      if (featureStatus) {
        featureStatus = featureStatus.toLowerCase();
      }

      if (featureStatus === 'on') {
        $transclude(function (featureEl) {
          element.after(featureEl).remove();
        });
      } else if (featureStatus === 'disabled') {
        $transclude(function (featureEl) {
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
}];

/***/ },
/* 2 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FeatureToggleProvider = function () {
  function FeatureToggleProvider() {
    _classCallCheck(this, FeatureToggleProvider);

    this.features = [];
  }

  _createClass(FeatureToggleProvider, [{
    key: "getFeatureStatus",
    value: function getFeatureStatus(featureName) {
      var feature = null;
      for (var i = 0; i < this.features.length; i++) {
        if (featureName === this.features[i].name) {
          feature = this.features[i].status;
          break;
        }
      }
      return feature;
    }
  }, {
    key: "getFeatures",
    value: function getFeatures() {
      return this.features;
    }
  }, {
    key: "setFeatures",
    value: function setFeatures(features) {
      if (features instanceof Array) {
        this.features = features;
      }
      return this.features;
    }

    /**
     * @returns status =  [off, on, disabled]
     */

  }, {
    key: "$get",
    value: function $get() {
      var _this = this;

      return {
        getFeatures: function getFeatures() {
          return _this.getFeatures();
        },
        getFeatureStatus: function getFeatureStatus(featureName) {
          return _this.getFeatureStatus(featureName);
        },
        setFeatures: function setFeatures(features) {
          return _this.setFeatures(features);
        }
      };
    }
  }]);

  return FeatureToggleProvider;
}();

exports.default = FeatureToggleProvider;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _featureToggle = __webpack_require__(1);

var _featureToggle2 = _interopRequireDefault(_featureToggle);

var _featureToggle3 = __webpack_require__(2);

var _featureToggle4 = _interopRequireDefault(_featureToggle3);

var _featureToggle5 = __webpack_require__(0);

var _featureToggle6 = _interopRequireDefault(_featureToggle5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moduleName = 'featureToggle';

angular.module(moduleName, []).config(_featureToggle6.default).provider('featureToggle', _featureToggle4.default).directive('featureToggle', _featureToggle2.default);

exports.default = moduleName;

/***/ }
/******/ ]);