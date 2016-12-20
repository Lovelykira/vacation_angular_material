(function(){
  'use strict';

  angular
    .module('signup')
    .controller('signupCtrl', signupCtrl);

    signupCtrl.$inject = ['signupService', 'showNotificationService', '$scope', '$state'];

    function signupCtrl(signupService, showNotificationService, $scope, $state){
        this.createUser = createUser;

        function createUser (){
            signupService.createUser($scope.user)
            .then(function(data){
                $state.go('login');
            },function(data){
                var error_text = 'Error occurred';
                if(data.data.username)
                    error_text = data.data.username[0];
                if(data.data.email)
                    error_text = data.data.email[0];

                showNotificationService.show('error', error_text);
            });
        }
    }
})();
