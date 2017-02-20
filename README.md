## angular-feature-toggle

An AngularJS module that allows you to control when you release new features in your app or use it on the users authorization by putting them behind feature toggle/switches. **This module only supports Angular v1.5 and up.**


### The idea

Abstracting your application functionality into small chunks and implementing them as loosely coupled components. This allows you to completely remove pages, actions or elements of your application by simply toggle them.


### How it works

The basic premise is you write your feature and wrap it up in a component/module, then where you implement that component in you add the **feature-toggle** to the same element. You can then pass the **key** of the toggle to this directive to resolve whether of not this feature should be enabled.

The module pulls a json file down which defines the feature toggle and which ones are active. If 'ON' angular will process the directive as normal, if 'DISABLED' angular will tag the element as disabled and when 'OFF' angular will remove the element from the dom and not compile or execute any other directives is has.

You can then add the **override** panel to your app and turn individual features on override the server values, saving the override in local storage which is useful in development.


### flag data

The flag data that drives the feature toggle service is a json format. Below is an example:
```json
[
    { "name": "...", "state": "..." },
    ...
]
```
<table>
   <tr>
    <td><b>key</b></td>
    <td>Unique key that is used from the markup to resolve whether a flag is active or not. (A short name of the flag )</td>
   </tr>
   <tr>
    <td><b>state</b></td>
    <td>Value for on/disabling/off the feature</td>
   </tr>
</table>


### Setting flag data

Flag data can be set via the `featureToggleService` service using the `set` method. This currently accepts either a [HttpPromise](https://docs.angularjs.org/api/ng/service/$http) or a regular [Promise](https://docs.angularjs.org/api/ng/service/$q). The promise must resolve to a valid collection of [flag data](#flag-data).


### Setting flag data on config phase

You can also initialize the feature flags in the config phase of your application:

```js
var myApp = angular.module('app', ['featureToggle']);

myApp.config(function(featureToggleProvider) {
  featureFlagsProvider.setInitialFlags([
    { "key": "...", "active": "...", "name": "...", "description": "..." },
  ]);
});
```

### Toggling elements

The `feature-toggle` directive allows simple toggling of elements based on feature flags, e.g:

```html
 <input feature-toggle="myTag">
 	I will be visible if 'myTag' is enabled
 </input>
```
