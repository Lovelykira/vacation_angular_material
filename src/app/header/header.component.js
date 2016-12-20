(function(){
    'use strict';

    angular
      .module('mainHeader', [])
      .controller('headerCtrl', headerCtrl)
      .component('mainHeader', {
          templateUrl: 'app/header/header.html',
          controller: headerCtrl
      });

    headerCtrl.$inject = ['credentialsService','$state', '$scope', '$sce'];

    function headerCtrl(credentialsService, $state, $scope, $sce){

      $scope.myImgSrc = $sce.trustAsResourceUrl('/src/img/icons/menu_white.svg');
      $scope.isOpen = true;
      $scope.Direction = 'right';
      $scope.Mode = 'md-fling';

      $scope.logout = logout;
      function logout(){
          credentialsService.clearHeadersAndCookies();
          $state.go('home');
      }


  }
})();
