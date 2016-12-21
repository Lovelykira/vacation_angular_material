(function(){
  'use strict';

  angular
    .module('signup')
    .controller('signupCtrl', signupCtrl);

    function signupCtrl(signupService, showNotificationService, $state){
        var signupCtrl = this;
        signupCtrl.createUser = createUser;

        function createUser (){
            signupService.createUser(signupCtrl.user)
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
