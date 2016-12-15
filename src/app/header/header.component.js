(function(){
    'use strict';

    angular
      .module('mainHeader', [])
      .component('mainHeader', {
          templateUrl: 'app/header/header.html',
          controller: headerCtrl
      });

    headerCtrl.$inject = ['$http', '$rootScope', '$cookieStore', '$state', '$scope'];

    function headerCtrl($http, $rootScope, $cookieStore, $state, $scope){
      $scope.logout = logout;
      function logout(){
          console.log('logout');
          $http.defaults.headers.common['Authorization'] = '';
          $rootScope.globals = {};
          $cookieStore.remove('globals');
          $cookieStore.remove('io');
          $http.defaults.headers.common.Authorization = '';
          $state.go('home');
      }
  }
})();
