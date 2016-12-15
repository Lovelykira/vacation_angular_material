(function(){
  'use strict';

  angular
    .module('signup')
    .controller('signupCtrl', signupCtrl);

    signupCtrl.$inject = ['signupService', '$scope', '$state'];

    function signupCtrl(signupService, $scope, $state){
        this.createUser = createUser;

        function createUser (){
            signupService.createUser($scope.user)
            .then(function(data){
                console.log('signup success', data);
                $state.go('login');
                 $scope.error = undefined;
            },function(data){
                $scope.error = data.data.username[0] || 'Error occurred';
                console.log('signup error', data.data.username[0]);
            });
        }
    }
})();
