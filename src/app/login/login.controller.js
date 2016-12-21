(function(){
    'use strict';

    angular
      .module('login')
      .controller('loginCtrl', loginCtrl);

    function loginCtrl(loginService, showNotificationService, $state) {
        var loginCtrl = this;
        loginCtrl.loginUser = loginUser;

        function loginUser(){
            loginService.loginUser(loginCtrl.user)
                .then(function(res){
                    $state.go('home');
                }, function(res){
                    showNotificationService.show('error', 'Error occurred');
                });
        }
    }
})();
