(function(){
    'use strict';

    angular
      .module('mainHeader', [])
      .controller('headerCtrl', headerCtrl)
      .component('mainHeader', {
          templateUrl: 'app/header/header.html',
          controller: headerCtrl
      });

    function headerCtrl(credentialsService, $rootScope, $state, $sce, profileService){
        var headerCtrl = this;

        headerCtrl.isOpen = true;
        headerCtrl.Direction = 'right';
        headerCtrl.Mode = 'md-fling';
        headerCtrl.logout = logout;
        headerCtrl.getUser = getUser;

        function getUser(){
            profileService.getUser()
                .then(function(res){
                    headerCtrl.currentUser = res.data.username;
                });
        }

        headerCtrl.getUser();

        function logout(){
            credentialsService.clearHeadersAndCookies();
            $state.go('home');
            headerCtrl.currentUser = undefined;
        }

         $rootScope.$on('loginUser', function(event, mass) { headerCtrl.currentUser = mass; });
    }
})();
