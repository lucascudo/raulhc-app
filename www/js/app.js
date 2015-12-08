// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic',
  'ionic-material',
  'starter.controllers',
  'starter.directives',
  'starter.services'
])

.run(function ($ionicPlatform, $rootScope) {
  $rootScope.goOutside = function (url, target) {
      target = target || "_system";
      window.open(url, target);
  };
    
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function ($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    cache: false,
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.agenda', {
    url: '/agenda',
    cache: false,
    views: {
      'tab-agenda': {
        templateUrl: 'templates/tab-agenda.html',
        controller: 'AgendaCtrl'
      }
    }
  })
  
  .state('tab.chat', {
    url: '/chat',
    cache: false,
    views: {
      'tab-chat': {
        templateUrl: 'templates/tab-chat.html',
        controller: 'ChatCtrl'
      }
    }
  })
  
  .state('tab.contato', {
    url: '/contato',
    cache: false,
    views: {
      'tab-contato': {
        templateUrl: 'templates/tab-contato.html',
        controller: 'ContatoCtrl'
      }
    }
  })
  
  .state('tab.compartilhar', {
    url: '/compartilhar',
    cache: false,
    views: {
      'tab-compartilhar': {
        templateUrl: 'templates/tab-compartilhar.html'
      }
    }
  })
  
  .state('tab.temGente', {
    url: '/temGente',
    cache: false,
    views: {
      'tab-tem-gente': {
        templateUrl: 'templates/tab-tem-gente.html',
        controller: 'TemGenteCtrl'
      }
    }
  })
  
  .state('tab.raul', {
    url: '/raul',
    views: {
      'tab-raul': {
        templateUrl: 'templates/tab-raul.html',
        controller: 'RaulCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/raul');

});
