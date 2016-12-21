angular
  .module('app')
  .config(routesConfig)
  .run(run)
  .constant('API_URL', 'http://127.0.0.1:8000/')
  .factory('TokenAuthInterceptor', function ($window, $q, $rootScope, $state) {
      return {
          request: function(config) {
              config.headers = config.headers || {};
              if ($window.localStorage.getItem('token') && $window.localStorage.getItem('username')) {
                // may also use sessionStorage
                  config.headers.Authorization = 'Token ' + $window.localStorage.getItem('token');
                  $rootScope.$emit('loginUser', $window.localStorage.getItem('username'));
              }
              return config || $q.when(config);
          },
          response: function(response) {
              if (response.status === 401) {
                  $state.go('login');
              }
              return response || $q.when(response);
          }
      };
  });

function routesConfig($stateProvider,$httpProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
      .state('home', {
        url: '/',
        controller: 'homeCtrl',
        controllerAs: 'homeCtrl',
        templateUrl: 'app/home/home.html',
        data: {
            login: false
        }
      })
      .state('signup', {
        url: '/signup',
        controller: 'signupCtrl',
        controllerAs: 'signupCtrl',
        templateUrl: 'app/signup/signup.html',
        data: {
            login: false
        }
      })
      .state('login', {
        url: '/login',
        controller: 'loginCtrl',
        controllerAs: 'loginCtrl',
        templateUrl: 'app/login/login.html',
        data: {
            login: false
        }
      })
      .state('history', {
        url: '/history',
        controller: 'historyCtrl',
        controllerAs: 'historyCtrl',
        templateUrl: 'app/history/history.html',
        data: {
            login: true
        }
      })
      .state('new_request', {
        url: '/new_request',
        controller: 'newRequestCtrl',
        controllerAs: 'newRequestCtrl',
        templateUrl: 'app/new-vacation-request/new-request.html',
        data: {
            login: true
        }
      })
      .state('profile', {
        url: '/profile',
        controller: 'profileCtrl',
        controllerAs: 'profileCtrl',
        templateUrl: 'app/profile/profile.html',
        data: {
            login: true
        }
      })

     $httpProvider.interceptors.push('TokenAuthInterceptor');
}

function run($rootScope, $state, $cookieStore, $http, $transitions, $window ) {

      $transitions.onStart({}, function ($transition$) {
          if($transition$.$to().data.login && !$window.localStorage.getItem('token')) {
              $state.go('login');
          }
      });
}

