(function(){
    'use strict';

    angular
      .module('login')
      .controller('loginCtrl', loginCtrl);

    loginCtrl.$inject = ['loginService', 'credentialsService', 'showNotificationService', '$scope', '$state', 'notify'];

    function loginCtrl(loginService, credentialsService, showNotificationService, $scope, $state, notify) {
        this.loginUser = loginUser;

        function loginUser(user){
            loginService.loginUser(user)
                .then(function(res){
                    credentialsService.setHeadersAndCookies(user.username, res);
                    $scope.error = undefined;
                    $state.go('home');
                }, function(res){
                    showNotificationService.show('error', 'Error occurred');
                });
        }
    }
})();
