angular
  .module('app')
  .config(routesConfig)
  .run(run)
  .constant('API_URL', 'http://127.0.0.1:8000/');

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      controller: 'homeCtrl',
      controllerAs: 'homeCtrl',
      templateUrl: 'app/home/home.html'
    })
    .state('signup', {
      url: '/signup',
      controller: 'signupCtrl',
      controllerAs: 'signupCtrl',
      templateUrl: 'app/signup/signup.html'
    })
    .state('login',{
      url: '/login',
      controller: 'loginCtrl',
      controllerAs: 'loginCtrl',
      templateUrl: 'app/login/login.html'
    })
    .state('history',{
      url: '/history',
      controller: 'historyCtrl',
      controllerAs: 'historyCtrl',
      templateUrl: 'app/history/history.html'
    })
    .state('new_request',{
      url: '/new_request',
      controller: 'newRequestCtrl',
      controllerAs: 'newRequestCtrl',
      templateUrl: 'app/new-vacation-request/new-request.html'
    })
    .state('profile',{
      url: '/profile',
      controller: 'profileCtrl',
      controllerAs: 'profileCtrl',
      templateUrl: 'app/profile/profile.html'
    })
}

run.$inject = ['$rootScope', '$state', '$cookieStore', '$http', '$transitions'];
function run($rootScope, $state, $cookieStore, $http, $transitions ) {
    // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get('globals') || {};

    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Token ' + $rootScope.globals.currentUser.authdata;
    }
    $transitions.onStart({}, function ($transition$) {
      if(($transition$.$to().name == 'login' || $transition$.$to().name == 'signup')&& $rootScope.globals.currentUser){
            $state.go('home');
      }
    });
}
