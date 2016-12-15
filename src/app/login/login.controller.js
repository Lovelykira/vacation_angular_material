(function(){
    'use strict';

    angular
      .module('login')
      .controller('loginCtrl', loginCtrl);

    loginCtrl.$inject = ['loginService', '$rootScope', '$cookieStore', '$http', '$scope', '$state'];

    function loginCtrl(loginService, $rootScope, $cookieStore, $http, $scope, $state) {

        this.loginUser = loginUser;
        this.setHeadersAndCookies = setHeadersAndCookies;

        function setHeadersAndCookies(username, token){
            console.log('setHeadersAndCookies');
            $http.defaults.headers.common['Authorization'] = 'Basic ' + token;
            $rootScope.globals = {
                currentUser: {
                    username: username,
                    authdata: token
                }
            };
            $cookieStore.put('globals', $rootScope.globals);
            console.log('setHeaders ended');
        }

        function loginUser(user){
            console.log('asd', user);
            loginService.loginUser(user)
                .then(function(res){
                    console.log('success loginCtrl');
                    console.log(user.username, res);
                    setHeadersAndCookies(user.username, res);
                    $scope.error = undefined;
                    console.log('going home');
                    $state.go('home');
                }, function(res){
//                    console.log($scope.userForm.login);
                    $scope.error = 'error';
                    console.log('error loginCtrl');
                });
        }
    }
})();
